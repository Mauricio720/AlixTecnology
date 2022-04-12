var clientId="";
var defaultChecklistArray=[];
var typeChecklistArray=['Agrupamento','Texto','Upload','Multiplas Escolhas'
    ,'Dupla Escolha','Numerica','Data','Agrupamento (dupla escolha)','Maior/Igual Que','Menor/Igual Que'];
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
        verifyBtnScroll(); 
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
    
    fillChecklistMasterLayout();
    fillChecklistsLayout(defaultChecklistArray.subchecklist);
    fillValuesToChecklist(defaultChecklistArray.subchecklist); 
    eventsChecklists();
    updateChecklistPoint();
}

function fillChecklistMasterLayout(){
    let cardChecklist=ONE_ELEMENT('#cardContentChecklist');
    cardChecklist.querySelector('#contentChecklist').innerHTML="";
    cardChecklist.querySelector('.defaultChecklist__name').innerHTML=`Nome Checklist: ${defaultChecklistArray.name}`;
    cardChecklist.querySelector('.defaultChecklist__points').innerHTML=`Pontuação Total: ${defaultChecklistArray.points.toFixed(2)}`;
    cardChecklist.querySelector('.defaultChecklist__possiblePoints').innerHTML=`Pontuação Obtida: ${defaultChecklistArray.pointsObtained.toFixed(2)}`;
    cardChecklist.querySelector('.defaultChecklist__observation').innerHTML=`Observação : 
        ${defaultChecklistArray.observation!==""?defaultChecklistArray.observation:'Não Informado'}`;
}


const LOW=1;
const MIDDLE=2;
const HIGH=3;

function updateChecklistPoint() {
    let totalPoints=defaultChecklistArray.points.toFixed(2);
    let pointsObtained=defaultChecklistArray.pointsObtained.toFixed(2);
    
    checklistPointsLayout(totalPoints,pointsObtained);
    
    let totalPointsDivide=totalPoints/3;
    updateLayoutSituation(totalPointsDivide,pointsObtained)
}

function checklistPointsLayout(totalPoints,pointsObtained){
    ONE_ELEMENT('.checklists__point').style.display='flex';
    ONE_ELEMENT('.checklist__pointTotal').innerHTML=totalPoints;
    ONE_ELEMENT('.checklist__pointObtained').innerHTML=pointsObtained;
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
        appendChecklist(item,checklistElement);
        appendSubchecklist(item);
    });
}

function appendChecklist(item,checklistElement){
    if(checklistElement===null){
        ONE_ELEMENT('#contentChecklist').append(returnElementChecklist(item));
    }else{
        checklistElement.querySelector('.checklist__container').append(returnElementChecklist(item));
    }
}

function appendSubchecklist(item){
    if(item.subchecklist.length > 0){
        let checklistElement=ONE_ELEMENT(`#checklist${item.id}`);
        fillChecklistsLayout(item.subchecklist,checklistElement);
    }
}

function fillLayoutChecklist(checklistClone,subchecklist) {
    showAndIdentifyChecklistElement(checklistClone,subchecklist)
    hideSlotChecklistSlotAgroping(subchecklist,checklistClone);
    layoutChecklistAgropingDuplicate(checklistClone,subchecklist);
    showHeaderBtnsDuplicateSubchecklistLayout(checklistClone,subchecklist);
    setTitleToChecklist(subchecklist,checklistClone);
    verifyOnlyOnePointsLayout(checklistClone,subchecklist);
    setInfoToChecklist(checklistClone,subchecklist);
    setObservationChecklist(checklistClone,subchecklist);
}

function showAndIdentifyChecklistElement(checklistClone,subchecklist){
    checklistClone.style.display='flex';
    checklistClone.setAttribute('idchecklist',subchecklist.id);
    checklistClone.setAttribute('id',`checklist${subchecklist.id}`);
}

function hideSlotChecklistSlotAgroping(subchecklist,checklistClone){
    if(subchecklist.id_type_checklist===0 || subchecklist.id_type_checklist===7){
        checklistClone.querySelectorAll('.checklist__slot')[0].style.display='none';
    }
}

function setTitleToChecklist(subchecklist,checklistClone){
    if(subchecklist.id_type_checklist===3 || subchecklist.id_type_checklist===4){
        checklistClone.querySelector('.checklistTitleSlot').innerHTML=subchecklist.name;
        checklistClone.querySelector('.checklistTitleSlot').setAttribute('title',subchecklist.name);
    }else{
        checklistClone.querySelector('.checklist__title').innerHTML=subchecklist.name;
        checklistClone.querySelector('.checklist__title').setAttribute('title',subchecklist.name);
    }
}

function verifyOnlyOnePointsLayout(checklistClone,subchecklist){
    if(subchecklist.only_one_choose_points || subchecklist.only_one_choose){
        checklistClone.querySelector('.checklistTypechecklist').style="flex:2;";
    }
}

