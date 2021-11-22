<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Util\DefaultCheckListOrganization;
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

    public function getAllDefaultChecklist($id){
        $defaultChecklistOrganization=new DefaultCheckListOrganization();
        $allDefaultChecklist=json_encode($defaultChecklistOrganization->getDefaultChecklistById($id));
        
        echo $allDefaultChecklist;
    }

    public function uploadFile(Request $request){
        $array=['error'=>""];

        $file=$request->all()['checklistFile'];
        $fileName=md5(rand(0,99999).rand(0,99999)).'.'.$file->getClientOriginalExtension();
        
        if($file->getClientOriginalExtension() == "php" || $file->getClientOriginalExtension() == "js" ){
            $array['error']="Extensão inválida";
        }else{
            $pathImage="public/checklists_files/";
            $file->storeAs($pathImage,$fileName);
    
            $array['fileName']=$fileName;
        }

        return json_encode($array);
    }
}
