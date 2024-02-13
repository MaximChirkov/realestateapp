<?php

namespace Database\Seeders;

use App\Models\Feature;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeaturesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // list of features
        $AvailableFeatures = ['Electricity', 'Water', 'Gas', 'Phone', 'Internet', 'Basement', 'Swimming Pool', 'AC'];

        foreach ($AvailableFeatures as $vailableFeature) {
            $feature = new Feature();
            $feature->title = $vailableFeature;
            $feature->save();
        }
    }
}