function setInfoToChecklist(checklistClone,subchecklist){
    let big_smaller_value='';
    if(subchecklist.id_type_checklist===8 || subchecklist.id_type_checklist===9){
        big_smaller_value=` ${subchecklist.big_smaller}`;
    }
    checklistClone.querySelector('.checklistTypechecklist').innerHTML=`${typeChecklistArray[subchecklist.id_type_checklist]}${big_smaller_value}`;
    checklistClone.querySelector('.checklistTypechecklist').setAttribute('title',`${typeChecklistArray[subchecklist.id_type_checklist]}`);
    checklistClone.querySelector('.checklistPossiblePoints').innerHTML=`Pontos: ${subchecklist.points.toFixed(2)}`;
    checklistClone.querySelector('.checklistPossiblePoints').setAttribute('title',subchecklist.points);
    checklistClone.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${subchecklist.pointsObtained.toFixed(2)}`;
    checklistClone.querySelector('.checklistPoints').setAttribute('title',subchecklist.pointsObtained);
}

function setObservationChecklist(checklistClone,subchecklist){
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

function showHeaderBtnsDuplicateSubchecklistLayout(checklistClone,subchecklist){
    if(subchecklist.duplicateSubchecklist){
        checklistClone.querySelector('.checklist__header--optionsContainer').style.display='none';
        checklistClone.querySelector('.checklist__header__actions').style.display='flex';
        checklistClone.querySelector('.checklist__header__actions .btnDelete').classList.remove('d-none');
    }
}

function layoutChecklistAgropingDuplicate(checklistClone,subchecklist){
    if(subchecklist.id_type_checklist===7){
        showHeaderActionsToAgroupingDuplicate(checklistClone)
        
        let inputRadios=getAndSetAtributeInputsRadiosToAgroupingDuplicate(checklistClone,subchecklist);
        
        if(verifyThereIsChecklistInAgroupingArray(subchecklist)){
            inputRadios[0].checked=true;
            showBtnsAndQuantityToAgroupingDuplicate(checklistClone,subchecklist);
        }else{
            inputRadios[1].checked=true;
            removeBtnsAndQuantityToAgroupingDuplicate(checklistClone);
        }

        if(!subchecklist.duplicate){
            if(subchecklist.pointsObtained !== 0){
                inputRadios[0].checked=true;
                itsNotDuplicateChecklistAgroupingLayout(checklistClone)
            }
        }
        
        if(subchecklist.subchecklist.length===0){
            inputRadios[1].checked=true;
            thereNotSubchecklistInAgroupingLayout(checklistClone);
        }
    }
}

function showHeaderActionsToAgroupingDuplicate(checklistClone){
    checklistClone.querySelector('.checklist__header__actions').style.display='flex';
}

function getAndSetAtributeInputsRadiosToAgroupingDuplicate(checklistClone,subchecklist){
    let inputRadios=checklistClone.querySelectorAll('.checkGroupingChoice');
    inputRadios[0].setAttribute('name',`checkGroupingChoice`+subchecklist.id);
    inputRadios[1].setAttribute('name',`checkGroupingChoice`+subchecklist.id);

    return inputRadios;
}

function showBtnsAndQuantityToAgroupingDuplicate(checklistClone,subchecklist){
    checklistClone.querySelectorAll('.checklist__header__slot')[2].classList.remove('d-none');
    checklistClone.querySelector('.checklist__header__quantity').previousElementSibling.style.display='block';
    checklistClone.querySelector('.checklist__header__quantity').innerHTML=subchecklist.subchecklist.length;
    checklistClone.querySelector('.checklist__header .btnAdd').classList.remove('d-none');
}

function removeBtnsAndQuantityToAgroupingDuplicate(checklistClone){
    checklistClone.style.height='120px';
    checklistClone.querySelectorAll('.checklist__header__slot')[2].classList.add('d-none');
}

function itsNotDuplicateChecklistAgroupingLayout(checklistClone){
    checklistClone.style.height='auto';
    checklistClone.querySelector('.checklist__header__quantity').previousElementSibling.style.display='none';
    checklistClone.querySelector('.checklist__header__quantity').style.display='none';
    checklistClone.querySelectorAll('.checklist__header__slot')[2].classList.remove('d-none');
}

function thereNotSubchecklistInAgroupingLayout(checklistClone){
    checklistClone.style.height='120px';
    checklistClone.querySelectorAll('.checklist__header__slot')[2].classList.add('d-none');
}

function fillValuesToChecklist(subchecklists) {
    subchecklists.forEach((subchecklist)=>{
        let checklistElement=ONE_ELEMENT(`#checklist${subchecklist.id}`);
        let typeChecklist=parseInt(subchecklist.id_type_checklist);
        
        fillInputOrOptionsValue(typeChecklist,checklistElement,subchecklist);
        setObservationChecklistValue(checklistElement,subchecklist);
        setUploadChecklistValues(typeChecklist,subchecklist,checklistElement);
       
        checklistElement.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${subchecklist.pointsObtained.toFixed(2)}`;
        headerLayoutInChecklistValues(subchecklist,checklistElement);

        if(subchecklist.id_type_checklist===7){
            groupingDoubleChoiceChecklistLayout(checklistElement,subchecklist);
            duplicateSubchecklistHeaderAndActions(checklistElement,subchecklist);
            layoutValuesChecklistWithoutSubchecklist(checklistElement,subchecklist)
        }

        if(subchecklist.duplicate){
            layoutHeighChecklist(checklistElement,subchecklist);
        }


        if(subchecklist.subchecklist.length > 0){
            fillValuesToChecklist(subchecklist.subchecklist);
        }
    })
}

function fillInputOrOptionsValue(typeChecklist,checklistElement,subchecklist){
    if(typeChecklist !== 3 && typeChecklist !== 2 && typeChecklist !== 4 && 
            typeChecklist !== 0 && typeChecklist !== 7){
        let input=getInputToChecklist(typeChecklist,checklistElement);
        input.value=subchecklist.value;
    }else{
        checklistOptionsValues(subchecklist,checklistElement);
    }
}

function getInputToChecklist(typeChecklist,checklistElement){
    let input=null;

    if(typeChecklist===1){
        input=checklistElement.querySelector('.inputText');
    
    }else if(typeChecklist===2){
        input=checklistElement.querySelector('.inputFile');            
    
    }else if(typeChecklist===5 || typeChecklist===8 || typeChecklist===9){
        input=checklistElement.querySelector('.inputNumber');
    
    }else if(typeChecklist===6){
        input=checklistElement.querySelector('.inputDate');
    }

    return input;
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

function checklistOptionsValues(subchecklist,checklistElement){
    subchecklist.options.forEach((option)=>{
        if(option.selected){
            checklistElement.querySelector(`.option${option.id}`).checked=true;
        }
    })
}

function setObservationChecklistValue(checklistElement,subchecklist){
    let inputObservation=checklistElement.querySelector('.inputObservation');
    inputObservation.value=subchecklist.oficialObservation;
}

function setUploadChecklistValues(typeChecklist,subchecklist,checklistElement){
    if(typeChecklist===2){
        if(subchecklist.value !==''){
            let title=checklistElement.querySelector('.checklist__title').innerHTML;
            let numberFiles=subchecklist.value.split(',').length;
            checklistElement.querySelector('.checklist__title').innerHTML=`${title}: ${numberFiles} arquivo/s selecionado/s`; 
        }
    }
}

function headerLayoutInChecklistValues(subchecklist,checklistElement){
     if(subchecklist.duplicate && subchecklist.id_type_checklist!==7){
        checklistElement.querySelector('.checklist__header__actions').style.display='flex';
        checklistElement.querySelector('.checklist__header--optionsContainer').style.display='none';
        checklistElement.querySelector('.checklist__header .btnAdd').classList.remove('d-none');
    }
}

function groupingDoubleChoiceChecklistLayout(checklistElement,subchecklist){
    let inputRadios=checklistElement.querySelectorAll(`input[name=checkGroupingChoice${subchecklist.id}`);

    if(subchecklist.groupingDoubleChoice){
        inputRadios[0].checked=true;
        checklistElement.style.height='auto';
    }
}

function layoutValuesChecklistWithoutSubchecklist(checklistElement,subchecklist){
    let inputRadios=checklistElement.querySelectorAll(`input[name=checkGroupingChoice${subchecklist.id}`);

    if(subchecklist.subchecklist.length===0){
        inputRadios[1].checked=true;
        checklistElement.style.height='120px';
        checklistElement.querySelectorAll('.checklist__header__slot')[2].classList.add('d-none');
        checklistElement.querySelector('.checklist__header .btnAdd').classList.add('d-none');
    }
}

function duplicateSubchecklistHeaderAndActions(checklistElement,subchecklist){
    let inputRadios=checklistElement.querySelectorAll(`input[name=checkGroupingChoice${subchecklist.id}`);

    if(verifyThereIsChecklistInAgroupingArray(subchecklist)){
        if(subchecklist.duplicate){
            inputRadios[0].checked=true;
            subchecklist.subchecklist.forEach((subcheck)=>{
                ONE_ELEMENT(`#checklist${subcheck.id}`).querySelector('.checklist__header__actions').style.display='flex';
                ONE_ELEMENT(`#checklist${subcheck.id}`).querySelector('.checklist__header--optionsContainer').style.display='none';
                ONE_ELEMENT(`#checklist${subcheck.id}`).querySelector('.btnDelete').classList.remove('d-none');;
            })
        }
    }
}

