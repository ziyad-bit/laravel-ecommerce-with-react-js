<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insert([
            'name' => 'ziyad',
            'email' => 'ziyad1995233@yahoo.com',
            'password' => Hash::make('12121212'),
            'created_at'=>now()
        ]);
    }
}
