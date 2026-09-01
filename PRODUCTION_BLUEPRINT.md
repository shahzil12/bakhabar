# Production Blueprint & Deployment Guide: Bakhabar (باخبر)

This document provides a step-by-step technical blueprint for initializing, configuring, and deploying the **Bakhabar (باخبر)** Urdu Publishing Portal to production.

---

## 1. System Requirements & Stack Overview

- **Backend Operating Environment**: PHP 8.3+, Composer 2.7+, MySQL 8.0+ or PostgreSQL 16+, Redis 7+
- **Admin Engine**: Filament PHP v3 (configured with native RTL and Urdu Noto Nastaliq typography)
- **Frontend Engine**: Next.js 14+ (App Router, Node.js 20+, TypeScript, SSR & ISR)
- **Caching & Queues**: Redis Cache & Laravel Horizon / Worker Queues

---

## 2. Laravel Backend & Filament v3 Setup

### Step 2.1: Initialize Laravel 11 App & Install Packages
```bash
# Navigate to workspace directory
cd backend

# Install dependencies via Composer
composer install

# Environment File Setup
cp .env.example .env
php artisan key:generate
```

### Step 2.2: Configure `.env` Database & Redis Settings
```ini
APP_NAME=BakhabarBackend
APP_ENV=production
APP_URL=https://api.bakhabar.pk

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bakhabar_db
DB_USERNAME=bakhabar_user
DB_PASSWORD=SecurePassword123!

CACHE_STORE=redis
QUEUE_CONNECTION=redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

### Step 2.3: Execute Database Migrations
```bash
php artisan migrate --force
```

### Step 2.4: Filament PHP v3 Admin Panel RTL & Urdu Font Setup
Install Filament v3 Panel Builder:
```bash
composer require filament/filament:"^3.2" -W
php artisan filament:install --panels
```

To enable full RTL direction and embed Noto Nastaliq Urdu font in Filament v3 Admin:
Create `app/Providers/Filament/AdminPanelProvider.php`:
```php
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Assets\Css;
use Filament\Support\Facades\FilamentAsset;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->direction('rtl') // Native RTL direction
            ->brandName('باخبر - ایڈمن پینل')
            ->font('Noto Nastaliq Urdu')
            ->colors([
                'primary' => '#004b23',
            ])
            ->assets([
                Css::make('urdu-font', 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap'),
            ]);
    }
}
```

### Step 2.5: Queue Workers & Task Scheduler
Configure Laravel Cron Task Schedule in `/etc/crontab`:
```cron
* * * * * cd /var/www/bakhabar/backend && php artisan schedule:run >> /dev/null 2>&1
```

Define scheduled jobs in `routes/console.php` or `app/Console/Kernel.php`:
```php
use Illuminate\Support\Facades\Schedule;

Schedule::command('market:fetch-rates')->hourly();
Schedule::command('prayer:fetch-times')->dailyAt('00:05');
```

---

## 3. Next.js 14+ Frontend Setup

### Step 3.1: Install Node Dependencies & Build
```bash
cd frontend

# Install packages
npm install

# Environment setup
# Create .env.local
echo "NEXT_PUBLIC_API_URL=https://api.bakhabar.pk/api" > .env.local

# Run production build
npm run build
```

---

## 4. Production Nginx & Supervisor Server Blueprint

### Step 4.1: Supervisor Configuration for Redis Workers (`/etc/supervisor/conf.d/bakhabar-worker.conf`)
```ini
[program:bakhabar-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/bakhabar/backend/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=4
redirect_stderr=true
stdout_logfile=/var/log/supervisor/bakhabar-worker.log
```

### Step 4.2: Nginx Reverse Proxy Configuration (`/etc/nginx/sites-available/bakhabar.conf`)
```nginx
# Frontend Server Block (Next.js Node App)
server {
    listen 80;
    server_name bakhabar.pk www.bakhabar.pk;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend API & Admin Server Block (Laravel PHP-FPM)
server {
    listen 80;
    server_name api.bakhabar.pk;
    root /var/www/bakhabar/backend/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

---

## 5. Verification Checklist

1. **RTL & Typography**: Verify that all pages load with `<html lang="ur" dir="rtl">` and rendering uses Noto Nastaliq Urdu typography with `line-height: 2.3`.
2. **On-Screen Urdu Keyboard**: Click the keyboard icon inside the search bar in the Header to toggle the virtual Urdu Phonetic keyboard.
3. **Financial Ticker**: Check live Gold (24K, 22K per tola) and Forex (USD, SAR, AED to PKR) rates bar.
4. **Prayer Schedule Widget**: Test city selection dropdown (Karachi, Lahore, Islamabad, Peshawar, Quetta, Multan).
5. **SEO & Structured Data**: Inspect source code to verify JSON-LD `NewsArticle` and `Organization` schemas.
