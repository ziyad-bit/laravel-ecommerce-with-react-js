<?php 

namespace App\Traits;

use Symfony\Component\HttpFoundation\Request;

trait MembersRules{
    public function MembersRules(Request $request){
        if($request->file('photo')){
            $photoRules='image|mimes:jpg,jpeg,gif,png|max:14048';
        }else{
            $photoRules='';
        }
        $rules=[
            'name'     => 'required|string|min:4|max:25',
            'email'    => 'required|email|min:10|max:100|unique:users',
            'password' => 'required|string|min:8|max:50',
            'photo'    => $photoRules
        ];
        return $rules;
    }
    
}