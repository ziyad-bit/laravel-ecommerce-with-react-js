<?php

namespace App\Http\Controllers\Admins;

use App\Models\Users;
use App\Traits\{UploadPhoto , MembersRules};
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\{Hash,Validator};

class MembersController extends Controller
{
    use UploadPhoto;
    use MembersRules;
    
    ######################################        add            ################################# 
    public function addUser(Request $request)
    {
        try {
            //import from trait(MembersRules)
            $rules=$this->MembersRules(null,$request,0);

            $validator=Validator::make($request->all(),$rules);

            if($validator->fails()){
                return  $this->returnError($validator->errors(),400);
            }

            $fileName='';
            if($request->file('photo')){
                //import from trait(UploadPhoto) 
                $fileName=$this->UploadPhoto($request->file('photo') , 'images/items');
            }

            $name     = filter_var($request->get('name')        ,FILTER_SANITIZE_STRING);
            $email    = filter_var($request->get('email')       ,FILTER_SANITIZE_EMAIL);
            $password = filter_var($request->get('password')    ,FILTER_SANITIZE_STRING);
            $photo    = filter_var($fileName                    ,FILTER_SANITIZE_STRING);
            
            $users=Users::create([
                'name'     => $name,
                'email'    => $email,
                'password' => Hash::make($password),
                'date'     => now(),
                'approve'  => 1,
                'photo'    => $photo,
            ]);

            return $this->returnSuccess('you successfully added user');

        } catch (\Exception $th) {
            return  $this->returnError('something went wrong',500);
        }
        
    }

    ######################################        get            ############################ 
    public function getUser()
    {
        try {
            $users=Users::orderBy('id','desc')->paginate(2);
            return $this->returnSuccess('','users',$users);

        } catch (\Exception $th) {
            return  $this->returnError('something went wrong',500);
        }
    }

    ######################################        delete            ########################## 
    public function deleteUser($id)
    {
        try {
            $users=Users::find($id);
            if(! $users){
                return  $this->returnError("user isn't found",404);
            }
            $users->delete();

            return $this->returnSuccess('you successfully deleted user');

        } catch (\Exception $th) {
            return  $this->returnError('something went wrong',500);
        }
    }

    ######################################        edit            ########################## 
    public function editUser($id)
    {
        try {
            $users=Users::find($id);
            if(! $users){
                return  $this->returnError("user isn't found",404);
            }
    
            return $this->returnSuccess('','users',$users);

        } catch (\Exception $th) {
            return  $this->returnError('something went wrong',500);
        }
    }

    ######################################        update            ########################## 
    public function updateUser(Request $request,$id)
    {
        try {
            $photo=$request->file('photo');
            $rules=$this->MembersRules($id,$photo,0);
    
            $validator=Validator::make($request->all(),$rules);
    
            if($validator->fails()){
                return  $this->returnError($validator->errors(),400);
            }
    
            $users=Users::find($id);
            if(! $users){
                return  $this->returnError("user isn't found",404);
            }
    
            $fileName=$users->photo;
            if($photo){
                $fileName=$this->UploadPhoto($photo , 'images/users');
            }
            
            $name     = filter_var($request->name       ,FILTER_SANITIZE_STRING);
            $email    = filter_var($request->email      ,FILTER_SANITIZE_EMAIL);
            $password = filter_var($request->password   ,FILTER_SANITIZE_STRING);
            $photo    = filter_var($fileName            ,FILTER_SANITIZE_STRING);

            $users->name     = $name;
            $users->email    = $email;
            $users->password = Hash::make($password);
            $users->photo    = $photo;
    
            $users->save();
            
            return $this->returnSuccess('you successfully updated admin');

        } catch (\Exception $th) {
            return  $this->returnError('something went wrong',500);
        }
    }

    ######################################        get count            ########################## 
    public function getCount()
    {
        try {
            $users=Users::all();
            $usersCount=$users->count();
            return response()->json(compact('usersCount'));

        } catch (\Exception $th) {
            return  $this->returnError('something went wrong',500);
        }
		
	}
}
