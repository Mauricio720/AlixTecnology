var clientId="";
var defaultChecklistArray=[];
var typeChecklistArray=['Agrupamento','Texto','Upload','Multiplas Escolhas'
    ,'Dupla Escolha','Numerica','Data'];

[...ALL_ELEMENTS('.defaultCheckRadio')].forEach((element)=>{
    element.addEventListener('change',(e)=>{
        let id=e.currentTarget.value;
        requestDefaultChecklist(id);
    })
});

async function requestDefaultChecklist(id) {
    const r= await fetch(BASE_URL+"/get_default_checklist_request/"+id);
    const json=await r.json();
    fillChecklistInfo(json);
}

function fillChecklistInfo(defaultChecklistArrayRequest) {
    defaultChecklistArray=defaultChecklistArrayRequest;
    defaultChecklistArray.pointsTotalObtained=0;

    let cardChecklist=ONE_ELEMENT('#cardContentChecklist');
    cardChecklist.querySelector('#contentChecklist').innerHTML="";
    
    cardChecklist.querySelector('.defaultChecklist__name').innerHTML=`Nome Checklist: ${defaultChecklistArray.name}`;
    cardChecklist.querySelector('.defaultChecklist__points').innerHTML=`Pontuação Total: ${defaultChecklistArray.points}`;
    cardChecklist.querySelector('.defaultChecklist__possiblePoints').innerHTML=`Pontuação Obtida: ${defaultChecklistArray.pointsTotalObtained}`;
    cardChecklist.querySelector('.defaultChecklist__observation').innerHTML=`Observação : 
        ${defaultChecklistArray.observation!==""?defaultChecklistArray.observation:'Não Informado'}`;

    fillChecklistsLayout(defaultChecklistArray.subchecklist);
    eventsChecklists();
}

function fillChecklistsLayout(subchecklists,checklistElement=null) {
    subchecklists.forEach((item)=>{
        item.value="";
        item.pointsObtained=0;

        if(checklistElement===null){
            ONE_ELEMENT('#contentChecklist').append(returnElementChecklist(item));
        }else{
            checklistElement.querySelector('.checklist__container').append(returnElementChecklist(item));
        }
        
        if(item.subchecklist.length){
            let checklistElement=ONE_ELEMENT(`#checklist${item.id}`);
            fillChecklistsLayout(item.subchecklist,checklistElement);
        }
    });
}

function returnElementChecklist(subchecklist) {
    let typeChecklist=subchecklist.id_type_checklist;
    let element="";

    if(typeChecklist !== 3 && typeChecklist !== 4){
        element=elementInputsChecklist(subchecklist,typeChecklist);
    }else{
        element=elementMultipleChoiceChecklist(subchecklist,typeChecklist) ;
    }

    return element;
}

var checklistText=ONE_ELEMENT('.checklist');
var checklistMultipleChoice=ONE_ELEMENT('.checklistMultiple');
var checklistOption=ONE_ELEMENT('.checklistOption');

function elementInputsChecklist(subchecklist,typeChecklist) {
    let checklistClone=checklistText.cloneNode(true);
    
    getOrShowInputByType(checklistClone,typeChecklist);
    fillLayoutChecklist(checklistClone,subchecklist) 

    return checklistClone;
}


function elementMultipleChoiceChecklist(subchecklist) {
    let checklistClone=checklistMultipleChoice.cloneNode(true);
    
    fillLayoutChecklist(checklistClone,subchecklist) 
    filllayoutOptions(subchecklist,checklistClone);
    
    return checklistClone;
}

