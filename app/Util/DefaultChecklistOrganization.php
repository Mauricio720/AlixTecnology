<?php

namespace App\Util;

use App\Models\DefaultCheckList;
use App\Models\DefaultChecklistOption;

class DefaultCheckListOrganization {

    public function addDefaultChecklist($defaultChecklist,$idDefaultChecklist=null,$json=null
        ,$lastIdIncrement=null,$lastIdIncrementOption=null){
        
        $defaultChecklistModel=new DefaultCheckList();
        $defaultChecklistModel->idDefaultChecklist=$idDefaultChecklist;
        $defaultChecklistModel->name=$defaultChecklist->name;
        $defaultChecklistModel->id_type_checklist=intVal($defaultChecklist->typechecklist);
        $defaultChecklistModel->percentage=$defaultChecklist->percentage;
        $defaultChecklistModel->points=$defaultChecklist->points;
        $defaultChecklistModel->observation=$defaultChecklist->observation;
        $defaultChecklistModel->duplicate=$defaultChecklist->duplicate;
        
        if($defaultChecklist->typechecklist=="3"){
            $defaultChecklistModel->only_one_choose=$defaultChecklist->onlyOneChoose;
            $defaultChecklistModel->only_one_choose_points=$defaultChecklist->onlyOneChoosePoints;
        }

        if($idDefaultChecklist==null){
            $defaultChecklistModel->json=$json;
            $defaultChecklistModel->last_id_increment=$lastIdIncrement;
            $defaultChecklistModel->last_id_increment_option=$lastIdIncrementOption;
        }
        
        $defaultChecklistModel->save();

        if(count($defaultChecklist->options) > 0){
            $this->addOptions($defaultChecklist->options,$defaultChecklistModel->id);
        }

        if(count($defaultChecklist->subchecklists) > 0){
            foreach ($defaultChecklist->subchecklists as $key => $subchecklist) {
                $this->addDefaultChecklist($subchecklist,$defaultChecklistModel->id);
            }
        }
    }

    private function addOptions($options,$idDefaultChecklist){
        foreach ($options as $key => $option) {
            $defaultChecklistOption=new DefaultChecklistOption();
            $defaultChecklistOption->idDefaultChecklist=$idDefaultChecklist;
            $defaultChecklistOption->name=$option->nameOption;
            $defaultChecklistOption->points=$option->pointsValue;
            $defaultChecklistOption->percentage=$option->percentage;
            $defaultChecklistOption->selected=$option->selected;
            $defaultChecklistOption->save();
        }
    }

    public function deleteDefaultChecklist($defaultChecklist){
        $defaultChecklistModel=DefaultCheckList::where('id',$defaultChecklist->id)->first();
        $options=DefaultChecklistOption::where('idDefaultChecklist',$defaultChecklistModel->id)->get();

        if(count($options) > 0){
            $this->deleteOptions($options);
        }

        $defaultSubchecklist=DefaultCheckList::where('idDefaultChecklist',$defaultChecklistModel->id)->get();
        if(count($defaultSubchecklist) > 0){
            foreach ($defaultSubchecklist as $key => $subchecklist) {
                $this->deleteDefaultChecklist($subchecklist);
            }
        }

        $defaultChecklistModel->delete();
    }

    private function deleteOptions($options){
        foreach ($options as $key => $option) {
            $option->delete();
        }
    }


    public function getDefaultChecklistById($id){
        $defaultChecklist=DefaultCheckList::where('id',$id)->first();
        return $this->organizationDefaultChecklist($defaultChecklist,[]);
    }

    private function organizationDefaultChecklist($defaultChecklist,$arrayOrganization){
        $arrayOrganization=$arrayOrganization;

        $newArray['id']=$defaultChecklist->id;
        $newArray['name']=$defaultChecklist->name;
        $newArray['idDefaultChecklist']=$defaultChecklist->idDefaultChecklist;
        $newArray['idDefaultChecklistReference']=$defaultChecklist->id;
        $newArray['id_type_checklist']=$defaultChecklist->id_type_checklist;
        $newArray['duplicate']=$defaultChecklist->duplicate;
        $newArray['percentage']=$defaultChecklist->percentage;
        $newArray['points']=$defaultChecklist->points;
        $newArray['pointsObtained']=0;
        $newArray['value']="";
        $newArray['oficialObservation']="";
        $newArray['groupingDoubleChoice']=false;
        $newArray['duplicateSubchecklist']=false;
        $newArray['files']=[];
        $newArray['observation']=$defaultChecklist->observation;
        $newArray['only_one_choose']=$defaultChecklist->only_one_choose;
        $newArray['only_one_choose_points']=$defaultChecklist->only_one_choose_points;
        $newArray['last_id_increment']=$defaultChecklist->last_id_increment;
        $newArray['created_at']=date('d/m/Y',strtotime($defaultChecklist->created_at));
        $newArray['options']=$this->getOptions($defaultChecklist->id);
        
        $arrayOrganization=$newArray;

       if($this->verifySubchecklist($defaultChecklist->id)){
            $allDefaultSubchecklist=DefaultCheckList::where('idDefaultChecklist',$defaultChecklist->id)->get();
            foreach ($allDefaultSubchecklist as $key => $defaultSubchecklist) {
                $arrayOrganization['subchecklist'][]=$this->organizationDefaultChecklist($defaultSubchecklist,$arrayOrganization,true);
            }
        }else{
            $arrayOrganization['subchecklist']=[];
        }

        
        return $arrayOrganization;
    }
    
    private function verifySubchecklist($idDefaultChecklist){
        $numberSubchecklists=DefaultCheckList::where('idDefaultChecklist',$idDefaultChecklist)->count();
        if($numberSubchecklists > 0){
            return true;
        }else{
            return false;
        }
    }

    private function getOptions($idDefaultChecklist){
        $arrayOptions=[];
        $defaultChecklistOptions=DefaultChecklistOption::where('idDefaultChecklist',$idDefaultChecklist)->get();
        
        foreach ($defaultChecklistOptions as $key => $option) {
            $newOption=[];
            $newOption['id']=$option->id;
            $newOption['idDefaultOption']=$option->id;
            $newOption['name']=$option->name;
            $newOption['points']=$option->points;
            $newOption['pointsObtained']=0;
            $newOption['percentage']=$option->percentage;
            $newOption['selected']=false;
            $newOption['created_at']=date('d/m/Y',strtotime($option->created_at));

            $arrayOptions[]=$newOption;
        }

        return $arrayOptions;
    }


}