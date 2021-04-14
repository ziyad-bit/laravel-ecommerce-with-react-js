<?php

namespace App\Http\Controllers\users;


use DB;
use App\Traits\{General , UploadPhoto , MembersRules};
use App\Mail\{VerifyMail , ResetPasswordMail};
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\{Auth , Validator , Mail , Hash};
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\{Users , Verify_email , Password_resets};

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
    public function add(Request $request)
    {
        try {
            DB::beginTransaction();
            //import from trait(MembersRules)
            $rules=$this->MembersRules(null,null,0);

            $validator=Validator::make($request->all(),$rules);

            if($validator->fails()){
                return  $this->returnError($validator->errors(),400);
            }
            
            $name     = filter_var($request->name       ,FILTER_SANITIZE_STRING);
            $email    = filter_var($request->email      ,FILTER_SANITIZE_EMAIL);
            $password = filter_var($request->password   ,FILTER_SANITIZE_STRING);

            $user=Users::create([
                'name'     => $name,
                'email'    => $email,
                'password' => Hash::make($password),
                'date'     => now(),
            ]);
            
            $token=Str::random(60);
            Verify_email::create([
                'token'      => $token,
                'email'      => $email,
            ]);

            $email=$user->email;
            Mail::to($email)->send(new VerifyMail($email,$token));

            DB::commit();

            return $this->returnSuccess('we sent link to verify your email');

        } catch (\Exception $th) {
            DB::rollBack();
            return  $this->returnError('something went wrong',500);
        }
    }

    ######################################        verify            ########################## 
    public function verify()
    {
        try {
            DB::beginTransaction();

            $email=request('email');
            $token=request('token');
        
            $email_token=Verify_email::where([
                'email'=>$email,
                'token'=>$token,
            ]);
        
            $email_token_first=$email_token->first();
            if(! $email_token_first){
                return  $this->returnError('incorrect email',404);
            }
        
            $user=Users::whereEmail($email)->first();
            $user->update([
                'active'=>1
            ]);
        
            $email_token->delete();
        
            DB::commit();

            return $this->returnSuccess('you are verified');

        } catch (\Exception $th) {
            DB::rollBack();
            return  $this->returnError('something went wrong',500);
        }
    }

######################################        login            ########################## 
    public function userLogin(Request $request)
    {
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

######################################        forget password           ########################## 
public function forgetPassword(Request $request)
{
    try {
        $email=$request->email;
        $user=Users::whereEmail($email)->first();
        if(! $user){
            return $this->returnError('incorrect email',404);
        }

        $token=Str::random(40);
        Password_resets::create([
            'token'      => $token,
            'email'      => $email,
        ]);

        Mail::to($email)->send(new ResetPasswordMail($token,$email));

        return $this->returnSuccess('reset password link is sent to your email and this link will expire after 60 mins');
        
    } catch (\Exception $th) {
        return $this->returnError('something went wrong',500);
    }
    
}

######################################        reset password            ########################## 
    public function resetPassword(Request $request)
    {
        try {
            DB::beginTransaction();

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
        
            DB::commit();

            return $this->returnSuccess('you successfully changed password');

        } catch (\Exception $th) {
            DB::rollBack();
            return $this->returnError('something went wrong',500);
        }
        
    }
}
