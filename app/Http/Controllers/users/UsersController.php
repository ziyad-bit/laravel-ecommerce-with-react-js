<?php

namespace App\Http\Controllers\users;

use DateTime;
use Carbon\Carbon;
use App\Models\Users;
use App\Mail\SendMail;
use App\Traits\General;
use App\Traits\UploadPhoto;
use Illuminate\Support\Str;
use App\Traits\MembersRules;
use Illuminate\Http\Request;
use App\Models\Password_resets;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;

class UsersController extends Controller
{
    use UploadPhoto;
    use MembersRules;
    use General;

    public function __construct()
    {
        Auth::shouldUse('users');
    }

    ######################################        add            ########################## 
    public function add(Request $request ){
        try {
            //import from trait(MembersRules)
            $rules=$this->MembersRules(null,null,0);

            $validator=Validator::make($request->all(),$rules);

            if($validator->fails()){
                return  $this->returnError($validator->errors(),400);
            }
            
            $name     = filter_var($request->name       ,FILTER_SANITIZE_STRING);
            $email    = filter_var($request->email      ,FILTER_SANITIZE_EMAIL);
            $password = filter_var($request->password   ,FILTER_SANITIZE_STRING);

            Users::create([
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

public function forgetPassword(Request $request)
{
    
    
    
    $rule        = ['email'=>'required|email|min:5'];
    $credentials = $request->only('email');

    $validator=validator::make($credentials,$rule);
    if($validator->fails()){
        return $this->returnError($validator->errors(),400);
    }

    $email=$request->email;
    $user=Users::whereEmail($email)->first();
    if(! $user){
        return $this->returnError('incorrect email',404);
    }

    $token = $this->generateToken($email);
    Mail::to($email)->send(new SendMail($token,$email));

    return $this->returnSuccess('reset password link is sent to your email');
}

public function generateToken($email)
{
    $token = Str::random(40);
    Password_resets::create([
        'token'      => $token,
        'email'      => $email,
        
    ]);
    
    return $token;
}



public function resetPassword(Request $request)
{
    $rule        = [
        'email'    => 'required|email|min:5',
        'password' => 'required|string|min:6|confirmed',
        'token'    => 'required|string',
    ];

    $validator=validator::make($request->all(),$rule);
    if($validator->fails()){
        return $this->returnError($validator->errors(),400);
    }

    $email=$request->email;
    $token=$request->token;
    $token_email=Password_resets::where([
        'email'=>$email,
        'token'=>$token
    ]);

    $token_email_first=$token_email->first();

    if(! $token_email_first){
        return $this->returnError('incorrect email or token',400);
    }
    

    $user=Users::whereEmail($email)->first();
    $user->update([
        'password'=>Hash::make($request->password)
    ]);

    $token_email->delete();

    return $this->returnSuccess('you successfully changed password');
}

}
