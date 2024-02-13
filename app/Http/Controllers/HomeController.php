<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __construct()
    {
    }

    public function getLatestProperties(Request $request)
    {
        $query = Property::with("pictures");

        if($request->sorting_field) {
            $query->orderBy($request->sorting_field, $request->sorting_order);
        } else {
            $query->orderBy("id", "desc");
        }

        $properties = $query->limit($request->per_page ?: 10)->get();

        return response()->json(['properties' => $properties]);
    }
}
