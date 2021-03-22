<?php

namespace App\Console\Commands;

use App\Models\Password_resets;
use Carbon\Carbon;
use Illuminate\Console\Command;

class Token_expire extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'token:expire';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'token expire every 60 mins';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $token_ids=Password_resets::select('created_at','id')->get();
        foreach($token_ids as $token_id){
            $date      = $token_id->created_at;
            $date_diff = $date->diffInMinutes(date('y-m-d H:i:s'));

            if($date_diff >= 60){
                $token_id->delete();
            }
        }

    }
}
