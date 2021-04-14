<?php 

namespace App\Traits;

trait General
{
    public function returnError($msg , int $statusCode)
    {
        return response()->json([
            'status'    => false,
            'error_msg' => $msg,
        ],$statusCode);
    }
    
    public function returnSuccess(string $msg ,string $key='data' , $value=null ,int $statusCode=200)
    {
        return response()->json([
            'status'      => true,
            'success_msg' => $msg,
            $key          => $value,
        ],$statusCode);
    }
}
