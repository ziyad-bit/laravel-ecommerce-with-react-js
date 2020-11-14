<?php 

namespace App\Traits;



trait MembersRules{
    public function MembersRules($photo,$users=null){
        if($photo){
            $photoRules='image|mimes:jpg,jpeg,gif,png|max:14048';
        }else{
            $photoRules='';
        }

        if($users==null){
            $id=null;
        }else{
            $id=$users->id;
        }
        $rules=[
            'name'     => 'required|string|min:4|max:25',
            'email'    => 'required|email|min:10|max:100|unique:users,email,'.$id,
            'password' => 'required|string|min:8|max:50',
            'photo'    => $photoRules
        ];
        return $rules;
    }
    
}