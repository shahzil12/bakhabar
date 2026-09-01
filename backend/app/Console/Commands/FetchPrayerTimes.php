<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\FetchPrayerTimesJob;

class FetchPrayerTimes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'prayer:fetch-times';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch and cache daily prayer times for major Pakistani cities';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Fetching prayer times...');
        FetchPrayerTimesJob::dispatchSync();
        $this->info('Prayer times updated successfully.');

        return Command::SUCCESS;
    }
}
