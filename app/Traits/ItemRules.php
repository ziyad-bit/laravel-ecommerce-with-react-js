<?php 

namespace App\Traits;

trait ItemRules
{
    public function ItemRules($photo=null):array
    {
        if($photo){
            $photo_rule='required|image|mimes:jpg,jpeg,gif,png|max:14048';
        }else{
            $photo_rule='';
        }

        $rules=[
            'name'        => 'required|string|min:4|max:25',
            'description' => 'required|string|min:4|max:100',
            'status'      => 'required|numeric',
            'price'       => 'required|string',
            'photo'       => $photo_rule,
            'category_id' => 'required',
        ];
        return $rules;
    }
}
