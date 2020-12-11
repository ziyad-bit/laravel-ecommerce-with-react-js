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

    public function addUser(Request $request ){
        $emailUniqueRule=[
            'email'=>'unique:users'
        ];
        $error=[
            'email_unique'=>'this email is used'
        ];
        
        $validator=Validator::make($request->only('email'),$emailUniqueRule);

        if($validator->fails()){
            return response()->json($error, 400);
        }

        //import from trait(MembersRules)
        $rules=$this->MembersRules($request);

        $validator=Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()->json(['error at validation'] , 400);
        }
        
        $users=Users::create([
            'name'     => $request->get('name'),
            'email'    => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'date'     => now(),
            
        ]
        
        );

        return response()->json(compact('users'));
    }

    public function userLogin(Request $request){
		
        $credentials=$request->all();
        try{
            if(! $user_token = JWTAuth::attempt($credentials)){
                return response()->json(['invalid credentails']);
            }
        }catch(JWTException $e){
            return response()->json(['cant create token']);
        }
            
        return response()->json(compact('user_token'));
        
    }

    public function getAuthenticatedAdmin()
{
	try {

		if (! $admin = JWTAuth::parseToken()->authenticate()) {
			return response()->json(['user_not_found'], 404);
		}

	} catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

		return response()->json(['token_expired'], $e->getStatusCode());

	} catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

		return response()->json(['token_invalid'], $e->getStatusCode());

	} catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

		return response()->json(['token_absent'], $e->getStatusCode());

	}

	// the token is valid and we have found the user via the sub claim
	return response()->json(compact('admin'));
}

}
