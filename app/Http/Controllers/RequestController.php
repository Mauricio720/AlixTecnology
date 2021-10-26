<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RequestController extends Controller
{   
    public function __construct(){
        $this->middleware('auth');
    }
   
    public function getUser($id){
        $array=['error'=>''];

        if($id != ""){
            $user=User::where('id',$id)->first();
            if($user != null){
                $array['user']=$user;
            }
        }

        echo json_encode($array);
    }

    public function getAddressByCep($cep){
        $data=['error'=>''];
        if($cep != ""){
            $url='https://viacep.com.br/ws/'.$cep.'/json/';
            $data['address'] =json_decode(file_get_contents($url));
        }
        
        echo json_encode($data);
    }
}
