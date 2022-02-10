<?php

namespace App\Http\Controllers;

use App\Models\DefaultChecklistJson;
use App\Models\User;
use App\Util\DefaultCheckListOrganization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        
        $data=$request->only(['checklistFile']);
        $files=$data['checklistFile'];
       
        $errors=Validator::make($data,[
            'checklistFile'=>['max:40000']
        ],[],['checklistFile'=>'arquivo']);

 
        if($errors->fails()){
            $array['error']=$errors->errors()->first();
        }else{
            foreach ($files as $file) {
                $fileName=md5(rand(0,99999).rand(0,99999)).'.'.$file->getClientOriginalExtension();
                if($file->isValid()){
                    if($file->getClientOriginalExtension() == "php" || $file->getClientOriginalExtension() == "js" 
                        || $file->getClientOriginalExtension() == "exe"){
                            $array['error']="Extensão inválida";
                    }else{
                        $pathImage="public/checklists_files/";
                        $file->storeAs($pathImage,$fileName);
                
                        $array['filesNames'][]=$fileName;
                    }
                }
            }
           
        }
        
        return json_encode($array);
    }
}
