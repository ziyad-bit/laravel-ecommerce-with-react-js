<?php

namespace App\Http\Controllers\Admins;

use App\Models\Category;
use App\Traits\UploadPhoto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\CategoryRules;
use App\Traits\General;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    use UploadPhoto;
    use CategoryRules;
    use General;
    
    ########################################       add      #############################
    public function addCategory(Request $request){
        try {
            //import from trait(CategoryRules)
            $rules=$this->CategoryRules(null,$request);

            $validator=Validator::make($request->all(),$rules);

            if($validator->fails()){
                return $this->returnError($validator->errors(),400);
            }

            //import from trait(UploadPhoto) 
            $fileName=$this->UploadPhoto($request->file('photo') , 'images/category');
            
            $name        = filter_var($request->get('name')       ,FILTER_SANITIZE_STRING);
            $description = filter_var($request->get('description'),FILTER_SANITIZE_STRING);
            $photo       = filter_var($fileName                   ,FILTER_SANITIZE_STRING);

            Category::create([
                'name'        => $name,
                'description' => $description,
                'photo'       => $photo,
            ]);

            return $this->returnSuccess('you successfully added category');

        } catch (\Exception $th) {
            $this->returnError('something went wrong',500);
        }
    }

    ########################################       get      #############################
    public function getCategory(){
        try {
            $categories=Category::paginate(5);
            return $this->returnSuccess('','categories',$categories);

        } catch (\Exception $th) {
            $this->returnError('something went wrong',500);
        }
    }

    ########################################       delete      #############################
    public function deleteCategory($id){
        try {
            $categories=Category::find($id);
            if(! $categories){
                $this->returnError("category isn't found",404);
            }
            $categories->delete();
            
            return $this->returnSuccess('you successfully deleted category');

        } catch (\Exception $th) {
            return $this->returnError('something went wrong',500);
        }
        
    }

    ########################################       update      #############################
    public function updateCategory(Request $request ,$id){
        try {
             //import from trait(CategoryRules)
            $rules=$this->CategoryRules($id,$request->file('photo'));

            $validator=Validator::make($request->all(),$rules);

            if($validator->fails()){
                return $this->returnError($validator->errors(),400);
            }
            
            $category=Category::find($id);
            if(! $category){
                return $this->returnError("category isn't found",404);
            }

            $name        = filter_var($request->name       ,FILTER_SANITIZE_STRING);
            $description = filter_var($request->description,FILTER_SANITIZE_STRING);

            $category->name        = $name;
            $category->description = $description;

            return  $this->returnSuccess('you successfully updated category');;

        } catch (\Exception $th) {
            return $this->returnError("something went wrong",500);
        }
    }

    ########################################       update photo      #############################
    public function updatePhoto(Request $request ,$id){
        try {
            //import from trait(CategoryRules)
            $rules=$this->CategoryRules(null,$request->file('photo') );
            $validator=Validator::make($request->all(),$rules);

            if($validator->fails()){
                return $this->returnError($validator->errors(),400);
            }

            //import from trait(UploadPhoto) 
            $fileName=$this->UploadPhoto($request->file('photo') , 'images/category');
            
            $category=Category::find($id);
            if(! $category){
                return $this->returnError("category isn't found",404);
            }

            $photo  = filter_var($fileName       ,FILTER_SANITIZE_STRING);

            $category->photo=$photo;
            $category->save();

        return  $this->returnSuccess('you successfully updated photo');

        } catch (\Exception $th) {
            return $this->returnError("something went wrong",500);
        }
        
    }

    ########################################       edit     #############################
    public function editCategory($id){
        try {
            $category=Category::find($id);
            if(! $category){
                return $this->returnError("category isn't found",404);
            }
    
            return  $this->returnSuccess('','category',$category);
            
        } catch (\Exception $th) {
            return $this->returnError("something went wrong",500);
        }
        
    }
    
}
