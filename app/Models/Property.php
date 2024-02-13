<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }
    public function pictures()
    {
        return $this->hasMany(PropertyPicture::class, "property_id");
    }
    public function features()
    {
        return $this->belongsToMany(Feature::class, 'property_features', 'property_id', 'feature_id');
    }
    public function country()
    {
        return $this->belongsTo(Country::class, "country");
    }
    public function state()
    {
        return $this->belongsTo(State::class, "state");
    }
    public function city()
    {
        return $this->belongsTo(City::class, "city");
    }
    protected $fillable = ['user_id', 'agency_id', 'title', 'description', 'status', 'price', 'rent_amount_per',
        'area', 'country', 'state', 'city', 'bedrooms', 'bathrooms', 'rooms', 'garages', 'units', 'floor_number',
        'year_built', 'property_finalizing', 'phone', 'youtube_video'];
}
