<?php

namespace App\Http\Controllers;

use App\Models\Checklist;
use App\Models\Client;
use App\Models\DefaultCheckList;
use App\Util\CheckListOrganization;
use App\Util\DefaultCheckListOrganization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ChecklistController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function index(Request $request,$idClient=null){
        $data=[];
        $queryChecklist=CheckList::query();
        
        $queryChecklist->join('default_checklists','checklists.id_default_checklist','default_checklists.id')    
            ->join('clients','checklists.id_client','clients.id')
            ->join('users','checklists.id_user','users.id')
            ->where('id_checklist',null);
        
        

        if($idClient != null){
            $queryChecklist->where('id_client',$idClient);
        }    
        
        $data['allChecklist']=$queryChecklist->orderBy('id','DESC')->paginate(10,['checklists.*','default_checklists.name as checklistName','clients.name as clientName'
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
            $query->where('checklists.points','LIKE','%'.$pointsChecklist.'%');
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
        $queryClient=Client::query();
        
        $data['idClient']="";
        $idClient=$request->input(['idClient']);
        
        if($idClient!=null){
            $data['idClient']=$idClient;
            $queryClient->where('id',$idClient);
        }
        
        $data['allClients']=$queryClient->paginate(5,['*'],'page_client');

        $data['nameCnpj']='';
        if($request->has('nameCnpj')){
            $data['idClient']="";
            $nameCnpj=$request->input('nameCnpj');
            $data['allClients']=$this->filterClients($nameCnpj);
            $data['nameCnpj']=$nameCnpj;
        }
        
        $data['allDefaultChecklist']=DefaultCheckList::where('idDefaultChecklist',null)
            ->orderBy('id','DESC')->paginate(5,['*'],'page_default_checklist');
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
      
        $checklistOrganization=new CheckListOrganization($idClient);
         
        if($request->filled('checklistArray')){
            $checklistOrganization->addChecklist($checklistArray);
            $checklistOrganization->deleteFilesNotUsed();
        }

        return redirect()->route('allChecklists');
    }

    public function getChecklistById($id,$historic_checklist_idClient=false){
        $checklistOrganization=new CheckListOrganization();
        $data['allChecklists']=json_encode($checklistOrganization->getChecklistById($id));
        
        $data['historic_checklist_idClient']=$historic_checklist_idClient;
        $data['checklist']=CheckList::where('id',$id)->first();
        $data['defaultChecklist']=DefaultCheckList::where('id',$data['checklist']->id_default_checklist)->first();

        return view('dashboard.checklist.seeChecklist',$data);
    }
    
    private function filterClients($nameCnpj){
        $clients=Client::where('name','LIKE','%'.$nameCnpj.'%')->orWhere('cnpj','LIKE','%'.$nameCnpj.'%');
        return $clients->paginate(5);
    }

    private function filterDefaultChecklist($nameDefaultChecklist){
        $defaultChecklist=DefaultCheckList::where('idDefaultChecklist',null)->where('name','LIKE','%'.$nameDefaultChecklist.'%');
        return $defaultChecklist->orderBy('id','DESC')->paginate(5);
    }

    public function historicChecklist(Request $request,$idClient){
        $data['client']=Client::where('id',$idClient)->first();

        $data['allChecklist']=CheckList::join('default_checklists','checklists.id_default_checklist','default_checklists.id')    
            ->join('clients','checklists.id_client','clients.id')->where('id_checklist',null)
            ->where('clients.id',$idClient)
            ->whereYear('checklists.created_at',date('Y'))
            ->where('idDefaultChecklist',null)->paginate(10,['checklists.*','default_checklists.name as checklistName',
            'clients.name as clientName','default_checklists.observation as observationChecklist']);;

        $data['year']=date('Y');

        $data['startDate']="";
        $data['finalDate']="";
        if($request->has(['startDate','finalDate'])){
            $data=$this->filterChecklistHistoric($request,$data,$idClient);
        }

        return view('dashboard.checklist.historic_checklist',$data);    
    }

    private function filterChecklistHistoric($request,$data,$idClient){
        $checklistQuery=Checklist::query()->join('default_checklists','checklists.id_default_checklist','default_checklists.id')    
        ->join('clients','checklists.id_client','clients.id')->where('id_checklist',null)
        ->where('clients.id',$idClient);
        
        if($request->filled(['startDate','finalDate'])){
            $startDate=$request->input('startDate');
            $finalDate=$request->input('finalDate');
        
            $checklistQuery->whereBetween('checklists.created_at',[$startDate,$finalDate]);
            $data['startDate']=$startDate;
            $data['finalDate']=$finalDate;
            $yearStartDate=date('Y',strtotime($startDate));
            $yearFinalDate=date('Y',strtotime($finalDate));
            if($yearStartDate==$yearFinalDate){
                $data['year']=date('Y',strtotime($startDate));    
            }else{
                $data['year']=date('Y',strtotime($startDate)). '-' .date('Y',strtotime($finalDate));
            }
        }

        $data['allChecklist']=$checklistQuery->paginate(10,['checklists.*','default_checklists.name as checklistName',
        'clients.name as clientName','default_checklists.observation as observationChecklist']);

        return $data;
    }

    public function compareChecklist($idChecklist1,$idChecklist2){
        $data=[];

        $checklist1=Checklist::where('id',$idChecklist1)->first();
        $checklist2=Checklist::where('id',$idChecklist2)->first();
        
        if($checklist1 == null || $checklist2 == null){
            return redirect()->route('allClients');
        }
        
        if($checklist1->id_default_checklist != $checklist2->id_default_checklist){
            return redirect()->route('allClients');
        }
        
        $defaultChecklist=DefaultCheckList::where('id',$checklist1->id_default_checklist)->first();
        
        $defaultChecklistOrganization=new DefaultCheckListOrganization();
        $data['defaultChecklistArray']=json_encode($defaultChecklistOrganization->getDefaultChecklistById($defaultChecklist->id));
        
        $checklistOrganization=new CheckListOrganization();
        $data['checklist1']=json_encode($checklistOrganization->getChecklistById($checklist1->id));
        $data['checklist2']=json_encode($checklistOrganization->getChecklistById($checklist2->id));
        
        $data['client']=Client::where('id',$checklist1->id_client)->first();
        
        return view('dashboard.checklist.compareChecklist',$data);    

    }
}
