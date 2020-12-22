<?php

namespace App\Http\Controllers\users;

use App\Models\Comment;
use App\Traits\CommentRules;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    use CommentRules;

        public function add(Request $request){
            $rules=$this->commentRules();

            $validator=Validator::make($request->all(),$rules);

            if($validator->fails()){
                return response()->json(['error at validation'] , 400);
            }

            $comment=Comment::create([
                'comment' => $request->get('comment'),
                'user_id' => $request->get('user_id'),
                'item_id' => $request->get('item_id'),
                
            ]
            );
    
    
            return response()->json(compact('comment'));
        }
        
        public function get($id){
            $user_comment=Comment::with('users')->where('item_id',$id)->get();
            return response()->json(compact('user_comment'));
        }

}
