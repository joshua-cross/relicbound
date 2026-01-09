<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RelicEffectSeeder extends Seeder
{
    /**
     * @throws \Exception When there is an issue reading the effects CSV file.
     */
    public function run()
    {
        // getting and populating relic effects
        $csvPath = database_path('seeders/data/relic_effects.csv');

        if (!file_exists($csvPath)) {
            throw new \Exception("CSV file not found at path: " . $csvPath);
        }

        $now = Carbon::now(); // prevent repetition
        $rows = [];
        $defaultData = [
            'created_at' => $now,
            'updated_at' => $now,
        ];

        // open the CSV file and convert its contentts into an array.
        if (($handle = fopen($csvPath, "r")) !== FALSE) {
            $header = fgetcsv($handle, 1000, ",");
            $idx = 0;
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $row = array_combine($header, $data);
                $name = $row['Relic Description'];
                $details = $row['Effect'];
                $idx = $idx + 1;

                if (empty($name) || empty($details)) {
                    continue; // skip incomplete rows
                }

                $rows[] = [
                    'name' => $row['Relic Description'],
                    'details' => $row['Effect'],
                    'order' => $idx,
                    ...$defaultData,
                ];
            }
            fclose($handle);
        }

        DB::table('relic_effects')->insert($rows);
    }
}
