<?php


namespace App\Http\Controllers;


use App\Models\Property;
use Illuminate\Http\Request;

class SearchPropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::with("pictures");

        $this->setFilters($request, $query);

        $this->setOrdering($request, $query);

        $properties = $query->paginate($request->per_page ?: 20);

        return response()->json(['properties' => $properties]);
    }

    private function setFilters(Request $request, $query)
    {
        if($request->keyword) {
            $query->where("title", 'LIKE','%'.urldecode($request->keyword).'%');
        }

        if($request->country) {
            $query->where("country", $request->country);
        }

        if($request->state) {
            $query->where("state", $request->state);
        }

        if($request->city) {
            $query->where("city", $request->city);
        }

        if($request->ids) {
            $query->whereIn("id", explode(",", $request->ids));
        }

        $this->setStatusFilter($request, $query);

        $this->setFeaturesFilters($request, $query);
    }

    private function setStatusFilter(Request $request, $query)
    {
        if($request->status) {
            $query->where("status", $request->status);

            if($request->status === 'Sale' && $request->price) {
                $priceSplitted = explode(",", $request->price);

                if($priceSplitted[0] && $priceSplitted[1]) {
                    $query->where(fn($q) => $q->where('price', '>=', $priceSplitted[0])->where('price', '<=', $priceSplitted[1]));
                } else if($priceSplitted[0] && !$priceSplitted[1]) {
                    $query->where('price', '>=', $priceSplitted[0]);
                } else if(!$priceSplitted[0] && $priceSplitted[1]) {
                    $query->where('price', '<=', $priceSplitted[1]);
                }
            } else if($request->status === 'Rent' && $request->rent) {
                $rentSplitted = explode(",", $request->rent);

                if($rentSplitted[0] && $rentSplitted[1]) {
                    $query->where(fn($q) => $q->where('price', '>=', $rentSplitted[0])->where('price', '<=', $rentSplitted[1]));
                } else if($rentSplitted[0] && !$rentSplitted[1]) {
                    $query->where('price', '>=', $rentSplitted[0]);
                } else if(!$rentSplitted[0] && $rentSplitted[1]) {
                    $query->where('price', '<=', $rentSplitted[1]);
                }
                if($request->rent_per) {
                    $query->where('rent_amount_per', $request->rent_per);
                }
            }
        }
    }

    private function setFeaturesFilters(Request $request, $query)
    {
        if($request->property_finalizing) {
            $query->where("property_finalizing", urldecode($request->property_finalizing));
        }

        if($request->features) {
            $query->whereHas('features', fn($q) => $q->whereIn('feature_id', explode(",", $request->features)));
        }

        $rangeFields = ["bathrooms", "bedrooms", "area", "rooms", "garages", "units", "floor_number", "year_built"];

        foreach ($rangeFields as $rangeField) {
            if($request->{$rangeField}) {
                $rangeVal = explode(",", $request->{$rangeField});

                if($rangeVal[0] && $rangeVal[1]) {
                    $query->where(fn($q) => $q->where($rangeField, '>=', $rangeVal[0])->where($rangeField, '<=', $rangeVal[1]));
                } else if($rangeVal[0] && !$rangeVal[1]) {
                    $query->where($rangeField, '>=', $rangeVal[0]);
                } else if(!$rangeVal[0] && $rangeVal[1]) {
                    $query->where($rangeField, '<=', $rangeVal[1]);
                }
            }
        }
    }

    private function setOrdering($request, $query)
    {
        if($request->sorting_field) {
            $query->orderBy($request->sorting_field, $request->sorting_order);
        } else {
            $query->orderBy("id", "desc");
        }
    }
}