function layoutHeighChecklist(checklistElement,subchecklist){
    if(verifyThereIsChecklistInAgroupingArray(subchecklist)){
        checklistElement.style.height='auto';
    }else{
        checklistElement.style.height='120px';
    }
}

function elementInputsChecklist(subchecklist,typeChecklist) {
    let checklistClone=checklistText.cloneNode(true);
    
    getOrShowInputByType(checklistClone,typeChecklist);
    fillLayoutChecklist(checklistClone,subchecklist) 

    return checklistClone;
}

function getOrShowInputByType(element,typeChecklist,show=true) {
    let input="";
    if(typeChecklist===1){
        input=element.querySelector('.inputText');
    
    }else if(typeChecklist===2){
        input=element.querySelector('.inputFile');
    
    }else if(typeChecklist===5 || typeChecklist===8 || typeChecklist===9){
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


function elementMultipleChoiceChecklist(subchecklist) {
    let checklistClone=checklistMultipleChoice.cloneNode(true);
    
    fillLayoutChecklist(checklistClone,subchecklist) 
    fillLayoutOptions(subchecklist,checklistClone);
    
    return checklistClone;
}

function verifyThereIsChecklistInAgroupingArray(subchecklist){
    let indexCloneGrouping=allCloneChecklistGrouping.findIndex((item)=>{
        if(item.id===subchecklist.idReferenceClone){
            return true;
        }
    });

    if(indexCloneGrouping !== -1){
        return true;
    }else{
        return false;
    }
}

function fillLayoutOptions(subchecklist,checklistClone) {
    let options=subchecklist.options;

    options.forEach((option)=>{
        let checklistOptionClone=checklistOption.cloneNode(true);
        
        if(option.pointsObtained === 0){
            option.pointsObtained=0;
        }
        
        layoutChecklistOptions(subchecklist,checklistOptionClone,option);

        checklistOptionClone.style.display='flex';
        checklistOptionClone.setAttribute('idoption',option.id);
        
        checklistOptionClone.querySelector('.optionName').innerHTML=option.name;
        checklistOptionClone.querySelector('.checklistPoints').innerHTML=`Pontos: ${option.points.toFixed(2)}`;
        
        checklistClone.querySelector('.checklist__options').append(checklistOptionClone);
    })
}

function layoutChecklistOptions(subchecklist,checklistOptionClone,option){
    if(subchecklist.id_type_checklist===3){
        let checklistOption=getChecklistOptionElement(subchecklist,checklistOptionClone);

        checklistOption.style.display='flex';
        checklistOption.setAttribute('name',`option${subchecklist.id}`);
        checklistOption.classList.add(`option${option.id}`);
    }else{
        checklistOptionClone.querySelector('.checklistOptionRadio').style.display='flex';
        checklistOptionClone.querySelector('.checklistOptionRadio').setAttribute('name',`option${subchecklist.id}`);
        checklistOptionClone.querySelector('.checklistOptionRadio').classList.add(`option${option.id}`);
    }
}

function getChecklistOptionElement(subchecklist,checklistOptionClone){
    let checklistOption=null;

    if(!subchecklist.only_one_choose){
        checklistOption=checklistOptionClone.querySelector('.checklistOptionCheck');
    }else{
        checklistOption=checklistOptionClone.querySelector('.checklistOptionRadio');
    }

    if(subchecklist.distinct_percentage){
        checklistOption=checklistOptionClone.querySelector('.checklistOptionRadio');
    }

    return checklistOption;
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
                eventsChecklistsMultipleOptions(element,checklist,verifyIfIsMultipleChecklistToEvent(typeChecklist)); 
            }
        }

        if(checklist.duplicate){
            eventsDoubleChoiceGroupingDuplicate(element,checklist);
            eventsDoubleAddChoiceGrouping(element,checklist);
        }else{
            eventsDoubleChoiceGrouping(element,checklist);
        }
        eventsObservationInput(element,checklist);
        eventsDoubleDeleteChoiceGrouping(element,checklist);
    })
}

