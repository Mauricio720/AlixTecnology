var clientId="";
var defaultChecklistArray=[];
var typeChecklistArray=['Agrupamento','Texto','Upload','Multiplas Escolhas'
    ,'Dupla Escolha','Numerica','Data','Agrupamento (dupla escolha)'];
var idIncrement=0;
var allCloneChecklistGrouping=[];
var checklistText=ONE_ELEMENT('.checklist');
var checklistMultipleChoice=ONE_ELEMENT('.checklistMultiple');
var checklistOption=ONE_ELEMENT('.checklistOption');
var checklistJson=ONE_ELEMENT('#checklistArrayJson').value;

verifyInProgressChecklist();

function verifyInProgressChecklist(){
    if(checklistJson != ''){
        idIncrement=parseInt(ONE_ELEMENT('#lastIdIncrement').value);
        defaultChecklistArray=JSON.parse(ONE_ELEMENT('#checklistArrayJson').value);
        allCloneChecklistGrouping=JSON.parse(ONE_ELEMENT('#groupingArrayJson').value);
        clientId=ONE_ELEMENT('#idClientToJson').value;
        ONE_ELEMENT('#idClient').value=clientId;
        ONE_ELEMENT('#cardContentChecklist').style.display='flex';
        fillChecklistInfo(defaultChecklistArray);
    }
}

[...ALL_ELEMENTS('.defaultCheckRadio')].forEach((element)=>{
    element.addEventListener('change',(e)=>{
        let id=e.currentTarget.value;
        ONE_ELEMENT('#idDefaultChecklist').value=id;
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
        ONE_ELEMENT('#idClientToJson').value=clientId;
    });
});


ONE_ELEMENT('.btnScrollToBotttom').addEventListener('click',()=>{
    let scrollPosition=ONE_ELEMENT('#btnSave').getBoundingClientRect();
    window.scrollBy(scrollPosition.x,scrollPosition.y);
});

async function requestDefaultChecklist(id) {
    const r= await fetch(BASE_URL+"/get_default_checklist_request/"+id);
    const json=await r.json();
    
    ONE_ELEMENT('#card-loading').style.display='none';
    ONE_ELEMENT('#cardContentChecklist').style.display='flex';
    
    fillChecklistInfo(json);
    verifyBtnScroll();
}

function fillChecklistInfo(defaultChecklistArrayRequest) {
    defaultChecklistArray=defaultChecklistArrayRequest;
    idIncrement=filterDefaultChecklistLastId(defaultChecklistArray.subchecklist);
    
    let cardChecklist=ONE_ELEMENT('#cardContentChecklist');
    cardChecklist.querySelector('#contentChecklist').innerHTML="";
    cardChecklist.querySelector('.defaultChecklist__name').innerHTML=`Nome Checklist: ${defaultChecklistArray.name}`;
    cardChecklist.querySelector('.defaultChecklist__points').innerHTML=`Pontuação Total: ${defaultChecklistArray.points.toFixed(2)}`;
    cardChecklist.querySelector('.defaultChecklist__possiblePoints').innerHTML=`Pontuação Obtida: ${defaultChecklistArray.pointsObtained.toFixed(2)}`;
    cardChecklist.querySelector('.defaultChecklist__observation').innerHTML=`Observação : 
        ${defaultChecklistArray.observation!==""?defaultChecklistArray.observation:'Não Informado'}`;

    fillChecklistsLayout(defaultChecklistArray.subchecklist);
    fillValuesToChecklist(defaultChecklistArray.subchecklist); 
    eventsChecklists();
    updateChecklistPoint();
    
}

const LOW=1;
const MIDDLE=2;
const HIGH=3;

function updateChecklistPoint() {
    let totalPoints=defaultChecklistArray.points.toFixed(2);
    let pointsObtained=defaultChecklistArray.pointsObtained.toFixed(2);

    ONE_ELEMENT('.checklists__point').style.display='flex';
    ONE_ELEMENT('.checklist__pointTotal').innerHTML=totalPoints;
    ONE_ELEMENT('.checklist__pointObtained').innerHTML=pointsObtained;

    let totalPointsDivide=totalPoints/3;
    updateLayoutSituation(totalPointsDivide,pointsObtained)
}

function updateLayoutSituation(totalPointsDivide,pointsObtained) {
    let situation=verifySituationPointsClient(totalPointsDivide,pointsObtained);
    let pointsObtainedElement=ALL_ELEMENTS('.checklists__point-slot')[1];
    clearLayoutSituation(); 
    
    if(situation===LOW){
        pointsObtainedElement.classList.add('low');
    }else if(situation===MIDDLE){
        pointsObtainedElement.classList.add('middle');
    }else{
        pointsObtainedElement.classList.add('high');
    }
}

