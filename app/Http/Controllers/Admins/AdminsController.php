<?php

namespace App\Http\Controllers\Admins;

use App\Models\Admins;
use App\Traits\UploadPhoto;
use App\Traits\MembersRules;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Hash;

class AdminsController extends Controller
{
	use UploadPhoto;
	use MembersRules;
	
    public function adminsLogin(Request $request){
		
        $credentials=$request->all();
        try{
            if(! $token = JWTAuth::attempt($credentials)){
                return response()->json(['invalid credentails']);
            }
        }catch(JWTException $e){
            return response()->json(['cant create token']);
        }
            
        return response()->json(compact('token'));
        
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



public function addAdmins(Request $request ){
	$emailUniqueRule=[
		'email'=>'unique:admins'
	];
	$error=[
		'email_unique'=>'this email is used'
	];
	
	$validator=Validator::make($request->only('email'),$emailUniqueRule);

	if($validator->fails()){
		return response()->json($error , 400);
	}

	//import from trait(MembersRules)
	$rules=$this->MembersRules($request);

	$validator=Validator::make($request->all(),$rules);

	if($validator->fails()){
		return response()->json(['error at validation'] , 400);
	}
	
	$admins=Admins::create([
		'name'     => $request->get('name'),
		'email'    => $request->get('email'),
		'password' => Hash::make($request->get('password')),
		
	]
	
	);

	return response()->json(compact('admins'));
}

	public function getAdmin(){
		$admins=Admins::orderBy('id','desc')->paginate(1);
		return response()->json(compact('admins'));
	}

	public function deleteAdmin($id){
        $admins=Admins::find($id);
        $admins->delete();
	}
	
	public function updateAdmin(Request $request,$id){
        $emailUniqueRule=[
            'email'=>'unique:admins,email,'.$id
        ];
        $error=[
            'email_unique'=>'this email is used'
        ];
        
        $validator=Validator::make($request->only('email'),$emailUniqueRule);
		if($validator->fails()){
            return response()->json($error , 400);
        }

        
        $rules=$this->MembersRules();

        $validator=Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()->json(['error at validation'] , 400);
        }

        $admins=admins::find($id);
        $admins->name     = $request->name;
        $admins->email    = $request->email;
        $admins->password = Hash::make($request->password);

        $admins->save();
        
        return response()->json(compact('admins'));
	}
	
	public function getCount(){
		$admins=Admins::all();
		$adminsCount=$admins->count();
		return response()->json(compact('adminsCount'));
	}
}
