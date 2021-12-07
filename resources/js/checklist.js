var clientId="";
var defaultChecklistArray=[];
var typeChecklistArray=['Agrupamento','Texto','Upload','Multiplas Escolhas'
    ,'Dupla Escolha','Numerica','Data'];

[...ALL_ELEMENTS('.defaultCheckRadio')].forEach((element)=>{
    element.addEventListener('change',(e)=>{
        let id=e.currentTarget.value;
        ONE_ELEMENT('#cardContentChecklist').style.display='none';
        LOADING_ELEMENT.style.display='flex';
        ONE_ELEMENT('#card-loading').append(LOADING_ELEMENT);
        ONE_ELEMENT('#card-loading').style.display='flex';
        requestDefaultChecklist(id);
    })
});

[...ALL_ELEMENTS('.clientRadio')].forEach((element)=>{
    element.addEventListener('change',(e)=>{
        clientId=e.currentTarget.value;
        ONE_ELEMENT('#idClient').value=clientId;
    });
});

async function requestDefaultChecklist(id) {
    const r= await fetch(BASE_URL+"/get_default_checklist_request/"+id);
    const json=await r.json();
    
    ONE_ELEMENT('#card-loading').style.display='none';
    ONE_ELEMENT('#cardContentChecklist').style.display='flex';
    
    fillChecklistInfo(json);
}

function fillChecklistInfo(defaultChecklistArrayRequest) {
    defaultChecklistArray=defaultChecklistArrayRequest;
    defaultChecklistArray.pointsObtained=0;
    defaultChecklistArray.value="";
    defaultChecklistArray.oficialObservation="";

    let cardChecklist=ONE_ELEMENT('#cardContentChecklist');
    cardChecklist.querySelector('#contentChecklist').innerHTML="";
    
    cardChecklist.querySelector('.defaultChecklist__name').innerHTML=`Nome Checklist: ${defaultChecklistArray.name}`;
    cardChecklist.querySelector('.defaultChecklist__points').innerHTML=`Pontuação Total: ${defaultChecklistArray.points.toFixed(2)}`;
    cardChecklist.querySelector('.defaultChecklist__possiblePoints').innerHTML=`Pontuação Obtida: ${defaultChecklistArray.pointsObtained.toFixed(2)}`;
    cardChecklist.querySelector('.defaultChecklist__observation').innerHTML=`Observação : 
        ${defaultChecklistArray.observation!==""?defaultChecklistArray.observation:'Não Informado'}`;

    fillChecklistsLayout(defaultChecklistArray.subchecklist);
    eventsChecklists();
    
    updateChecklistPoint();
}

function updateChecklistPoint() {
    ONE_ELEMENT('.checklists__point').style.display='flex';
    ONE_ELEMENT('.checklist__pointTotal').innerHTML=defaultChecklistArray.points.toFixed(2);
    ONE_ELEMENT('.checklist__pointObtained').innerHTML=defaultChecklistArray.pointsObtained.toFixed(2);
}

