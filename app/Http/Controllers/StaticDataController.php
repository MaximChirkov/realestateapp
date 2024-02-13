<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Feature;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class StaticDataController extends Controller
{
    public function index()
    {
        $data = Cache::remember("app_static_data", Carbon::now()->addWeek(), function () {
            return [
                'features' => $this->getFeatures(),
                'areas' => $this->getAreas()
            ];
        });
        return response()->json($data);
    }
    protected function getFeatures()
    {
        return Feature::all();
    }
    protected function getAreas()
    {
        $areas = [];
        $countries = Country::all();
        foreach ($countries as $country) {
            $arr = [
                'id' => $country->id,
                'name' => $country->name,
                'states' => []
            ];
            $states = $country->states;
            if($states) {
                foreach ($states as $state) {
                    $arr2 = [
                        'id' => $state->id,
                        'name' => $state->name,
                        'cities' => $state->cities
                    ];
                    $arr['states'][] = $arr2;
                }
            }
            $areas[] = $arr;
        }
        return $areas;
    }
}

