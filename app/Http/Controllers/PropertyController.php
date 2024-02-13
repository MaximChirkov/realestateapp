<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class PropertyController extends Controller
{
    private $editMode = false;

    public function __construct()
    {
        $this->middleware("auth:sanctum")->except(["show"]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        if(($validate = $this->validateProperties($request)) !== true) {
            return $validate;
        }

        $payload = [
            'user_id' => auth()->user()->id
        ];

        foreach ($request->except(['features', 'pictures', 'accept_terms']) as $key => $val) {
            $payload[$key] = $val;
        }

        $property = Property::create($payload);

        $property->features()->attach($request->features);

        $this->storeImages($request, $property);

        return response()->json(['status' => true, 'message' => 'Property Created Successfully', 'property' => $property]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $property = Property::with(["user", "pictures", "features", "country", "state", "city"])->find($id);

        $integerFields = ['rent_amount_per', 'country', 'state', 'city', 'bedrooms',
            'bathrooms', 'rooms', 'garages', 'units', 'floor_number', 'year_built'];

        foreach ($integerFields as &$field) {
            $property->{$field} = intval($property->{$field});
        }

        $property->price = floatval($property->price);
        $property->area = floatval($property->area);
        $property->phone = $property->phone ?: "";
        $property->youtube_video = $property->youtube_video ?: "";

        return response()->json(['status' => true, 'property' => $property]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $this->editMode = true;

        $property = Property::find($id);

        if(($validate = $this->validateProperties($request)) !== true) {
            return $validate;
        }

        $payload = [];

        foreach ($request->except(['features', 'pictures', 'accept_terms']) as $key => $val) {
            $payload[$key] = $val;
        }

        $property->update($payload);

        $property->features()->detach();

        $property->features()->attach($request->features);

        $this->storeImages($request, $property);

        return response()->json(['status' => true, 'message' => 'Property Updated Successfully', 'property' => $property]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $property = Property::with(["pictures", "features"])->find($id);

        if($property->pictures) {
            if(file_exists(public_path("/uploads/property/$property->id"))) {
                File::deleteDirectory(public_path("/uploads/property/$property->id"));
            }

            $property->pictures()->delete();
        }

        $property->features()->detach();

        $property->delete();

        return response()->json(['status' => true, 'message' => 'Property Deleted Successfully']);
    }

    public function userProperties(Request $request)
    {
        $query = auth()->user()->properties()->with("pictures");

        if($request->sorting_field) {
            $query->orderBy($request->sorting_field, $request->sorting_order);
        } else {
            $query->orderBy("id", "desc");
        }

        $properties = $query->paginate($request->per_page ?: 10);

        return response()->json(['properties' => $properties]);
    }

    private function validateProperties(Request $request)
    {
        $rules = [
            'title' => 'required|min:5|string',
            'status' => 'required',
            'price' => 'required|numeric',
            'rent_amount_per' => 'required_if:status,==,Rent',
            'area' => 'required|numeric',
            'country' => 'required|gt:0',
            'state' => 'required|gt:0',
            'bedrooms' => 'integer',
            'bathrooms' => 'integer',
            'rooms' => 'integer',
            'garages' => 'integer',
            'units' => 'integer',
            'floor_number' => 'integer',
            'year_built' => 'integer',
            'features' => 'required|array',
            'features.*' => 'integer',
            'youtube_video' => 'nullable|sometimes|url'
        ];

        if(!$this->editMode) {
            $rules = array_merge($rules, [
                'pictures' => 'required|array',
                'pictures.*' => 'image|mimes:jpeg,png,jpg,gif',
            ]);
        }

        $validator = Validator::make($request->all(), $rules, [
            'features.required' => 'You have to choose at least one or two features',
            'pictures.required' => 'At least one picture is required',
            'country.gt' => 'The country required',
            'state.gt' => 'The state required'
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'errors' => $validator->errors()], 500);
        }

        return true;
    }

    private function storeImages(Request $request, $property)
    {
        if(!file_exists(public_path("/uploads/property/$property->id"))) {
            @mkdir(public_path("/uploads/property"), 0777);
            @mkdir(public_path("/uploads/property/$property->id"), 0777);
        }

        if($request->hasFile('pictures')) {
            $files = $request->file('pictures');

            foreach($files as $file) {
                $extension = $file->getClientOriginalExtension();
                $md5Name = md5_file($file->getRealPath()) . '_' . time().'.'.$extension;
                $file->move(public_path("uploads/property/$property->id"), $md5Name);
                $property->pictures()->create(['picture' => $md5Name]);
            }
        }
    }
}