function fillChecklistsLayout(subchecklists,checklistElement=null) {
    subchecklists.forEach((item)=>{
        item.value="";
        item.pointsObtained=0;
        item.oficialObservation="";
        
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
    
    if(subchecklist.id_type_checklist===0){
        checklistClone.querySelectorAll('.checklist__slot')[0].style.display='none';
    }

    if(subchecklist.id_type_checklist===3 || subchecklist.id_type_checklist===4){
        checklistClone.querySelector('.checklistTitleSlot').innerHTML=subchecklist.name;
        checklistClone.querySelector('.checklistTitleSlot').setAttribute('title',subchecklist.name);
    }else{
        checklistClone.querySelector('.checklist__title').innerHTML=subchecklist.name;
        checklistClone.querySelector('.checklist__title').setAttribute('title',subchecklist.name);
    }
    
    let only_one_choose="";
    if(subchecklist.only_one_choose){
        only_one_choose="(Pontuação única)*";
        checklistClone.querySelector('.checklistTypechecklist').style="flex:2;";
    }

    checklistClone.querySelector('.checklistTypechecklist').innerHTML=`${typeChecklistArray[subchecklist.id_type_checklist]} ${only_one_choose}`;
    checklistClone.querySelector('.checklistTypechecklist').setAttribute('title',`${typeChecklistArray[subchecklist.id_type_checklist]}`);
    checklistClone.querySelector('.checklistPossiblePoints').innerHTML=`Pontos: ${subchecklist.points.toFixed(2)}`;
    checklistClone.querySelector('.checklistPossiblePoints').setAttribute('title',subchecklist.points.toFixed(2));
    checklistClone.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${subchecklist.pointsObtained.toFixed(2)}`;
    checklistClone.querySelector('.checklistPoints').setAttribute('title',subchecklist.pointsObtained.toFixed(2));

    if(subchecklist.observation!==""){
        if(subchecklist.id_type_checklist!==3 && subchecklist.id_type_checklist!==4){
            checklistClone.querySelector('.observationIcon').style.display='block';
            checklistClone.querySelector('.observationIcon').setAttribute('title',subchecklist.observation);
        }else{
            checklistClone.querySelector('.observationIconMultiple').style.display='block';
            checklistClone.querySelector('.observationIconMultiple').setAttribute('title',subchecklist.observation);
        }
    }
}

function filllayoutOptions(subchecklist,checklistClone) {
    let options=subchecklist.options;

    options.forEach((option)=>{
        let checklistOptionClone=checklistOption.cloneNode(true);
        option.pointsObtained=0;

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
        checklistOptionClone.querySelector('.checklistPoints').innerHTML=`Pontos: ${option.points.toFixed(2)}`;
        
        
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
                let multiple=false;
                if(typeChecklist===3){
                    multiple=true;
                }
                eventsChecklistsMultipleOptions(element,checklist,multiple); 
            }
        }

        eventsObservationInput(element,checklist); 
    })
}

function eventsChecklistsTypeInputs(element,checklist) {
    let typeChecklist=checklist.id_type_checklist;
    let inputType=getOrShowInputByType(element,typeChecklist,false);

    if(typeChecklist===2){
        inputType.addEventListener('change',(e)=>{
            let possiblePoints=checklist.points;
            let imageFile=e.currentTarget.files[0];
            element.querySelector('.alert').classList.add('d-none');
            
            if(imageFile.size < 40000000){
                uploadFile(imageFile,checklist);
            }else{
                element.querySelector('.alert').classList.remove('d-none');
                element.querySelector('.alert').innerHTML="O arquivo tem que ser menor que 40mb";
            }
            checklist.pointsObtained=possiblePoints;
           
            element.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${checklist.pointsObtained.toFixed(2)}`;
            if(checklist.value===""){
                updatePointsFatherChecklist(checklist,possiblePoints);
            }
        });
    }else{
        inputType.addEventListener('input',(e)=>{
            let possiblePoints=checklist.points;
            let text=e.currentTarget.value;
            let increment=true;
            
            if(text!==""){
                checklist.pointsObtained=possiblePoints;
            }else{
                increment=false;
                checklist.pointsObtained=0;
            }

            element.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${checklist.pointsObtained.toFixed(2)}`;
            if(checklist.value===""){
                updatePointsFatherChecklist(checklist,possiblePoints,increment);
            }

            if(increment===false){
                updatePointsFatherChecklist(checklist,possiblePoints,increment);
            }
            checklist.value=text;
        });
    }
}

function eventsObservationInput(element,checklist) {
    element.querySelector('.inputObservation').addEventListener('keyup',(e)=>{
        let text=e.currentTarget.value;
        checklist.oficialObservation=text;
    })
}

async function uploadFile(file,checklist){
    const formData=new FormData();
    formData.append('checklistFile',file);
   
    const res=await fetch(BASE_URL+"/upload_file/",{
        headers: {
           "X-CSRF-Token": csrfToken
        },
        method:'POST',
        body:formData        
    });
    
    const json=await res.json();
    checklist.value=json.fileName;
}

function eventsChecklistsMultipleOptions(element,checklist,multiple=true) {
    let options=element.querySelectorAll('.checklistOption');
    
    [...options].forEach((option)=>{
        let idOption=parseInt(option.getAttribute('idoption'));
        let optionInput= multiple===false?option.querySelector('input[type=radio]'):option.querySelector('input[type=checkbox]');   
        
        optionInput.addEventListener('change',(e)=>{
            let index=checklist.options.findIndex((option)=>{
                if(option.id===idOption){
                    return true;
                }
            });

            let option=checklist.options[index];
            let points=option.points;
            let pointsObtained=checklist.pointsObtained;
            
            if(e.currentTarget.checked){
                checklist.pointsObtained=pointsObtained+points;
                option.selected=true;
                option.pointsObtained=points;
                let increment=true;
                
                if(points===0){
                    increment=false;
                    points=checklist.points;
                }

                if(checklist.only_one_choose){
                    checklist.pointsObtained=points;
                }
                
                if(multiple===false){
                    checklist.pointsObtained=points;
                    if(increment===false){
                        checklist.pointsObtained=0;
                    }
                }

                updatePointsFatherChecklist(checklist,points,increment);
                element.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${checklist.pointsObtained.toFixed(2)}`;

            }else{
                checklist.pointsObtained=pointsObtained-points;
                option.selected=false;
                if(multiple===false){
                    checklist.pointsObtained=points
                }
                
                if(checklist.only_one_choose){
                    let options=0;
                    checklist.options.forEach((option)=>{
                        if(option.selected){
                            options++;
                        }
                    })

                    if(options===0){
                        checklist.pointsObtained=0;
                        updatePointsFatherChecklist(checklist,points,false);
                        element.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${checklist.pointsObtained.toFixed(2)}`;
                    }
                }else{
                    option.pointsObtained=0;
                    updatePointsFatherChecklist(checklist,points,false);
                    element.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${checklist.pointsObtained.toFixed(2)}`;
                }
            }
        });
    })
}

