<?php 

namespace App\Traits;

trait CategoryRules{
    public function CategoryRules(){
        $rules=[
            'name'        => 'required|string|min:4|max:25',
            'description' => 'required|string|min:4|max:100',
            'photo'       => 'required|image|mimes:jpg,jpeg,gif,png|max:14',
        ];
        return $rules;
    }
    
}