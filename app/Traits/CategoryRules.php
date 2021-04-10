<?php 

namespace App\Traits;

trait CategoryRules{
    public function CategoryRules($id=null,$photo=null){
        if($photo){
            $photoRules='required|image|mimes:jpg,jpeg,gif,png|max:14';
        }else{
            $photoRules='';
        }

        $rules=[
            'name'        => 'required|string|min:4|max:25|unique:category,name,'.$id,
            'description' => 'required|string|min:4|max:100',
            'photo'       => $photoRules,
        ];
        
        return $rules;
    }
    
}