function verifyBtnScroll() {
    if(defaultChecklistArray !==[]){
        ONE_ELEMENT('.actionsScroll').style.display='flex';
    }else{
        ONE_ELEMENT('.actionsScroll').style.display='none';
    }
}

function clearLayoutSituation() {
    let pointsObtainedElement=ALL_ELEMENTS('.checklists__point-slot')[1];
    pointsObtainedElement.classList.remove('low');
    pointsObtainedElement.classList.remove('middle');
    pointsObtainedElement.classList.remove('high');
}

function verifySituationPointsClient(totalPointsDivide,pointsObtained){
    let middle=totalPointsDivide*2;
    let high=totalPointsDivide*3;
    
    if(pointsObtained >= 0 && pointsObtained < middle) {
        return LOW;
    }else if(pointsObtained>=middle && pointsObtained <high){
        return MIDDLE;
    }else{
        return HIGH;
    }
}

function fillChecklistsLayout(subchecklists,checklistElement=null) {
    subchecklists.forEach((item)=>{
        if(checklistElement===null){
            ONE_ELEMENT('#contentChecklist').append(returnElementChecklist(item));
        }else{
            checklistElement.querySelector('.checklist__container').append(returnElementChecklist(item));
        }

        if(item.subchecklist.length > 0){
            let checklistElement=ONE_ELEMENT(`#checklist${item.id}`);
            fillChecklistsLayout(item.subchecklist,checklistElement);
        }
    });
}