function updatePointsFatherChecklist(checklist,points,increment=true) {
    let id=checklist.idDefaultChecklist;

    if(id===defaultChecklistArray.id){
        let total=updatePointsChecklistMaster(defaultChecklistArray.subchecklist,0);
        updateLayoutChecklistMaster(total);
    }else{
        let checklistFather=filterChecklist(defaultChecklistArray.subchecklist,id,{});
        
        if(checklistFather!==null){
            if(increment){
                checklistFather.pointsObtained+=points;
            }

            if(increment===false){
                if(checklistFather.pointsObtained > 0){
                    checklistFather.pointsObtained-=points;
                }
            }

            updateLayoutChecklist(checklistFather);
            if(checklistFather.idDefaultChecklist !== null){
                updatePointsFatherChecklist(checklistFather,points,increment); 
            }
        }

        let total=updatePointsChecklistMaster(defaultChecklistArray.subchecklist,0);
        updateLayoutChecklistMaster(total);
    }
}

function updatePointsChecklistMaster(subchecklist,points=0) {
    let total=points;
    subchecklist.forEach((subchecklistItem)=>{
        if(subchecklistItem.idDefaultChecklist===defaultChecklistArray.id){
            
            total+=subchecklistItem.pointsObtained;
            if(subchecklistItem.subchecklist.length>0){
                total=updatePointsChecklistMaster(subchecklistItem.subchecklist,total); 
            }
        }
    });
    
    return total;
}

function updateLayoutChecklistMaster(total){
    defaultChecklistArray.pointsObtained=total;
    let cardChecklist=ONE_ELEMENT('#cardContentChecklist');
    cardChecklist.querySelector('.defaultChecklist__possiblePoints').innerHTML=`Pontuação Obtida: ${defaultChecklistArray.pointsObtained.toFixed(2)}`;
    updateChecklistPoint(); 
}

function updateLayoutChecklist(checklist) {
    let checklistElement=ONE_ELEMENT(`#checklist${checklist.id}`);
    checklistElement.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${checklist.pointsObtained.toFixed(2)}`;
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

ONE_ELEMENT('#btnSave').addEventListener('click',()=>{
    if(verifyEmptyClient() || verifyEmptyClient()){
        window.scrollTo(0,0);
    }else{
        ONE_ELEMENT('#checklistArray').value=JSON.stringify(defaultChecklistArray);
        ONE_ELEMENT('#formChecklistAdd').submit();
    }
});

function verifyEmptyClient() {
    if(clientId===""){
        ONE_ELEMENT('.alert-header').classList.remove('d-none');
        ONE_ELEMENT('.alert-header').querySelector('.alert').innerHTML="Selecione um cliente";
        return true;
    }else{
        return false;
    }
}

function verifyEmptyDefaultChecklist() {
    if(defaultChecklistArray.length===0){
        ONE_ELEMENT('.alert-header').classlist.remove('d-none');
        ONE_ELEMENT('.alert-header').querySelector('.alert').innerHTML="Selecione uma checklist padrão";
        return true;
    }else{
        return false;
    }
}
