<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\FetchMarketRatesJob;

class FetchMarketRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'market:fetch-rates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch and cache latest Gold and Forex currency exchange rates';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Fetching market rates...');
        FetchMarketRatesJob::dispatchSync();
        $this->info('Market rates updated successfully.');

        return Command::SUCCESS;
    }
}
