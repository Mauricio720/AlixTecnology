<?php

namespace App\Http\Controllers;

use App\Models\Checklist;
use App\Models\Client;
use App\Models\DefaultCheckList;
use App\Util\CheckListOrganization;
use Illuminate\Http\Request;

class ChecklistController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function index(Request $request){
        $data=[];
        $data['allChecklist']=CheckList::join('default_checklists','checklists.id_default_checklist','default_checklists.id')    
            ->join('clients','checklists.id_client','clients.id')
            ->join('users','checklists.id_user','users.id')
            ->where('id_checklist',null)
            ->paginate(10,['checklists.*','default_checklists.name as checklistName','clients.name as clientName'
                ,'users.name as userName','default_checklists.observation as observationChecklist']);
        
        $data['nameChecklist']="";
        $data['pointsChecklist']="";
        $data['pointsObtained']="";
        $data['clientName']="";
        $data['observationChecklist']="";

        if($request->hasAny(['nameChecklist','pointsChecklist','pointsObtained','clientName','observationChecklist'])){
            $data=$this->filterChecklist($request,$data);
        }
        return view('dashboard.checklist.allChecklists',$data);
    }

    private function filterChecklist($request){
        $query=CheckList::query()->join('default_checklists','checklists.id_default_checklist','default_checklists.id')    
            ->join('clients','checklists.id_client','clients.id')
            ->join('users','checklists.id_user','users.id');
                
        $nameChecklist=$request->input('nameChecklist');
        $pointsChecklist=$request->input('pointsChecklist');
        $pointsObtained=$request->input('pointsObtained');
        $clientName=$request->input('clientName');
        $observationChecklist=$request->input('observationChecklist');

        $data['nameChecklist']=$nameChecklist;
        $data['pointsChecklist']=$pointsChecklist;
        $data['pointsObtained']=$pointsObtained;
        $data['clientName']=$clientName;
        $data['observationChecklist']=$observationChecklist;
    
        
        if($request->filled('nameChecklist')){
            $query->where('default_checklists.name','LIKE','%'.$nameChecklist.'%');
        }
        
        if($request->filled('pointsChecklist')){
            $query->where('checklists.points','%'.$pointsChecklist.'%');
        }

        if($request->filled('pointsObtained')){
            $query->where('checklists.pointsObtained','LIKE','%'.$pointsObtained.'%');
        }

        if($request->filled('clientName')){
            $query->where('clients.name','LIKE','%'.$clientName.'%');
        }

        if($request->filled('observationChecklist')){
            $query->where('default_checklists.observation','LIKE','%'.$observationChecklist.'%');
        }

        $data['allChecklist']=$query->where('idDefaultChecklist',null)->paginate(10,['checklists.*','default_checklists.name as checklistName',
        'clients.name as clientName' ,'users.name as userName','default_checklists.observation as observationChecklist']);;
    
        return $data;
    }

    public function add(Request $request){
        $data=[];
        $data['allClients']=Client::paginate(5);
        
        $data['nameCnpj']='';
        if($request->has('nameCnpj')){
            $nameCnpj=$request->input('nameCnpj');
            $data['allClients']=$this->filterClients($nameCnpj);
            $data['nameCnpj']=$nameCnpj;
        }
        
        $data['allDefaultChecklist']=DefaultCheckList::where('idDefaultChecklist',null)->paginate(5);
        $data['nameDefaultChecklist']='';

        if($request->has('nameDefaultChecklist')){
            $nameDefaultChecklist=$request->input('nameDefaultChecklist');
            $data['allDefaultChecklist']=$this->filterDefaultChecklist($nameDefaultChecklist);
            $data['nameDefaultChecklist']=$nameDefaultChecklist;
        }
        
        return view('dashboard.checklist.addChecklist',$data);
    }

    public function addChecklist(Request $request){
        $data=$request->only(['idClient','checklistArray']);
        $checklistArray=json_decode($data['checklistArray']);
        $idClient=$data['idClient'];
      
        /*
        $checklistOrganization=new CheckListOrganization($idClient);
         
        if($request->filled('checklistArray')){
            $checklistOrganization->addChecklist($checklistArray);
        }

        return redirect()->route('allChecklists');*/
    }

    private function filterClients($nameCnpj){
        $clients=Client::where('name','LIKE','%'.$nameCnpj.'%')->orWhere('cnpj','LIKE','%'.$nameCnpj.'%');
        return $clients->paginate(5);
    }

    private function filterDefaultChecklist($nameDefaultChecklist){
        $defaultChecklist=DefaultCheckList::where('idDefaultChecklist',null)->where('name','LIKE','%'.$nameDefaultChecklist.'%');
        return $defaultChecklist->paginate(5);
    }
}
