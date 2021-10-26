<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    public function getUser($id){
        $array=['error'=>''];

        if($id != ""){
            $user=User::where('id',$id)->first();
            if($user != null){
                $array['user']=$user;
            }
        }

        return $array;
    }
}
