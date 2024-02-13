<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Country;
use App\Models\State;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AreasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // list of areas (country, state, city)
        $areas = ['USA' => [
            'Hawaii' => [
                'Honolulu'
            ],
            'California' => [
                'Los Angeles',
                'Sacramento'
            ],
            'New York' => [
                'New York City',
                'Albany'
            ],
            'New Jersey' => [
                'Trenton'
            ]
        ],
            'France' => [
                'Île-de-France' => [
                    'Paris'
                ],
                'Normandy' => [
                    'Reims',
                    'Rouen'
                ],
                'Occitanie' => [
                    'Montpellier'
                ]
            ],
            'UK' => [
                'London' => [
                    'City of London'
                ],
                'Scotland' => [
                    'Aberdeen',
                    'Glasgow'
                ],
                'Wales' => [
                    'Bangor'
                ],
                'Northern Ireland' => [
                    'Armagh'
                ]
            ],
            'Morocco' => [
                'Casablanca-Settat' => [
                    'Casablanca',
                    'Dar Bouazza'
                ],
                'Fès-Meknès' => [
                    'Fez'
                ],
                'Marrakesh-Safi' => [
                    'Marrakesh',
                    'Safi'
                ]
            ],
            'Egypt' => [
                'Cairo' => [
                    'Old Cairo',
                    'Maadi',
                    'Zamalek'
                ],
                'Alexandria',
                'Sharm El Sheikh',
                'Hurghada'
            ],
            'Spain' => [
                'Madrid',
                'Barcelona',
                'Granada'
            ],
            'Turkey' => [
                'Istanbul' => [
                    'Istanbul'
                ],
                'Ankara' => [
                    'Ankara'
                ],
                'İzmir' => [
                    'İzmir'
                ],
                'Bursa' => [
                    'Bursa'
                ]
            ]
        ];

        foreach ($areas as $countryName => $states) {
            $country = Country::create(['name' => $countryName]);

            foreach ($states as $stateName => $cities) {
                $state = State::create(['name' => $stateName, 'country_id' => $country->id]);

                if ($cities && is_array($cities)) {
                    foreach ($cities as $cityName) {
                        City::create(['name' => $cityName, 'country_id' => $country->id, 'state_id' => $state->id]);
                    }
                }
            }
        }
    }
}
