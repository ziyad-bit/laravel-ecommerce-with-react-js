<?php 

namespace App\Traits;

trait CategoryRules{
    public function CategoryRules($request){
        if($request->file('photo')){
            $photoRules='required|image|mimes:jpg,jpeg,gif,png|max:14';
        }else{
            $photoRules='';
        }
        $rules=[
            'name'        => 'required|string|min:4|max:25',
            'description' => 'required|string|min:4|max:100',
            'photo'       => $photoRules,
        ];
        return $rules;
    }
    
}