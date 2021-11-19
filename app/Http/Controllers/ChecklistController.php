<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\DefaultCheckList;
use Illuminate\Http\Request;

class ChecklistController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function index(){
        $data=[];
        return view('dashboard.checklist.allChecklists',$data);
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

    private function filterClients($nameCnpj){
        $clients=Client::where('name','LIKE','%'.$nameCnpj.'%')->orWhere('cnpj','LIKE','%'.$nameCnpj.'%');
        return $clients->paginate(5);
    }

    private function filterDefaultChecklist($nameDefaultChecklist){
        $defaultChecklist=DefaultCheckList::where('idDefaultChecklist',null)->where('name','LIKE','%'.$nameDefaultChecklist.'%');
        return $defaultChecklist->paginate(5);
    }
}