function fillLayoutChecklist(checklistClone,subchecklist) {
    checklistClone.style.display='flex';
    checklistClone.setAttribute('idchecklist',subchecklist.id);
    checklistClone.setAttribute('id',`checklist${subchecklist.id}`);
    
    if(subchecklist.id_type_checklist===3 || subchecklist.id_type_checklist===4){
        checklistClone.querySelector('.checklistTitleSlot').innerHTML=subchecklist.name;
    }else{
        checklistClone.querySelector('.checklist__title').innerHTML=subchecklist.name;
    }
    
    checklistClone.querySelector('.checklistTypechecklist').innerHTML=`Tipo: ${typeChecklistArray[subchecklist.id_type_checklist]}`;
    checklistClone.querySelector('.checklistPossiblePoints').innerHTML=`Pontos: ${subchecklist.points}`;
    checklistClone.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${subchecklist.pointsObtained}`;
    
    if(subchecklist.observation!==""){
        checklistClone.querySelector('.checklistObservation').innerHTML=subchecklist.observation;
    }else{
        checklistClone.querySelector('.checklistObservation').style.display='none';
    }
}

function filllayoutOptions(subchecklist,checklistClone) {
    let options=subchecklist.options;

    options.forEach((option)=>{
        let checklistOptionClone=checklistOption.cloneNode(true);
        
        if(subchecklist.id_type_checklist===3){
            checklistOptionClone.querySelector('.checklistOptionCheck').style.display='flex';
            checklistOptionClone.querySelector('.checklistOptionCheck').setAttribute('name',`option${subchecklist.id}`);
        }else{
            checklistOptionClone.querySelector('.checklistOptionRadio').style.display='flex';
            checklistOptionClone.querySelector('.checklistOptionRadio').setAttribute('name',`option${subchecklist.id}`);
        }
        
        checklistOptionClone.style.display='flex';
        checklistOptionClone.setAttribute('idoption',option.id);
        
        checklistOptionClone.querySelector('.optionName').innerHTML=option.name;
        checklistOptionClone.querySelector('.checklistPoints').innerHTML=`Pontos: ${option.points}`;
        
        if(subchecklist.observation!==""){
            checklistOptionClone.querySelector('.checklistObservation').innerHTML=option.observation;
        }else{
            checklistOptionClone.querySelector('.checklistObservation').style.display='none';
        }
        checklistClone.querySelector('.checklist__options').append(checklistOptionClone);
    })
}

function getOrShowInputByType(element,typeChecklist,show=true) {
    let input="";
    
    if(typeChecklist===1){
        input=element.querySelector('.inputText');
    
    }else if(typeChecklist===2){
        input=element.querySelector('.inputFile');
    
    }else if(typeChecklist===5){
        input=element.querySelector('.inputNumber');
    
    }else if(typeChecklist===6){
        input=element.querySelector('.inputDate');
    }

    if(typeChecklist!==0){
        if(show){
            input.style.display='flex';
        }else{
            return input;
        }
    }
}


function eventsChecklists() {
   [...ALL_ELEMENTS('#contentChecklist .checklist')].forEach((element)=>{
        let id=parseInt(element.getAttribute('idchecklist'));
        let checklist=filterChecklist(defaultChecklistArray.subchecklist,id,{});
        let typeChecklist=checklist.id_type_checklist;
        if(typeChecklist!==0 && typeChecklist!==3 && typeChecklist!==4){
            eventsChecklistsTypeInputs(element,checklist);
        }else{
            if(typeChecklist!==0){

            }
            eventsChecklistsMultipleOptions(element,checklist); 
        }
    })
}

function eventsChecklistsTypeInputs(element,checklist) {
    let typeChecklist=checklist.id_type_checklist;
    let inputType=getOrShowInputByType(element,typeChecklist,false);

    inputType.addEventListener('keyup',(e)=>{
        let possiblePoints=checklist.points;
        let text=e.currentTarget.value;
        let increment=true;
        
        checklist.value=text;

        if(text!==""){
            checklist.pointsObtained=possiblePoints;
        }else{
            increment=false;
            checklist.pointsObtained=0;
        }

        element.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${checklist.pointsObtained}`;
        updatePointsFatherChecklist(checklist,possiblePoints,increment);
    });
}

function eventsChecklistsMultipleOptions(element,checklist) {
    let options=element.querySelectorAll('.checklistOption');
    
    [...options].forEach((option)=>{
        let idOption=parseInt(option.getAttribute('idoption'));
        
        option.querySelector('input').addEventListener('change',(e)=>{
            let index=checklist.options.findIndex((option)=>{
                if(option.id===idOption){
                    return true;
                }
            });
            let option=checklist.options[index];
            let points=option.points;
            
            if(e.currentTarget.checked){
                updatePointsFatherChecklist(checklist,points);
                element.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${points}`;
            }else{
                updatePointsFatherChecklist(checklist,points,false);
            }         
        });
    })
   
}

function updatePointsFatherChecklist(checklist,points,increment=true) {
    let id=checklist.idDefaultChecklist;
    
    if(id !== null){
        let checklistFather=filterChecklist(defaultChecklistArray.subchecklist,id,{});
        if(checklistFather===null){
            let total=updatePointsChecklistMaster(defaultChecklistArray.subchecklist);
            updateLayoutChecklistMaster(total);
        }else{
            if(checklistFather.pointsObtained===0){
                checklistFather.pointsObtained+=points;
            }
            if(increment===false){
                if(checklistFather.pointsObtained > 0){
                    checklistFather.pointsObtained-=points;
                }
            }

            updateLayoutChecklist(checklistFather);
            if(checklistFather.idDefaultChecklist !== null){
                updatePointsFatherChecklist(checklistFather,checklistFather.pointsObtained); 
            }
        }
    }

    
}

function updatePointsChecklistMaster(subchecklist,points=0) {
    let total=points;
    subchecklist.forEach((subchecklist)=>{
        if(subchecklist.id_type_checklist===0){
            total+=subchecklist.pointsObtained;
            if(subchecklist.subchecklist.length>0){
                total=updatePointsChecklistMaster(subchecklist.subchecklist,total); 
            }
        }
    });

    return total;
}

function updateLayoutChecklistMaster(total){
    defaultChecklistArray.pointsTotalObtained=total;
    let cardChecklist=ONE_ELEMENT('#cardContentChecklist');
    cardChecklist.querySelector('.defaultChecklist__possiblePoints').innerHTML=`Pontuação Obtida: ${defaultChecklistArray.pointsTotalObtained}`;
}

function updateLayoutChecklist(checklist) {
    let checklistElement=ONE_ELEMENT(`#checklist${checklist.id}`);
    checklistElement.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${checklist.pointsObtained}`;
}

function filterChecklist(subchecklists,id,itemObject) {
    let item=itemObject;

    if(id!==defaultChecklistArray.id){
        subchecklists.forEach((itemObject)=>{
            if(itemObject.id===id){
                item=itemObject;
            }else{
                if(itemObject.subchecklist != []){
                    item=filterChecklist(itemObject.subchecklist,id,item);
                }
            }
        })
    }else{
        item=null;
    }
    
    return item;
}