function eventsChecklistsTypeInputs(element,checklist) {
    let typeChecklist=checklist.id_type_checklist;
    let inputType=getOrShowInputByType(element,typeChecklist,false);
    
    if(typeChecklist===2){
        eventUploadEvent(inputType,checklist,element);
    }else{
        eventNormalInputs(inputType,checklist,element);
    }
}

function eventNormalInputs(inputType,checklist,element){
    inputType.addEventListener('input',(e)=>{
        let possiblePoints=checklist.points;
        let text=e.currentTarget.value;
        checklist.value=text;
        
        let increment=false;
        let isBigger=false;

        if(checklist.id_type_checklist===8 || checklist.id_type_checklist===9){
            isBigger=verifyBigSmaller(checklist,text);
        }else{
            increment=verifyEmptyInput(text);
        }
      
        if(checklist.id_type_checklist===8 || checklist.id_type_checklist===9){
            if(isBigger){
                if(checklist.pointsObtained === 0){
                    checklist.pointsObtained=possiblePoints;
                    updatePointsFatherChecklist(checklist,possiblePoints,true);        
                }

            }else{
                if(checklist.pointsObtained > 0){
                    checklist.pointsObtained=0;
                    updatePointsFatherChecklist(checklist,possiblePoints,false);        
                }
            }
        }else{
            if(increment && checklist.pointsObtained===0){
                checklist.pointsObtained=possiblePoints;
                updatePointsFatherChecklist(checklist,possiblePoints,increment);
            }

            if(increment===false && checklist.pointsObtained>0){
                checklist.pointsObtained=0;
                updatePointsFatherChecklist(checklist,possiblePoints,increment);
            }
        }

        element.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${checklist.pointsObtained.toFixed(2)}`;
    });
}

function verifyEmptyInput(text){
    let increment=true;

    if(text===""){
        increment=false;
    }

    return increment;
}

function verifyBigSmaller(checklist,points){
    let isBigger=true;
    let bigSmallerValue=checklist.big_smaller;

    if(points === ''){
        isBigger=false;
    }

    if(checklist.id_type_checklist===8){
        if(points < bigSmallerValue){
            isBigger=false;
        }
    }

    if(checklist.id_type_checklist===9){
        if(points > bigSmallerValue){
            isBigger=false;
        }
    }
    
    return isBigger;
}

function eventUploadEvent(inputType,checklist,element){
    inputType.addEventListener('change',(e)=>{
        let possiblePoints=checklist.points;
        let imagesFiles=e.currentTarget.files;
        
        alertToUploadFiles(element,false);        
        let sizeFiles=getSizeFiles(imagesFiles);
        
        if(sizeFiles < 40000000){
            uploadFile(imagesFiles,checklist);
        }else{
            alertToUploadFiles(element); 
        }

        checklist.pointsObtained=possiblePoints;
        element.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${checklist.pointsObtained.toFixed(2)}`;
        
        if(checklist.value===""){
            updatePointsFatherChecklist(checklist,possiblePoints);
        }
    });
}

function getSizeFiles(imagesFiles){
    let sizeFiles=0;

    [...imagesFiles].forEach((file)=>{
        sizeFiles=sizeFiles+file.size;
    });

    return sizeFiles;
}

function alertToUploadFiles(element,show=true){
    if(show){
        element.querySelector('.alert').classList.remove('d-none');
        element.querySelector('.alert').innerHTML="O arquivo tem que ser menor que 40mb";
    }else{
        element.querySelector('.alert').classList.add('d-none');
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
        let optionInput=getTypeOption(multiple,checklist.only_one_choose,checklist.distinct_percentage,option);   
        
        optionInput.addEventListener('change',(e)=>{
            let index=getIndexToOption(checklist,idOption);
            let option=checklist.options[index];
            let points=option.points;
            let pointsObtained=checklist.pointsObtained;
            
            if(e.currentTarget.checked){
                eventOptionIsChecked(checklist,option,points,pointsObtained,multiple,element);
            }else{
                eventOptionIsNotChecked(checklist,option,points,pointsObtained,multiple,element);
            }
        });
    })
}

function getTypeOption(multiple,only_one_choose,distinct_percentage,option){
    let optionType=null;
    
    if(multiple===false || only_one_choose || distinct_percentage){
        optionType=option.querySelector('input[type=radio]')
    }else{
        optionType=option.querySelector('input[type=checkbox]')
    }
    
    return optionType;
}

