<?php

namespace App\Util;

use App\Models\Checklist;
use App\Models\ChecklistOption;
use App\Models\DefaultCheckList;
use App\Models\DefaultChecklistOption;
use Illuminate\Support\Facades\Auth;

class CheckListOrganization {

    private $idClient=0;

    public function __construct($idClient){
        $this->idClient=$idClient;
    }

    public function addChecklist($checklist,$idChecklist=null){
        $checklistModel=new Checklist();
        $checklistModel->id_default_checklist=$checklist->id;
        $checklistModel->id_checklist=$idChecklist;
        $checklistModel->points=$checklist->points;
        $checklistModel->pointsObtained=$checklist->pointsObtained;
        $checklistModel->observation=$checklist->observation;
        $checklistModel->id_client=$this->idClient;
        $checklistModel->id_user=Auth::user()->id;
        
        if($checklist->id_type_checklist===2){
            $checklistModel->value="";
            //uploadArquivo
        }else{
            $checklistModel->value=$checklist->value;
        }
        
        $checklistModel->save();
        
        if(count($checklist->options) > 0){
            $this->addOptions($checklist->options,$checklistModel->id);
        }
        
        if(count($checklist->subchecklist) > 0){
            foreach ($checklist->subchecklist as $key => $subchecklist) {
                $this->addChecklist($subchecklist,$checklistModel->id);
            }
        }
    }

    private function addOptions($options,$idChecklist){
        foreach ($options as $key => $option) {
            $checklistOption=new ChecklistOption();
            $checklistOption->id_checklist=$idChecklist;
            $checklistOption->id_default_checklist_option=$option->id;
            $checklistOption->points=$option->points;
            $checklistOption->points=$option->pointsObtained;
            $checklistOption->selected=$option->selected;
            $checklistOption->save();
        }
    }

    public function getDefaultChecklistById($id){
        $defaultChecklist=Checklist::where('id',$id)->first();
        return $this->organizationDefaultChecklist($defaultChecklist,[],false);
    }

    private function organizationDefaultChecklist($checklist,$arrayOrganization){
        $arrayOrganization=$arrayOrganization;

        $defaultChecklist=DefaultCheckList::where('id',$checklist->id_default_checklist)->first();

        $newArray['id']=$checklist->id;
        $newArray['name']=$defaultChecklist->name;
        $newArray['idDefaultChecklist']=$defaultChecklist->idDefaultChecklist;
        $newArray['id_type_checklist']=$defaultChecklist->id_type_checklist;
        $newArray['percentage']=$defaultChecklist->percentage;
        $newArray['points']=$checklist->points;
        $newArray['observation']=$defaultChecklist->observation;
        $newArray['created_at']=date('d/m/Y',strtotime($checklist->created_at));
        $newArray['options']=$this->getOptions($checklist->id);
        
        $arrayOrganization=$newArray;

       if($this->verifySubchecklist($defaultChecklist->id)){
            $allDefaultSubchecklist=Checklist::where('idDefaultChecklist',$defaultChecklist->id)->get();
            foreach ($allDefaultSubchecklist as $key => $defaultSubchecklist) {
                $arrayOrganization['subchecklist'][]=$this->organizationDefaultChecklist($defaultSubchecklist,$arrayOrganization,true);
            }
        }else{
            $arrayOrganization['subchecklist']=[];
        }

        
        return $arrayOrganization;
    }
    
    private function verifySubchecklist($idChecklist){
        $numberSubchecklists=Checklist::where('idChecklist',$idChecklist)->count();
        if($numberSubchecklists > 0){
            return true;
        }else{
            return false;
        }
    }

    private function getOptions($idChecklist){
        $arrayOptions=[];
        $checklistOptions=ChecklistOption::where('idChecklist',$idChecklist)->get();
        $defaultOptions=DefaultChecklistOption::where('idChecklist',$idChecklist)->get();
        
        foreach ($checklistOptions as $key => $option) {
            $newOption=[];
            $newOption['id']=$option->id;
            $newOption['name']=$defaultOptions->name;
            $newOption['points']=$checklistOptions->points;
            $newOption['percentage']=$option->percentage;
            $newOption['selected']=$option->selected;
            $newOption['created_at']=date('d/m/Y',strtotime($option->created_at));

            $arrayOptions[]=$newOption;
        }

        return $arrayOptions;
    }
}