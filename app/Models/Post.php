<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title',
        'description',
    ];

    protected $casts = [
        'created_at' => 'datetime:d/m/Y H:i:s'
    ];
    
    public $rules = [
        'title' => 'required|max:255',
        'description' => 'required|max:255',
    ];

    public $attributes = [
        'title' => 'Имя',
        'description' => 'Комментарий'
    ];

    public function validate($request) 
    {
        $request->validate($this->rules, [], $this->attributes);
    }
}
