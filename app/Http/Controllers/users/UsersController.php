<?php

namespace App\Http\Controllers\users;

use App\Models\Users;
use App\Traits\UploadPhoto;
use App\Traits\MembersRules;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;

class UsersController extends Controller
{
    use UploadPhoto;
    use MembersRules;

    public function __construct()
    {
        Auth::shouldUse('users');
    }

    ######################################        add            ########################## 
    public function add(Request $request ){
        try {
            //import from trait(MembersRules)
            $rules=$this->MembersRules(null,$request,0);

            $validator=Validator::make($request->all(),$rules);

            if($validator->fails()){
                return  $this->returnError($validator->errors(),400);
            }
            
            $name     = filter_var($request->name       ,FILTER_SANITIZE_STRING);
            $email    = filter_var($request->email      ,FILTER_SANITIZE_EMAIL);
            $password = filter_var($request->password   ,FILTER_SANITIZE_STRING);

            $users=Users::create([
                'name'     => $name,
                'email'    => $email,
                'password' => Hash::make($password),
                'date'     => now(),
                ]);

            return $this->returnSuccess('you successfully added user');

        } catch (\Exception $th) {
            return  $this->returnError('something went wrong',500);
        }
    }

    ######################################        login            ########################## 
    public function userLogin(Request $request){
        try{
            $credentials=$request->all();
            if(! $user_token = JWTAuth::attempt($credentials)){
                return  $this->returnError('incorrect email and password',400);
            }

            return $this->returnSuccess('you successfully logged in','user_token',$user_token);

        }catch(JWTException $e){
            return  $this->returnError("can't create token",$e->getStatusCode());
        }
    }

    ######################################        get auth user            ########################## 
    public function getAuthenticatedUser()
{
	try {
		if (! $user = JWTAuth::parseToken()->authenticate()) {
			return  $this->returnError("user isn't found",404);
		}

        return $this->returnSuccess('','user',$user);

	} catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

		return  $this->returnError("token is expired",$e->getStatusCode());

	} catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

		return  $this->returnError("invalid token",$e->getStatusCode());

	} catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

		return  $this->returnError("token is absent",$e->getStatusCode());

	}
}

}
