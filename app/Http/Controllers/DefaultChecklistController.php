<?php

namespace App\Http\Controllers;

use App\Models\DefaultCheckList;
use Illuminate\Http\Request;
use App\Util\DefaultCheckListOrganization;

class DefaultChecklistController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function index(Request $request){
        $data=[];
        $data['allDefaultChecklist']=DefaultCheckList::where('idDefaultChecklist',null)->paginate(10);
        $data['nameChecklist']="";
        $data['pointsChecklist']="";
        $data['observationChecklist']="";

        if($request->hasAny(['nameChecklist','pointsChecklist','observationChecklist'])){
            $data['allDefaultChecklist']=$this->filterDefaultChecklist($request);

        }

        return view('dashboard.defaultChecklist.allDefaultChecklist',$data);
    }

    private function filterDefaultChecklist($request){
        $query=DefaultCheckList::query();
            
        $nameChecklist=$request->input('nameChecklist');
        $pointsChecklist=$request->input('pointsChecklist');
        $observationChecklist=$request->input('observationChecklist');

        $data['nameChecklist']=$nameChecklist;
        $data['pointsChecklist']=$pointsChecklist;
        $data['observationChecklist']=$observationChecklist;
    
        
        if($request->filled('nameChecklist')){
            $query->Where('name','LIKE','%'.$nameChecklist.'%');
        }
        
        if($request->filled('pointsChecklist')){
            $query->Where('points',$pointsChecklist);
        }

        if($request->filled('observationChecklist')){
            $query->Where('observation','LIKE','%'.$observationChecklist.'%');
        }

        $data['allDefaultChecklist']=$query->where('idDefaultChecklist',null)->paginate(10);
    }

    public function addView(Request $request){
        $data=[];
        $data['registerChecklist']=$request->registerChecklist!=""?$request->registerChecklist:'';

        return view('dashboard.defaultChecklist.addDefaultChecklist',$data);
    }

    public function add(Request $request){
        $allDefaultChecklists=json_decode($request->input('allChecklists'));
        $defaultChecklistOrganization=new DefaultCheckListOrganization();
        
        if($request->filled('allChecklists')){
            foreach ($allDefaultChecklists as $key => $defaultChecklist) {
                $defaultChecklistOrganization->addDefaultChecklist($defaultChecklist);
            }
        }

        if($request->filled('registerChecklist')){
            return redirect()->route('addChecklist');
        }else{
            return redirect()->route('defaultChecklist');        
        }
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
            $defaultChecklistOrganization=new DefaultCheckListOrganization();
            $defaultChecklistOrganization->deleteDefaultChecklist($defaultChecklist);
        }

        return redirect()->route('defaultChecklist');

    }
    
}