function eventOptionIsChecked(checklist,option,points,pointsObtained,multiple,element){
    let oldPoints=checklist.pointsObtained;
    
    checklist.pointsObtained=pointsObtained+points;
    setZeroInOptions(checklist);
    
    option.selected=true;
    option.pointsObtained=points;
    
    let countSelectedOnlyOneChoose=getTotalCountSelectedOnlyOneChoose(checklist);
    let increment=true;
    
    setSelectedFalseWhenIsOnlyOneChoose(countSelectedOnlyOneChoose,checklist,option);
    setSelectedFalseWhenIsDoubleChoose(checklist,option);

    if(points===0){
        increment=false;
        if(checklist.distinct_percentage===false || checklist.distinct_percentage===null){
            points=checklist.points;
        }
    }
    
    samePointToOnlyOneChecklist(checklist,points);
    points=zeroPointsOptions(checklist,multiple,increment,countSelectedOnlyOneChoose,points);
    points=setSelectedFalseWhenIsOnlyOneChooseAndZeroPoints(checklist,countSelectedOnlyOneChoose,option,points,oldPoints);
    updatePointsFatherChecklist(checklist,points,increment);

    element.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${checklist.pointsObtained.toFixed(2)}`;
}

function getIndexToOption(checklist,idOption){
    let index=checklist.options.findIndex((option)=>{
        if(option.id===idOption){
            return true;
        }
    });

    return index;
}

function setZeroInOptions(checklist){
    if(checklist.only_one_choose || checklist.only_one_choose_points || checklist.distinct_percentage){
        checklist.options.forEach((option)=>{
            option.pointsObtained=0;
        });
    }
}

function getTotalCountSelectedOnlyOneChoose(checklist){
    let countSelectedOnlyOneChoose=0;

    checklist.options.forEach((option)=>{
        if(option.selected){
            countSelectedOnlyOneChoose++;
        }
    })

    return countSelectedOnlyOneChoose;
}


function samePointToOnlyOneChecklist(checklist,points){
    if(checklist.only_one_choose || checklist.only_one_choose_points || checklist.distinct_percentage){
        checklist.pointsObtained=points;
    }
}

function setSelectedFalseWhenIsDoubleChoose(checklist,option){
    if(checklist.id_type_checklist===4){
        checklist.options.forEach((optionItem)=>{
            optionItem.selected=false;
        })

        option.selected=true;
    }
}

function setSelectedFalseWhenIsOnlyOneChoose(countSelectedOnlyOneChoose,checklist,option){
    if(countSelectedOnlyOneChoose>2 && checklist.only_one_choose){
        checklist.options.forEach((option)=>{
            option.selected=false;
        })

        option.selected=true;
    }
}

function setSelectedFalseWhenIsOnlyOneChooseAndZeroPoints(checklist,countSelectedOnlyOneChoose,option,points,oldPoints=0){
    let finalPoints=points;
    
    if(checklist.only_one_choose  && countSelectedOnlyOneChoose>1){
        finalPoints=0;
        checklist.options.forEach((optionItem)=>{
            optionItem.selected=false;
        });

        option.selected=true;
    }

    if(countSelectedOnlyOneChoose>1 && checklist.only_one_choose_points ){
        finalPoints=0;
    }

    if(checklist.distinct_percentage && countSelectedOnlyOneChoose>1){
        updatePointsFatherChecklist(checklist,oldPoints,false);
        finalPoints=checklist.pointsObtained;
        checklist.options.forEach((optionItem)=>{
            optionItem.selected=false;
        });

        option.selected=true;
    }

    return finalPoints;
}

function zeroPointsOptions(checklist,multiple,increment,countSelectedOnlyOneChoose,points){
    if(multiple===false){
        checklist.pointsObtained=points;
        if(increment===false){
            checklist.pointsObtained=0;
            if(countSelectedOnlyOneChoose === 1){
                points=0;
            }
        }
    }

    return points;
}

function eventOptionIsNotChecked(checklist,option,points,pointsObtained,multiple,element){
    checklist.pointsObtained=pointsObtained-points;
    option.selected=false;

    if(multiple===false){
        checklist.pointsObtained=points;
    }

    if(checklist.only_one_choose || checklist.only_one_choose_points){
        let options=getOptionsCount(checklist);
        
        setOptionsValues(options,checklist,points,element);
    }else{
       
        updateOptionsPoints(checklist,0,element);
    }
}

function getOptionsCount(checklist){
    let options=0;
    checklist.options.forEach((option)=>{
        if(option.selected){
            options++;
        }
    })

    return options;
}

function setOptionsValues(options,checklist,points,element){
    if(options===0){
       updateOptionsPoints(checklist,points,element);
    }else{
        if(options > 0 && checklist.only_one_choose_points){
            checklist.pointsObtained=points;
            points=0;
        }
        
        updateOptionsPoints(checklist,points,element);
    }
}

function updateOptionsPoints(checklist,points,element){
    updatePointsFatherChecklist(checklist,points,false);
    element.querySelector('.checklistPoints').innerHTML=`Pontos Obtidos: ${checklist.pointsObtained.toFixed(2)}`;
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

function verifyIfIsMultipleChecklistToEvent(typeChecklist){
    let multiple=false;
    
    if(typeChecklist===3){
        multiple=true;
    }

    return multiple;
}

function eventsDoubleChoiceGroupingDuplicate(element,checklist) {
    let allCheckGroupingChoice=element.querySelector('.checklist__header__actions').querySelectorAll('.checkGroupingChoice');
   
    [...allCheckGroupingChoice].forEach((checkGroupingChoice)=>{
        checkGroupingChoice.addEventListener('change',(e)=>{
            let checkGrouping=e.currentTarget;
            let addBtn=element.querySelector('.checklist__header .btnAdd');
           
            if(checkGrouping.value==='1'){
                addGroupingChecklist(checklist);
                addBtn.classList.remove('d-none');
            }else{
                clearGroupingChecklist(checklist);
                clearPointsChecklist(checklist);
                addBtn.classList.add('d-none');
                setChecklistPoint(checklist.id);
                
                let totalChecklistPoints=setPointToAgrouping(checklist);
                checklist.pointsObtained=totalChecklistPoints;

                let totalPoints=getPointsObtained();
                defaultChecklistArray.pointsObtained=totalPoints;
               
                fillChecklistInfo(defaultChecklistArray);
            }
        })
    })
}

function checkGroupingChoiceEvent(checkGroupingChoice,checklist,element){
    checkGroupingChoice.addEventListener('change',(e)=>{
        let checkGroupingValue=e.currentTarget.value;
        showAddBtnGroupingChecklist(checkGroupingValue,element);

        if(checkGroupingValue==='1'){
            addGroupingChecklist(checklist);
        }else{
            clearGroupingChecklist(checklist);
            clearPointsChecklist(checklist);
            setChecklistPoint(checklist.id);
            
            checklist.pointsObtained=setPointToAgrouping(checklist);
            defaultChecklistArray.pointsObtained=getPointsObtained();
           
            fillChecklistInfo(defaultChecklistArray);
        }
    })
}

function showAddBtnGroupingChecklist(checkGroupingValue,element){
    let addBtn=element.querySelector('.checklist__header .btnAdd');
    
    if(checkGroupingValue==='1'){
        addBtn.classList.remove('d-none');
    }else{
        addBtn.classList.add('d-none');
    }
}

function eventsDoubleChoiceGrouping(element,checklist){
    let allCheckGroupingChoice=element.querySelectorAll('.checkGroupingChoice');
    
    [...allCheckGroupingChoice].forEach((checkGroupingChoice)=>{
        checkGroupingChoice.addEventListener('change',(e)=>{
            let checkGroupingValue=e.currentTarget.value;
            
            if(checkGroupingValue==='1'){
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
    verifyIfIsChecklistMaster(checklist);
    clearSubchecklistChecklist(checklist);
}

function verifyIfIsChecklistMaster(checklist){
    if(checklist.idDefaultChecklist === defaultChecklistArray.id){
        defaultChecklistArray.pointsObtained=defaultChecklistArray.pointsObtained-checklist.pointsObtained;
    }
}

function clearSubchecklistChecklist(checklist){
    checklist.pointsObtained=0;

    checklist.subchecklist.forEach((checklist)=>{
        setEmptyValueChecklist(checklist);
        setOptionsCheckFalse(checklist);

        if(checklist.subchecklist.length>0){
            checklist.subchecklist.forEach((checkItem)=>{
                clearPointsChecklist(checkItem);
            });
        }
    })
}

function setOptionsCheckFalse(checklist){
    if(checklist.options.length > 0){
        checklist.options.forEach((option)=>{
            option.selected=false;
        })
    }
}

function setEmptyValueChecklist(checklist){
    checklist.pointsObtained=0;
    checklist.value='';
    checklist.oficialObservation='';
}

function eventsDoubleAddChoiceGrouping(element,checklist){
    let addBtn=element.querySelector('.checklist__header .btnAdd');
    if(addBtn !== null){
        addBtn.addEventListener('click',()=>{
            let idReferenceClone=checklist.idReferenceClone;
            let indexReferenceClone=getIdReference(idReferenceClone);

            if(allCloneChecklistGrouping.length > 0 && indexReferenceClone !== -1){
                let newChecklistGrouping=JSON.parse(JSON.stringify(allCloneChecklistGrouping[indexReferenceClone]));
                idIncrement=idIncrement+1;
                newIdCheck=idIncrement;
                
                setInfoAndPushNewChecklist(newChecklistGrouping,checklist);
                updateIncrementChecklist(checklist);
                setChecklistPoint(checklist.id);
                
                let totalChecklistPoints=setPointToAgrouping(checklist);
                checklist.pointsObtained=totalChecklistPoints;

                updatePointsToFather(checklist);

                let totalPoints=getPointsObtained();
                defaultChecklistArray.pointsObtained=totalPoints;

                fillChecklistInfo(defaultChecklistArray);
            }else{
                addGroupingChecklist(checklist);
            }
        });
    }
}

function updatePointsToFather(checklist){
    let checklistFather=filterChecklist(defaultChecklistArray.subchecklist,checklist.idDefaultChecklist,{});
   
    if(checklistFather!==null){
        let totalChecklistPoints=setPointToAgrouping(checklistFather);
        checklistFather.pointsObtained=totalChecklistPoints;
        
        if(checklistFather.idDefaultChecklist !== null){
            updatePointsToFather(checklistFather); 
        }
    }
}

function setInfoAndPushNewChecklist(newChecklistGrouping,checklist){
    newChecklistGrouping.id=idIncrement;
    newChecklistGrouping.id_type_checklist=0;
    newChecklistGrouping.duplicate=false;
    newChecklistGrouping.duplicateSubchecklist=true;
    newChecklistGrouping.oficialObservation='';

    checklist.subchecklist.push(newChecklistGrouping);
}

function eventsDoubleDeleteChoiceGrouping(element,checklist){
    let deleteBtn=element.querySelector('.checklist__header .btnDelete');
    if(deleteBtn !== null){
        deleteBtn.addEventListener('click',(e)=>{
            let checklistFather=filterChecklist(defaultChecklistArray.subchecklist,checklist.idDefaultChecklist,{});
            deleteChecklist(checklistFather,checklist);
            
            let totalChecklistPoints=setPointToAgrouping(checklistFather);
            checklistFather.pointsObtained=totalChecklistPoints;

            updateIncrementChecklist(checklistFather);
            setChecklistPoint(checklistFather.id);

            if(defaultChecklistArray.id !== checklistFather.idDefaultChecklist){
                updatePointsToFather(checklistFather);
            }else{
                let totalChecklistPoints=setPointToAgrouping(checklistFather);
                checklistFather.pointsObtained=totalChecklistPoints;
            }

            let totalPoints=getPointsObtained();
            defaultChecklistArray.pointsObtained=totalPoints;

            fillChecklistInfo(defaultChecklistArray);
        });
    }
}

function deleteChecklist(checklistFather,checklist){
    if(checklistFather.subchecklist.length > 1){
        deleteSubchecklistToFather(checklistFather,checklist);
    }else{
        clearGroupingChecklist(checklistFather);
    }
}

function deleteSubchecklistToFather(checklistFather,checklist){
    checklistFather.subchecklist.forEach((checkItem)=>{
        if(checkItem.id===checklist.id){
            let index=findIndexToDeleteChecklist(checklistFather,checkItem);
            checklistFather.subchecklist.splice(index, 1);;
        }
    });
}

function findIndexToDeleteChecklist(checklistFather,checkItem){
    let index=checklistFather.subchecklist.findIndex((subcheckItem)=>{
        if(subcheckItem.id===checkItem.id){
            return true;
        }
    })

    return index;
}

function setPointToAgrouping(checklist){
    let totalChecklistPoints=0;
    checklist.subchecklist.forEach((item)=>{
        let totalPointsObtainedSubchecklist=0;

        if(item.id_type_checklist===7 || item.id_type_checklist===0){
            item.subchecklist.forEach((subchecklist)=>{
                totalPointsObtainedSubchecklist+=subchecklist.pointsObtained;
            }); 
            
            item.pointsObtained=totalPointsObtainedSubchecklist;
        }

        totalChecklistPoints+=item.pointsObtained;
    });
    
    return totalChecklistPoints;
}

function getPointsAgrouping(item){
    let totalPointsObtainedSubchecklist=0;
    let totalChecklistPoints=0;

    item.subchecklist.forEach((subchecklist)=>{
        totalPointsObtainedSubchecklist+=subchecklist.pointsObtained;
        totalChecklistPoints+=subchecklist.pointsObtained;
    }); 
    
    return [totalPointsObtainedSubchecklist,totalChecklistPoints];
}

function getIdReference(idReferenceClone){
    let idReference=allCloneChecklistGrouping.findIndex((item)=>{
        if(item.id===idReferenceClone){
            return true;
        }
    })

    return idReference;
}

function getPointsObtained(){
    let totalPoints=0;

    defaultChecklistArray.subchecklist.forEach((checklist)=>{
        totalPoints+=checklist.pointsObtained;
    });

    return totalPoints;
}


function addGroupingChecklist(checklist){
    let cloneChecklist=JSON.parse(JSON.stringify(checklist));
    definityGroupingCloneChecklist=definityGroupingChecklist(checklist);
    
    checklist.subchecklist=[];
    fillChecklistGrouping(cloneChecklist,checklist);
    
    checklist.idReferenceClone=definityGroupingCloneChecklist.id;
    cloneChecklist.name=cloneChecklist.name+' - 1';
    cloneChecklist.oficialObservation='';
    checklist.subchecklist.push(cloneChecklist);
    
    updateIncrementChecklist(cloneChecklist); 
    setChecklistPoint(cloneChecklist.id);
    fillChecklistInfo(defaultChecklistArray,true);
    
    ONE_ELEMENT(`#checklist${cloneChecklist.id}`).querySelector('.btnDelete').classList.remove('d-none');
}

