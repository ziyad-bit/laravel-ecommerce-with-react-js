<?php

namespace App\Http\Controllers\Admins;

use App\Models\Admins;
use App\Traits\{UploadPhoto,MembersRules,General};
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\{Validator,Hash};
use Tymon\JWTAuth\Exceptions\JWTException;

class AdminsController extends Controller
{
	use UploadPhoto;
	use MembersRules;
	use General;

#######################################       login        ##############################
    public function adminsLogin(Request $request)
	{
        try{
			$credentials=$request->all();
            if(! $token = JWTAuth::attempt($credentials)){
                return $this->returnError('wrong password or email',400);
            }

			return $this->returnSuccess('you successfully logged in','token',$token);

        }catch(JWTException $ex){
            return $this->returnError("can't create token",$ex->getStatuscode());
        }
    }

#######################################       logout        ##############################
	public function adminsLogout(Request $request)
	{
        try{
			$token=$request->header('adminsToken');
			JWTAuth::setToken($token)->invalidate();
				
			return $this->returnSuccess('you successfully logged out');

        }catch(\Exception $ex){
            return $this->returnError("something went wrong",500);
        }
    }

#######################################       get authenticated admin     ##############################
    public function getAuthenticatedAdmin()
	{
		try {

			if (! $admin = JWTAuth::parseToken()->authenticate()) {
				return $this->returnError("user isn't found",404);
			}

			return $this->returnSuccess('','admin',$admin);

		} catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

			return $this->returnError("token is expired",$e->getStatusCode());

		} catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

			return $this->returnError("token is invalid",$e->getStatusCode());

		} catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

			return $this->returnError("token is absent",$e->getStatusCode());
		}
	}

#######################################       add         ##############################
	public function addAdmins(Request $request )
	{
		try {
			//import from trait(MembersRules)
			$rules=$this->MembersRules();

			$validator=Validator::make($request->all(),$rules);

			if($validator->fails()){
				return $this->returnError($validator->errors(),400);
			}

			$name     = filter_var($request->get('name')     ,FILTER_SANITIZE_STRING);
			$email    = filter_var($request->get('email')    ,FILTER_SANITIZE_EMAIL);
			$password = filter_var($request->get('password') ,FILTER_SANITIZE_STRING);

			Admins::create([
				'name'     => $name,
				'email'    => $email,
				'password' => Hash::make($password),
			]);

			return $this->returnSuccess('you successfully added admin');

		} catch (\Exception $th) {
			return $this->returnError('something went wrong',500);
		}
	
	}

#######################################       get all admins        ##############################
	public function getAdmin()
	{
		try {
			$admins=Admins::orderBy('id','desc')->paginate(1);
			return $this->returnSuccess('','admins',$admins);

		} catch (\Exception $th) {
			return $this->returnError('something went wrong',500);
		}
		
	}

	#######################################       delete         ##############################
	public function deleteAdmin($id)
	{
		try {
			$admin=Admins::find($id);
			if(! $admin){
				return $this->returnError("admin isn't found",404);
			}
			$admin->delete();
			return $this->returnSuccess('you successfully deleted admin');

		} catch (\Exception $th) {
			return $this->returnError("something went wrong",500);
		}
        
	}
	
	#######################################       update        ##############################
	public function updateAdmin(Request $request,$id)
	{
		try {
			$rules=$this->MembersRules($id);

			$validator=Validator::make($request->all(),$rules);
			if($validator->fails()){
				return $this->returnError($validator->errors(),400);
			}
			
			$name     = filter_var($request->name     ,FILTER_SANITIZE_STRING);
			$email    = filter_var($request->email    ,FILTER_SANITIZE_EMAIL);
			$password = filter_var($request->password ,FILTER_SANITIZE_STRING);
	
			$admins=admins::find($id);
			if(! $admins){
				return $this->returnError("admin isn't found",404);
			}

			$admins->name     = $name;
			$admins->email    = $email;
			$admins->password = Hash::make($password);
	
			$admins->save();
			
			return $this->returnSuccess('you successfully updated admin');

		} catch (\Exception $th) {
			return $this->returnError("something went wrong",500);
		}
	}
	
	#######################################       get count        ##############################
	public function getCount()
	{
		try {
			$admins=Admins::all();
			$adminsCount=$admins->count();

			return $this->returnSuccess('','adminsCount',$adminsCount);

		} catch (\Exception $th) {
			return $this->returnError("something went wrong",500);
		}
		
	}
}
