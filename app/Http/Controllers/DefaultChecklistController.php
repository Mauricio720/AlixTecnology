<?php

namespace App\Http\Controllers;

use App\Models\Checklist;
use App\Models\DefaultChecklistJson;
use App\Models\DefaultCheckList;
use Illuminate\Http\Request;
use App\Util\DefaultCheckListOrganization;
use Illuminate\Support\Facades\Auth;

class DefaultChecklistController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function index(Request $request){
        $data=[];
        $data['allDefaultChecklist']=DefaultCheckList::where('idDefaultChecklist',null)->orderBy('id','DESC')->paginate(10);
        $data['allDefaultChecklistInProgress']=DefaultChecklistJson::orderBy('id','DESC')->paginate(10);
        $data['nameChecklist']="";
        $data['pointsChecklist']="";
        $data['observationChecklist']="";

        if($request->hasAny(['nameChecklist','pointsChecklist','observationChecklist'])){
            $data=$this->filterDefaultChecklist($request,$data);
        }

        return view('dashboard.defaultChecklist.allDefaultChecklist',$data);
    }

    public function addView(Request $request){
        $data=[];
        
        $data['default_checkjson_id']='';
        $data['default_checklist_json']='';
        $data['lastIdIncrement']="";
        $data['lastIdIncrementOption']="";
        
        if($request->default_checklist_json_id != ""){
            $idChecklistJson=intVal($request->default_checklist_json_id);
            $checklistJson=DefaultChecklistJson::where('id',$idChecklistJson)->first();
            $data['default_checkjson_id']=$idChecklistJson;
            $data['default_checklist_json']=$checklistJson->json;
            $data['lastIdIncrement']=$checklistJson->lastIdIncrement;
            $data['lastIdIncrementOption']=$checklistJson->lastIdIncrementOption;
        }

        $data['allDefaultChecklist']=DefaultCheckList::where('idDefaultChecklist',null)
            ->orderBy('id','DESC')->paginate(5,['*'],'page_default_checklist');
       
        $data['nameChecklist']='';

        if($request->has('nameChecklist')){
            $data=$this->filterDefaultChecklist($request,$data);
        }

        $data['registerChecklist']=$request->registerChecklist!=""?$request->registerChecklist:'';

        return view('dashboard.defaultChecklist.addDefaultChecklist',$data);
    }

    private function filterDefaultChecklist($request,$data){
     
        $query=DefaultCheckList::query();
            
        $nameChecklist=$request->input('nameChecklist');
        $pointsChecklist=$request->input('pointsChecklist');
        $observationChecklist=$request->input('observationChecklist');

        $data['nameChecklist']=$nameChecklist;
        $data['pointsChecklist']=$pointsChecklist;
        $data['observationChecklist']=$observationChecklist;
    
        
        if($request->filled('nameChecklist')){
            $query->where('name','LIKE','%'.$nameChecklist.'%');
        }
        
        if($request->filled('pointsChecklist')){
            $query->where('points','LIKE','%'.$pointsChecklist.'%');
        }

        if($request->filled('observationChecklist')){
            $query->where('observation','LIKE','%'.$observationChecklist.'%');
        }

        $data['allDefaultChecklist']=$query->where('idDefaultChecklist',null)->paginate(10);

        return $data;
    }

   public function add(Request $request){
        if($request->filled('idDefaultCheckJson')){
            $idDefaultCheckJson=$request->input('idDefaultCheckJson');
            $defaultChecklistJson=DefaultChecklistJson::where('id',$idDefaultCheckJson)->first();
            $defaultChecklistJson->delete();
        }

        $allDefaultChecklists=json_decode($request->input('allChecklists'));
        $json=$request->input('default_checklist_json_oficial');
        $lastIdIncrement=$request->input('lastIdIncrement');
        $lastIdIncrementOption=$request->input('lastIdIncrementOption');
        
        $defaultChecklistOrganization=new DefaultCheckListOrganization();
        
        if($request->filled('allChecklists')){
            foreach ($allDefaultChecklists as $key => $defaultChecklist) {
                $defaultChecklistOrganization->addDefaultChecklist($defaultChecklist,null,$json,$lastIdIncrement,$lastIdIncrementOption);
            }
        }

        if($request->filled('registerChecklist')){
            return redirect()->route('addChecklist');
        }else{
            return redirect()->route('defaultChecklist');        
        }
    }

    public function save(Request $request){
        $allDefaultChecklists=$request->input('default_checklist_json');
        $idDefaultCheckJson=$request->input('idDefaultCheckJson');
        $namesChecklist=$request->input('checklist_names');
        $lastIdIncrement=$request->input('lastIdIncrement');
        $lastIdIncrementOption=$request->input('lastIdIncrementOption');

        if($request->filled('default_checklist_json')){
           if($request->filled('idDefaultCheckJson')){
              $defaultChecklistJson=DefaultChecklistJson::where('id',$idDefaultCheckJson)->first();
              $defaultChecklistJson->names=$namesChecklist;
              $defaultChecklistJson->lastIdIncrement=$lastIdIncrement;
              $defaultChecklistJson->json=$allDefaultChecklists;
           }else{
                $defaultChecklistJson=new DefaultChecklistJson();
                $defaultChecklistJson->json=$allDefaultChecklists;
                $defaultChecklistJson->names=$namesChecklist;
                $defaultChecklistJson->id_user=Auth::user()->id;
                $defaultChecklistJson->lastIdIncrement=$lastIdIncrement;
                $defaultChecklistJson->lastIdIncrementOption=$lastIdIncrementOption;
           }
            
            $defaultChecklistJson->save();
        }

        if($request->filled('registerChecklist')){
            return redirect()->route('addChecklist');
        }else{
            return redirect()->route('defaultChecklist');        
        }
    }

    public function deleteDefaultCheckJson($id){
        $defaultChecklistJson=DefaultCheckListJson::where('id',$id)->first();

        if($defaultChecklistJson != null){
            $defaultChecklistJson->delete();
        }else{
            return redirect()->route('defaultChecklist');
        }

        return redirect()->route('defaultChecklist');
    }

    public function getDefaultChecklistById($id){
        $defaultChecklistOrganization=new DefaultCheckListOrganization();
        $data['allDefaultChecklist']=json_encode($defaultChecklistOrganization->getDefaultChecklistById($id));
        
        $data['defaultChecklist']=DefaultCheckList::where('id',$id)->first();

        return view('dashboard.defaultChecklist.seeDefaultChecklist',$data);
    }

    public function delete($id){
        $defaultChecklist=DefaultCheckList::where('id',$id)->first();

        if($defaultChecklist != null){
            if($this->verifyChecklist($id)){
                $defaultChecklistOrganization=new DefaultCheckListOrganization();
                $defaultChecklistOrganization->deleteDefaultChecklist($defaultChecklist);
            }else{
                return redirect()->route('defaultChecklist')->withErrors('Há checklists oficiais que estão usando essa checklist!');
            }
        }

        return redirect()->route('defaultChecklist');

    }

    private function verifyChecklist($id){
        $checklist=Checklist::where('id_default_checklist',$id)->first();
        if($checklist==null){
            return true;
        }else{
            return false;
        }
    }
    
}
