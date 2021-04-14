<?php 

namespace App\Traits;

trait UploadPhoto
{
    public function UploadPhoto($request ,string $path):string
    {
        $file=$request;
        $fileName=time() . '_' . $file->getClientOriginalName();
        $filePath=$path;
        $file->move($filePath,$fileName);
        return $fileName;
    }
}
