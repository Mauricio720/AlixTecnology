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
        $checklistModel->id_default_checklist=$checklist->idDefaultChecklistReference;
        $checklistModel->id_checklist=$idChecklist;
        $checklistModel->points=$checklist->points;
        $checklistModel->pointsObtained=$checklist->pointsObtained;
        $checklistModel->observation=$checklist->oficialObservation;
        $checklistModel->id_client=$this->idClient;
        $checklistModel->id_user=Auth::user()->id;
        
        if($checklist->id_type_checklist===2){
            $checklistModel->value="";
            $checklistModel->file_name=$checklist->value;
        }else{
            $checklistModel->value=$checklist->value;
        }

        if($checklist->id_type_checklist==6){
            $checklistModel->value=date('d/m/Y',strtotime($checklist->value));
        }else{
            $checklistModel->value=$checklist->value;
        }

        if($checklistModel->typechecklist=="8"){
            $checklistModel->big_smaller=$checklist->biggerSmaller;
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
            $checklist=Checklist::where('file_name','LIKE','%'.$file.'%')->first();
            if($checklist==null){
                Storage::delete('public/checklists_files/'.$file);
            }
        }
    }

    public function deleteChecklist($checklist){
        $checklistModel=CheckList::where('id',$checklist->id)->first();
        $options=ChecklistOption::where('id_checklist',$checklistModel->id)->get();

        if(count($options) > 0){
            $this->deleteOptions($options);
        }

        $subchecklists=CheckList::where('id_checklist',$checklistModel->id)->get();
        if(count($subchecklists) > 0){
            foreach ($subchecklists as $key => $subchecklist) {
                $this->deleteChecklist($subchecklist);
            }
        }

        $checklistModel->delete();
    }

    private function deleteOptions($options){
        foreach ($options as $key => $option) {
            $option->delete();
        }
    }

    private function addOptions($options,$idChecklist){
        foreach ($options as $key => $option) {
            $checklistOption=new ChecklistOption();
            $checklistOption->id_checklist=$idChecklist;
            $checklistOption->id_default_checklist=$idChecklist;
            $checklistOption->id_default_checklist_option=$option->idDefaultOption;
            $checklistOption->points=$option->points;
            $checklistOption->pointsObtained=$option->pointsObtained;
            $checklistOption->selected=$option->selected;
            $checklistOption->save();
        }
    }

    public function getChecklistById($id){
        $checklist=Checklist::where('id',$id)->first();
        if($checklist!==null){
            return $this->organizationChecklist($checklist,[],false);
        }else{
            return [];
        }
    }

    private function organizationChecklist($checklist,$arrayOrganization){
        $arrayOrganization=$arrayOrganization;
        $defaultChecklist=DefaultCheckList::where('id',$checklist->id_default_checklist)->first();

        $newArray['id']=$checklist->id;
        $newArray['name']=$defaultChecklist->name;
        $newArray['idDefaultChecklist']=$defaultChecklist->id;
        $newArray['idDefaultChecklistReference']=$defaultChecklist->id;
        $newArray['id_type_checklist']=$defaultChecklist->id_type_checklist;
        $newArray['percentage']=$defaultChecklist->percentage;
        $newArray['points']=$checklist->points;
        $newArray['pointsObtained']=$checklist->pointsObtained;
        
        $filesNames=$checklist->file_name !=''?explode(',',$checklist->file_name):[];
        
        $newArray['file_name']=$filesNames;
        $newArray['value']=$checklist->value;
        $newArray['observation']=$checklist->observation;
        $newArray['created_at']=date('d/m/Y - H:i:s',strtotime($checklist->created_at));
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
            $newOption['idDefaultOption']=$option->id;
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