<?php 

namespace App\Traits;

trait CommentRules{
    public function commentRules(){
        $rules=[
            'comment'        => 'required|string|min:4|max:300',
            
        ];
        return $rules;
    }
    
}