function fillValuesToChecklist(subchecklists) {
    subchecklists.forEach((subchecklist)=>{
        let checklistElement=ONE_ELEMENT(`#checklist${subchecklist.id}`);
        let input="";
        let typeChecklist=parseInt(subchecklist.id_type_checklist);
        
        if(typeChecklist !== 3 && typeChecklist !== 4){
            if(typeChecklist===1){
                input=checklistElement.querySelector('.inputText');
            
            }else if(typeChecklist===2){
                input=checklistElement.querySelector('.inputFile');            
            }else if(typeChecklist===5){
                input=checklistElement.querySelector('.inputNumber');
            
            }else if(typeChecklist===6){
                input=checklistElement.querySelector('.inputDate');
            }
        }else{
            subchecklist.options.forEach((option)=>{
                if(option.selected){
                    console.log(option);
                    checklistElement.querySelector(`.option${option.id}`).checked=true;
                }
            })
        }

        if(typeChecklist===2){
            if(subchecklist.value !==''){
                let title=checklistElement.querySelector('.checklist__title').innerHTML;
                let numberFiles=subchecklist.value.split(',').length;
                checklistElement.querySelector('.checklist__title').innerHTML=`${title}: ${numberFiles} arquivo/s selecionado/s`; 
            }
        }else{
            input.value=subchecklist.value;
        }
        
        let inputObservation=checklistElement.querySelector('.inputObservation');
        inputObservation.value=subchecklist.observation;
        
        checklistElement.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${subchecklist.pointsObtained.toFixed(2)}`;
        
        if(subchecklist.id_type_checklist===7){
            let inputRadios=checklistElement.querySelectorAll(`input[name=checkGroupingChoice${subchecklist.id}`);
            
            let indexCloneGrouping=allCloneChecklistGrouping.findIndex((item)=>{
                if(item.id===subchecklist.idReferenceClone){
                    return true;
                }
            });
            
            if(subchecklist.groupingDoubleChoice){
                inputRadios[0].checked=true;
                checklistElement.style.height='auto';
            }
            
            if(indexCloneGrouping !== -1){
                inputRadios[0].checked=true;
                if(subchecklist.duplicate){
                    checklistElement.querySelector('.checklist__header .btnAdd').classList.remove('d-none');
                }
            }
        }

        if(subchecklist.subchecklist.length > 0){
            fillValuesToChecklist(subchecklist.subchecklist);
        }
    })
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
    
    if(subchecklist.id_type_checklist===0 || subchecklist.id_type_checklist===7){
        checklistClone.querySelectorAll('.checklist__slot')[0].style.display='none';
    }

    if(subchecklist.id_type_checklist===7){
        checklistClone.querySelector('.checklist__header__actions').style.display='flex';
        let inputRadios=checklistClone.querySelectorAll('.checkGroupingChoice');
        inputRadios[0].setAttribute('name',`checkGroupingChoice`+subchecklist.id);
        inputRadios[1].setAttribute('name',`checkGroupingChoice`+subchecklist.id);

        let indexCloneGrouping=allCloneChecklistGrouping.findIndex((item)=>{
            if(item.id===subchecklist.idReferenceClone){
                return true;
            }
        });
        
        if(indexCloneGrouping !== -1){
            inputRadios[0].checked=true;
            checklistClone.querySelectorAll('.checklist__header__slot')[2].classList.remove('d-none');
            checklistClone.querySelector('.checklist__header__quantity').innerHTML=subchecklist.subchecklist.length;
            checklistClone.querySelector('.checklist__header .btnAdd').classList.remove('d-none');
            
        }else{
            inputRadios[1].checked=true;
            checklistClone.style.height='120px';
            checklistClone.querySelectorAll('.checklist__header__slot')[2].classList.add('d-none');
        }
    }

    if(subchecklist.id_type_checklist===3 || subchecklist.id_type_checklist===4){
        checklistClone.querySelector('.checklistTitleSlot').innerHTML=subchecklist.name;
        checklistClone.querySelector('.checklistTitleSlot').setAttribute('title',subchecklist.name);
    }else{
        checklistClone.querySelector('.checklist__title').innerHTML=subchecklist.name;
        checklistClone.querySelector('.checklist__title').setAttribute('title',subchecklist.name);
    }
    
    let only_one_choose='';
    if(subchecklist.only_one_choose_points || subchecklist.only_one_choose){
        only_one_choose_points="(Pontuação única)*";
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
            if(!subchecklist.only_one_choose){
                checklistOptionClone.querySelector('.checklistOptionCheck').style.display='flex';
                checklistOptionClone.querySelector('.checklistOptionCheck').setAttribute('name',`option${subchecklist.id}`);
                checklistOptionClone.querySelector('.checklistOptionRadio').classList.add(`option${option.id}`);
            }else{
                checklistOptionClone.querySelector('.checklistOptionRadio').style.display='flex';
                checklistOptionClone.querySelector('.checklistOptionRadio').setAttribute('name',`option${subchecklist.id}`)
                checklistOptionClone.querySelector('.checklistOptionRadio').classList.add(`option${option.id}`);
            }
        }else{
            checklistOptionClone.querySelector('.checklistOptionRadio').style.display='flex';
            checklistOptionClone.querySelector('.checklistOptionRadio').setAttribute('name',`option${subchecklist.id}`);
            checklistOptionClone.querySelector('.checklistOptionRadio').classList.add(`option${option.id}`);
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

    if(typeChecklist!==0 && typeChecklist!==7){
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
        
        if(typeChecklist!==0 && typeChecklist!==7 && typeChecklist!==3 && typeChecklist!==4){
            eventsChecklistsTypeInputs(element,checklist);
        }else{
            if(typeChecklist!==0 && typeChecklist!==7){
                let multiple=false;
                if(typeChecklist===3){
                    multiple=true;
                }
                eventsChecklistsMultipleOptions(element,checklist,multiple); 
            }
        }

        if(checklist.duplicate){
            eventsDoubleChoiceGroupingDuplicate(element,checklist);
            eventsDoubleAddChoiceGrouping(element,checklist);
        }else{
            eventsDoubleChoiceGrouping(element,checklist);
        }
        eventsObservationInput(element,checklist); 
    })
}


function eventsDoubleChoiceGroupingDuplicate(element,checklist) {
    let allCheckGroupingChoice=element.querySelectorAll('.checkGroupingChoice');
    [...allCheckGroupingChoice].forEach((checkGroupingChoice)=>{
        checkGroupingChoice.addEventListener('change',(e)=>{
            let checkGrouping=e.currentTarget;
            let addBtn=element.querySelector('.checklist__header .btnAdd');
           
            if(checkGrouping.value==='1'){
                addGroupingChecklist(checklist);
                addBtn.classList.remove('d-none');
            }else{
                clearGroupingChecklist(checklist);
                clearPointsChecklist(checklists);
                addBtn.classList.add('d-none');
            }
        })
    })
}

function eventsDoubleChoiceGrouping(element,checklist){
    let allCheckGroupingChoice=element.querySelectorAll('.checkGroupingChoice');
    
    [...allCheckGroupingChoice].forEach((checkGroupingChoice)=>{
        checkGroupingChoice.addEventListener('change',(e)=>{
            let checkGrouping=e.currentTarget;
            
            if(checkGrouping.value==='1'){
                element.style.height='auto';
                checklist.groupingDoubleChoice=true;
            }else{
                element.style.height='120px';
                checklist.groupingDoubleChoice=false;
                clearPointsChecklist(checklist);
                fillChecklistInfo(defaultChecklistArray);
            }
        })
    })
}

function clearPointsChecklist(checklist) {
    if(checklist.idDefaultChecklist === defaultChecklistArray.id){
        defaultChecklistArray.pointsObtained=defaultChecklistArray.pointsObtained-checklist.pointsObtained;
    }
    
    checklist.pointsObtained=0;
    
    checklist.subchecklist.forEach((checklist)=>{
        checklist.pointsObtained=0;
        checklist.value='';
        checklist.oficialObservation='';

        if(checklist.options.length > 0){
            checklist.options.forEach((option)=>{
                option.selected=false;
            })
        }
        if(checklist.subchecklist.length>0){
            clearPointsChecklist(checklists.subchecklist);
        }
    })
}

function eventsDoubleAddChoiceGrouping(element,checklist){
    let addBtn=element.querySelector('.checklist__header .btnAdd');
    if(addBtn !== null){
        addBtn.addEventListener('click',(e)=>{
            let idReferenceClone=checklist.idReferenceClone;
            let indexReferenceClone=allCloneChecklistGrouping.findIndex((item)=>{
                if(item.id===idReferenceClone){
                    return true;
                }
            })

            let newChecklistGrouping={...allCloneChecklistGrouping[indexReferenceClone]};
            idIncrement=idIncrement+1;

            newChecklistGrouping.id=idIncrement;
            newChecklistGrouping.id_type_checklist=0;
            checklist.subchecklist.push(newChecklistGrouping);

            renameAndIncrementChecklist(checklist);
            setChecklistPoint(checklist.id); 
            fillChecklistInfo(defaultChecklistArray);
        });
    }
}

function addGroupingChecklist(checklist){
    let cloneChecklistGrouping={...checklist};
    checklist.subchecklist=[];
    idIncrement=idIncrement+1;
    
    cloneChecklistGrouping.id=idIncrement;
    checklist.idReferenceClone=idIncrement;
    checklist.subchecklist.push(cloneChecklistGrouping);
    cloneChecklistGrouping.id_type_checklist=0;
    cloneChecklistGrouping.idDefaultChecklist=checklist.id;
    allCloneChecklistGrouping.push(cloneChecklistGrouping);
    
    renameAndIncrementChecklist(checklist); 
    setChecklistPoint(checklist.id); 
    fillChecklistInfo(defaultChecklistArray,true);
}

function clearGroupingChecklist(checklist){
    let checklistOriginal=checklist.subchecklist[0];
    let index=allCloneChecklistGrouping.findIndex((item)=>{
        if(item.id===checklistOriginal.id){
            return true;
        }
    })
    allCloneChecklistGrouping.splice(index,1);
    checklistOriginal.subchecklist.forEach((checklistItem)=>{
        checklist.subchecklist.push(checklistItem);
    });
    
    checklist.subchecklist.shift();

    renameAndIncrementChecklist(checklist);
    setChecklistPoint(checklist.id); 
    fillChecklistInfo(defaultChecklistArray);
}

function renameAndIncrementChecklist(checklist) {
    checklist.subchecklist.forEach((checklistItem,index)=>{
        let names=checklistItem.name.split('-');
        checklistItem.name=names[0]+' - '+(index+1);
        let subchecklists=[...checklistItem.subchecklist];
        
        checklistItem.subchecklist=[];
        subchecklists.forEach((item)=>{
            let newSubCheck={...item};
            idIncrement=idIncrement+1;
            newSubCheck.id=idIncrement;
            newSubCheck.idDefaultChecklist=checklistItem.id;
            checklistItem.subchecklist.push(newSubCheck);
        });
    });
}

function setChecklistPoint(id) {
    let points=filterChecklist(defaultChecklistArray.subchecklist,id,{}).points;
    let allDefaultChecklist=filterChecklist(defaultChecklistArray.subchecklist,id,{}).subchecklist;
    let totalNumberDefaultChecklists=allDefaultChecklist.length;
    let pointsValue=points/totalNumberDefaultChecklists;
    let percentage= (pointsValue/points)*100;
    
    allDefaultChecklist.forEach(element => {
        element.points=pointsValue;
        element.percentage=percentage;
        element.correctPercentage=true;
        
        if(element.options.length > 0){
            updatePointsOptions(element.options,element.points,element); 
        }
    });
}

function updatePointsOptions(options,points,element) {
    let typechecklist=element.id_type_checklist;
    let onlyOneChoosePoints=element.onlyOneChoosePoints;
    let onlyOneChoose=element.onlyOneChoose;

    options.forEach((option)=>{
        let numberOptions=options.length;
        let pointsValue=points/numberOptions;
        let percentage= (pointsValue/points)*100;
        
        if(typechecklist==="4"){
            if(option.selected){
                option.pointsValue=points;
            }else{
                option.pointsValue=0;
            }
        }else{
            if(onlyOneChoosePoints===false && onlyOneChoose===false){
                option.pointsValue=pointsValue;
                option.percentage=percentage;
                option.correctPercentage=true;
            }else if(onlyOneChoosePoints || onlyOneChoose){
                option.pointsValue=points;
            }
        }
    })
}

function eventsChecklistsTypeInputs(element,checklist) {
    let typeChecklist=checklist.id_type_checklist;
    let inputType=getOrShowInputByType(element,typeChecklist,false);
    
    if(typeChecklist===2){
        inputType.addEventListener('change',(e)=>{
            let possiblePoints=checklist.points;
            let imagesFiles=e.currentTarget.files;
            element.querySelector('.alert').classList.add('d-none');
            
            let sizeFiles=0;
            [...imagesFiles].forEach((file)=>{
                sizeFiles=sizeFiles+file.size;
            });

            if(sizeFiles < 40000000){
                uploadFile(imagesFiles,checklist);
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

async function uploadFile(files,checklist){
    let form=ONE_ELEMENT('#uploadFileForm');
    const formData=new FormData(form);
    [...files].forEach((file)=>{
        formData.append('checklistFile[]',file);
    })
   
    const res=await fetch(BASE_URL+"/upload_file",{
        method:'POST',
        body:formData        
    });
    
    const json=await res.json();
    let filesNames=json.filesNames;

    checklist.value=filesNames.join(',');
    checklist.files=files;
}

function eventsChecklistsMultipleOptions(element,checklist,multiple=true) {
    let options=element.querySelectorAll('.checklistOption');
    
    [...options].forEach((option)=>{
       
        let idOption=parseInt(option.getAttribute('idoption'));
        let optionInput= multiple===false || checklist.only_one_choose?option.querySelector('input[type=radio]'):option.querySelector('input[type=checkbox]');   
        
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
                let countSelectedOnlyOneChoose=0;
                
                option.selected=true;
                option.pointsObtained=points;
                
                let increment=true;

                
                checklist.options.forEach((option)=>{
                    if(option.selected){
                        countSelectedOnlyOneChoose++;
                    }
                })

                if(countSelectedOnlyOneChoose>2){
                    checklist.options.forEach((option)=>{
                        option.selected=false;
                    })

                    option.selected=true;
                }
                
                if(points===0){
                    increment=false;
                    points=checklist.points;
                }

                if(checklist.only_one_choose || checklist.only_one_choose_points){
                    checklist.pointsObtained=points;
                }
                
                if(multiple===false){
                    checklist.pointsObtained=points;
                    if(increment===false){
                        checklist.pointsObtained=0;
                        if(countSelectedOnlyOneChoose === 1){
                            points=0;
                        }
                    }
                }

                if(checklist.only_one_choose && countSelectedOnlyOneChoose>1){
                    points=0;
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

function filterDefaultChecklistLastId(defaultChecklistArray,lastId=0) {
    let finalLastId=lastId;
    
    defaultChecklistArray.forEach((itemObject)=>{
        if(itemObject.id > finalLastId){
            finalLastId=itemObject.id;
        }
        
        if(itemObject.subchecklist.length>0){
            finalLastId=filterDefaultChecklistLastId(itemObject.subchecklist,finalLastId);
        }
    });

    return finalLastId;
}

ONE_ELEMENT('#btnFinish').addEventListener('click',()=>{
    if(verifyEmptyClient() || verifyEmptyDefaultChecklist()){
        window.scrollTo(0,0);
    }else{
        ONE_ELEMENT('#checklistArray').value=JSON.stringify(defaultChecklistArray);
        ONE_ELEMENT('#formChecklistAdd').submit();
    }
});

ONE_ELEMENT('#btnSave').addEventListener('click',()=>{
    if(verifyEmptyClient() || verifyEmptyDefaultChecklist()){
        window.scrollTo(0,0);
    }else{
        ONE_ELEMENT('#idChecklist').value=defaultChecklistArray.id;
        ONE_ELEMENT('#checklistArrayJson').value=JSON.stringify(defaultChecklistArray);
        ONE_ELEMENT('#groupingArrayJson').value=JSON.stringify(allCloneChecklistGrouping);
        ONE_ELEMENT('#checklist_name').value=defaultChecklistArray.name;
        ONE_ELEMENT('#lastIdIncrement').value=idIncrement;
        ONE_ELEMENT('#formChecklistAddJson').submit();
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
