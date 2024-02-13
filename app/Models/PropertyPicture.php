<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyPicture extends Model
{
    use HasFactory;
    protected $fillable = ['picture', 'property_id'];
    protected $appends = ["image_url"];
    public function getImageUrlAttribute()
    {
        return $this->picture ? url("/uploads/property/$this->property_id/$this->picture") : "";
    }
}