function definityGroupingChecklist(checklist){
    let definityGroupingCloneChecklist=JSON.parse(JSON.stringify(checklist));
    allCloneChecklistGrouping.push(definityGroupingCloneChecklist);

    return definityGroupingCloneChecklist;
}

function fillChecklistGrouping(cloneChecklist,checklist){
    idIncrement=idIncrement+1;
    
    cloneChecklist.id=idIncrement;
    cloneChecklist.id_type_checklist=0;
    cloneChecklist.idDefaultChecklist=checklist.id;
    cloneChecklist.duplicateSubchecklist=true;
    cloneChecklist.duplicate=false;
}


function clearGroupingChecklist(checklist){
    let checklistOriginal=checklist;
  
    checklistOriginal.subchecklist=[];
    checklistOriginal.oficialObservation="";

    let index=getIndexToGroupingChecklist(checklistOriginal);
    recoverySubchecklistWhenDelete(checklist,index);
    allCloneChecklistGrouping.splice(index,1);
    
    updateIncrementChecklist(checklist);
    checklist.subchecklist.forEach((item)=>{
        setChecklistPoint(item.id);
    })

    updatePointsFatherChecklist(checklist,checklist.points,false);  
    fillChecklistInfo(defaultChecklistArray);
    
}

function getIndexToGroupingChecklist(checklistOriginal){
    let index=allCloneChecklistGrouping.findIndex((item)=>{
        if(item.id===checklistOriginal.idReferenceClone){
            return true;
        }
    });

    return index;
}

