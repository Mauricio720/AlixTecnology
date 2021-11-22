<?php

namespace App\Util;

use App\Models\Checklist;
use App\Models\ChecklistOption;
use App\Models\DefaultCheckList;
use App\Models\DefaultChecklistOption;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CheckListOrganization {

    private $idClient=0;

    public function __construct($idClient=null){
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
            $checklistModel->file_name=$checklist->value;
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
    
    public function deleteFilesNotUsed(){
        $files = Storage::allFiles('public/checklists_files');
        foreach ($files as $key => $file) {
            $file=str_replace('public/checklists_files/','',$file);
            $checklist=Checklist::where('file_name',$file)->first();
            if($checklist==null){
                Storage::delete('public/checklists_files/'.$file);
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

    public function getChecklistById($id){
        $checklist=Checklist::where('id',$id)->first();
        return $this->organizationChecklist($checklist,[],false);
    }

    private function organizationChecklist($checklist,$arrayOrganization){
        $arrayOrganization=$arrayOrganization;
        $defaultChecklist=DefaultCheckList::where('id',$checklist->id_default_checklist)->first();

        $newArray['id']=$checklist->id;
        $newArray['name']=$defaultChecklist->name;
        $newArray['idDefaultChecklist']=$defaultChecklist->id;
        $newArray['id_type_checklist']=$defaultChecklist->id_type_checklist;
        $newArray['percentage']=$defaultChecklist->percentage;
        $newArray['points']=$checklist->points;
        $newArray['pointsObtained']=$checklist->pointsObtained;
        $newArray['value']=$checklist->value;
        $newArray['observation']=$defaultChecklist->observation;
        $newArray['created_at']=date('d/m/Y',strtotime($checklist->created_at));
        $newArray['options']=$this->getOptions($checklist->id);
        
        $arrayOrganization=$newArray;

       if($this->verifySubchecklist($checklist->id)){
            $allSubchecklist=Checklist::where('id_checklist',$checklist->id)->get();
            foreach ($allSubchecklist as $key => $subchecklist) {
                $arrayOrganization['subchecklist'][]=$this->organizationChecklist($subchecklist,$arrayOrganization,true);
            }
        }else{
            $arrayOrganization['subchecklist']=[];
        }

        
        return $arrayOrganization;
    }
    
    private function verifySubchecklist($idChecklist){
        $numberSubchecklists=Checklist::where('id_checklist',$idChecklist)->count();
        if($numberSubchecklists > 0){
            return true;
        }else{
            return false;
        }
    }

    private function getOptions($idChecklist){
        $arrayOptions=[];
        $checklistOptions=ChecklistOption::where('id_checklist',$idChecklist)->get();
        
        
        foreach ($checklistOptions as $key => $option) {
            $defaultOptions=DefaultChecklistOption::where('id',$option->id_default_checklist_option)->first();

            $newOption=[];
            $newOption['id']=$option->id;
            $newOption['name']=$defaultOptions->name;
            $newOption['points']=$option->points;
            $newOption['pointsObtained']=$option->pointsObtained;
            $newOption['selected']=$option->selected;
            $newOption['created_at']=date('d/m/Y',strtotime($option->created_at));

            $arrayOptions[]=$newOption;
        }

        return $arrayOptions;
    }
}