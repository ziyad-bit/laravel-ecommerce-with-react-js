<?php 

namespace App\Traits;



trait MembersRules
{
    public function MembersRules(int $id=null,$photo=null,int $admins=1):array
    {
        if($photo){
            $photoRules='image|mimes:jpg,jpeg,gif,png|max:14048';
        }else{
            $photoRules='';
        }

        if($admins == 1){
            $email_rule='unique:admins,email,';
        }else{
            $email_rule='unique:users,email,';
        }

        $rules=[
            'name'     => 'required|string|min:4|max:25',
            'email'    => 'required|email|min:10|max:100|'.$email_rule.$id,
            'password' => 'required|string|min:8|max:50',
            'photo'    => $photoRules
        ];
        return $rules;
    }
}