function recoverySubchecklistWhenDelete(checklist,index){
    allCloneChecklistGrouping[index].subchecklist.forEach((checklistItem)=>{
        let checkItemClone=JSON.parse(JSON.stringify(checklistItem));
        checklist.subchecklist.push(checkItemClone);
    });
}

function updateIncrementChecklist(checklist) {
    checklist.subchecklist.forEach((checklistItem,index)=>{
        let subchecklists=JSON.parse(JSON.stringify(checklistItem.subchecklist));
        changeNamesAgroupingChecklist(checklistItem,index);

        checklistItem.subchecklist=[];
        checklistItem.idDefaultChecklist=checklist.id;
        
        if(subchecklists.length > 0){
            setIncrementToSubchecklist(subchecklists,checklistItem);
        }
    });
}

function changeNamesAgroupingChecklist(checklistItem,index){
    if(checklistItem.id_type_checklist === 0 && checklistItem.duplicateSubchecklist){
        let names=checklistItem.name.split('-');
        checklistItem.name=names[0]+' - '+(index+1);
    }
}

function setIncrementToSubchecklist(subchecklists,checklistItem){
    subchecklists.forEach((item)=>{
        let newSubCheck=JSON.parse(JSON.stringify(item));
        idIncrement=idIncrement+1;
        newSubCheck.id=idIncrement;
        newSubCheck.idDefaultChecklist=checklistItem.id;
            
        setIncrementToOptions(newSubCheck);

        if(newSubCheck.subchecklist.length > 0){
            updateIncrementChecklist(newSubCheck);
        }

        checklistItem.subchecklist.push(newSubCheck);

    });
}

