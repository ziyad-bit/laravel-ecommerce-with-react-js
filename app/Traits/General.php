<?php 

namespace App\Traits;

trait General{
    public function returnError($msg,$statusCode){
        return response()->json([
            'status'     => false,
            'msg'        => $msg,
        ],$statusCode);
    }
    
    public function returnSuccess($msg,$key='data',$value=null,$statusCode=200){
        return response()->json([
            'status'     => true,
            'msg'        => $msg,
            $key         => $value,
        ],$statusCode);
    }

    
}