function setIncrementToOptions(newSubCheck){
    if(newSubCheck.options.length > 0){
        let optionsClone=JSON.parse(JSON.stringify(newSubCheck.options));
        newSubCheck.options=[];

        optionsClone.forEach((option)=>{
            let newOption=JSON.parse(JSON.stringify(option));
            idIncrement=idIncrement+1;
            newOption.id=idIncrement;
            newSubCheck.options.push(newOption);
        });
    }
}


function setChecklistPoint(id) {
    let checklist=filterChecklist(defaultChecklistArray.subchecklist,id,{});
    let points=checklist.points;
    let allDefaultChecklist=filterChecklist(defaultChecklistArray.subchecklist,id,{}).subchecklist;
    
    let totalNumberDefaultChecklists=allDefaultChecklist.length;
    let pointsValue=0;
    
    if(totalNumberDefaultChecklists>0){
        pointsValue=points/totalNumberDefaultChecklists;;
    }
    
    let percentage= (pointsValue/points)*100;
    
    if(checklist.pointsObtained !== 0){
        checklist.pointsObtained=points;
    }

    setSubchecklistPoint(allDefaultChecklist,percentage,pointsValue);
}

function setSubchecklistPoint(allDefaultChecklist,percentage,pointsValue){
    allDefaultChecklist.forEach(checklist => {
        verifyPointsSubchecklistZero(checklist,pointsValue);
        fillInfoPointToChecklist(checklist,pointsValue,percentage);
        
        if(checklist.options.length > 0){
            updatePointsOptions(checklist.options,checklist.points,checklist); 
        }

        if(checklist.pointsObtained != 0){
            updatePointsToOptions(checklist);
        }

        let numberSubchecklist=checklist.subchecklist.length;
        if(numberSubchecklist > 0){
            repeatPointsUpdate(checklist,numberSubchecklist);
        }
    });
}

function verifyPointsSubchecklistZero(checklist,pointsValue){
    if(checklist.pointsObtained != 0){
        if(checklist.id_type_checklist!==7 && checklist.id_type_checklist!==0){
           checklist.pointsObtained=pointsValue;    
        }
    }
}

function fillInfoPointToChecklist(checklist,pointsValue,percentage){
    checklist.points=pointsValue;
    if(checklist.pointsObtained !== 0){
        checklist.pointsObtained=pointsValue;
    }
    checklist.percentage=percentage;
    checklist.correctPercentage=true;
}

function repeatPointsUpdate(checklist,numberSubchecklist){
    let newPoints=checklist.points/numberSubchecklist;
    let percentage= (newPoints/checklist.points)*100;
    
    checklist.subchecklist.forEach((item)=>{
        item.points=newPoints;
        if(item.pointsObtained !== 0){
            item.pointsObtained=newPoints;
        }

        if(item.options.length > 0){
            updatePointsOptions(item.options,item.points,item); 
        }

        if(item.pointsObtained != 0){
            updatePointsToOptions(item);
        }

        item.percentage=percentage;
        setChecklistPoint(item.id);
    })
}

function updatePointsToOptions(checklist){
    if(checklist.id_type_checklist===3){
        let pointsOptions=0;
        
        checklist.options.forEach((option)=>{
            if(option.selected){
                pointsOptions=pointsOptions+option.points
            }
        })

        checklist.pointsObtained=pointsOptions;    
    }
}

function updatePointsOptions(options,points,element) {
    let typechecklist=element.id_type_checklist;
    let onlyOneChoosePoints=element.only_one_choose_points;
    let onlyOneChoose=element.only_one_choose;
    let distinctPercentage=element.distinct_percentage;
    
    let numberOptions=options.length;
    let pointsValue=points/numberOptions;
    let percentage= (pointsValue/points)*100;
    
    options.forEach((option)=>{
        if(typechecklist===4){
            if(option.points !== 0){
                option.points=element.points;
            }
        }else{
            if(!onlyOneChoosePoints && !onlyOneChoose && !distinctPercentage){
                option.points=pointsValue;
                option.percentage=percentage;
                option.correctPercentage=true;
            
            }else if(onlyOneChoosePoints || onlyOneChoose){
                option.points=points;
            
            }else if(distinctPercentage){
                let newPoints=(option.percentage/100)*points;
                option.points=newPoints;
                option.percentage=option.percentage;
                option.correctPercentage=true;
            }
        }
    })
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
