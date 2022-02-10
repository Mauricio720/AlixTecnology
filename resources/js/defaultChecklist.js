var defaultChecklist=ONE_ELEMENT('.defaultChecklist');
let defaultChecklistJson= ONE_ELEMENT('#default_checklist_json').value;
var defaultChecklistArray=defaultChecklistJson!==''?JSON.parse(ONE_ELEMENT('#default_checklist_json').value):[];
var idIncrement=1;
var idIndentOption=1;
var optionsDefaultChecklist=ONE_ELEMENT('.optionsDefaultChecklist');

eventCloneDefaultChecklist();

function eventCloneDefaultChecklist(){
    ALL_ELEMENTS('.defaultCheckRadio').forEach((item)=>{
        item.addEventListener('change',(e)=>{
            let defaultCheckInfo=e.currentTarget.previousElementSibling;
            defaultChecklistArray=JSON.parse(defaultCheckInfo.value);
            idIncrement=parseInt(defaultCheckInfo.getAttribute('lastidincrement'));
            idIndentOption=parseInt(defaultCheckInfo.getAttribute('lastidincrementoption'));
           
            ONE_ELEMENT('.checklistContent').innerHTML="";
            showDefaultChecklist(defaultChecklistArray);
            eventsDefaultChecklist(true);
            eventsBtnDelete();
            verifyBtnSave();
            showSubchecklistContainerLoop(defaultChecklistArray);
        })
    })
}

verifyInProgressDefaultChecklist();

function verifyInProgressDefaultChecklist(){
    if(defaultChecklistJson != ''){
        idIncrement=parseInt(ONE_ELEMENT('#lastIdIncrement').value);
        idIndentOption=parseInt(ONE_ELEMENT('#lastIdIncrementOption').value);
        
        ONE_ELEMENT('.checklistContent').innerHTML="";
        showDefaultChecklist(defaultChecklistArray);
        eventsDefaultChecklist(true);
        eventsBtnDelete();
        verifyBtnSave();
        showSubchecklistContainerLoop(defaultChecklistArray);
    }
}


function verifyBtnSave() {
    if(defaultChecklistArray.length > 0){
        ONE_ELEMENT('#btnSave').classList.remove('d-none');
        ONE_ELEMENT('#btnFinish').classList.remove('d-none');
    }else{
        ONE_ELEMENT('#btnSave').classList.add('d-none');
        ONE_ELEMENT('#btnFinish').classList.add('d-none');
    }
}

ONE_ELEMENT('.btnScrollToTop').addEventListener('click',()=>{
    let scrollPosition=ONE_ELEMENT('#btnAddDefaultCheck').getBoundingClientRect();
    window.scrollBy(scrollPosition.x,scrollPosition.y);
});

ONE_ELEMENT('.btnScrollToBotttom').addEventListener('click',()=>{
    let scrollPosition=ONE_ELEMENT('#btnSave').getBoundingClientRect();
    window.scrollBy(scrollPosition.x,scrollPosition.y);
});

ONE_ELEMENT('#btnAddDefaultCheck').addEventListener('click',(e)=>{
    addDefaultChecklist(); 
    ONE_ELEMENT('.checklistContent').innerHTML="";
    showDefaultChecklist(defaultChecklistArray);
    eventsDefaultChecklist();
    eventsBtnDelete();
    verifyBtnSave();
    showSubchecklistContainerLoop(defaultChecklistArray);
});

/*-----------------------------------------------MONTAGEM DO LAYOUT--------------------------------------------*/

function showDefaultChecklist(defaultChecklistArray) {
    defaultChecklistArray.map((item)=>{
        let defaultChecklistClone=defaultChecklist.cloneNode(true);
        defaultChecklistClone.style.display='flex'

        fillInputsAndAttributeDefaultChecklist(defaultChecklistClone,item);
        verifyIdDefaultNullSelectDisabled(defaultChecklistClone,item); 
        verifyCorrectPercentageInputDanger(defaultChecklistClone,item);
        verifyIdDefaultNullInputDanger(defaultChecklistClone,item);
        verifySubchecklists(defaultChecklistClone,item); 
        verifySubchecklistsLengthBtnSeeMore(defaultChecklistClone,item);
        verifyTypeSubchecklist(defaultChecklistClone,item); 
        verifyActiveDefaultChecklist(defaultChecklistClone,item); 
        verifyDuplicateButton(defaultChecklistClone,item);
        verifyBtnScroll();
        appendDefaultChecklist(defaultChecklistClone,item); 
        setChecklistPoint(item.id);
        repeatLoopShowDefaultChecklist(item);
    });
}

function fillInputsAndAttributeDefaultChecklist(defaultChecklistClone,item) {
    defaultChecklistClone.setAttribute('idElement',item.id);
    defaultChecklistClone.setAttribute('id',"defaultCheck"+item.id);
    
    defaultChecklistClone.querySelectorAll('input')[0].value=item.name;
    defaultChecklistClone.querySelectorAll('input')[1].value=parseFloat(item.percentage).toFixed(2); 
    defaultChecklistClone.querySelectorAll('input')[2].value=parseFloat(item.points).toFixed(2);
    defaultChecklistClone.querySelectorAll('input')[3].value=item.observation;
}

function verifyIdDefaultNullSelectDisabled(defaultChecklistClone,item) {
    if(item.idDefaultChecklist===null){
        defaultChecklistClone.querySelector('select').disabled=true;
        defaultChecklistClone.querySelector('select').value=0;
        defaultChecklistClone.querySelector('.btnAddDefaultChecklist').style.display="block";
    }else{
        defaultChecklistClone.querySelector('select').value=item.typechecklist.toString();
    }
}

function verifyIdDefaultNullInputDanger(defaultChecklistClone,item) {
    if(item.idDefaultChecklist !== null){
        defaultChecklistClone.querySelectorAll('input')[1].disabled=false;
        defaultChecklistClone.querySelectorAll('input')[2].disabled=true;
    }
}

function verifyCorrectPercentageInputDanger(defaultChecklistClone,item) {
    if(item.correctPercentage){
        defaultChecklistClone.querySelectorAll('input')[2].classList.remove('input-danger');
    }else{
        defaultChecklistClone.querySelectorAll('input')[2].classList.add('input-danger');
    }
}

function verifySubchecklists(defaultChecklistClone,item) {
    if(item.subchecklists.length===0 && item.idDefaultChecklist === null){
        defaultChecklistClone.querySelectorAll('input')[2].disabled=false;
    }else{
        defaultChecklistClone.querySelectorAll('input')[2].disabled=true;
    }
}

function verifySubchecklistsLengthBtnSeeMore(defaultChecklistClone,item) {
    if(item.subchecklists.length===0){
        defaultChecklistClone.querySelector('.btnSeeMore').style.display="none";
    }else{
        defaultChecklistClone.querySelector('.btnSeeMore').style.display="block";
    }
}

function verifyTypeSubchecklist(defaultChecklistClone,item) {
    if(item.typechecklist==="3" || item.typechecklist==="4"){
        defaultChecklistClone.querySelector('.btnAddOptions').style.display="block";
    }else{
        defaultChecklistClone.querySelector('.btnAddOptions').style.display="none";
    }

    if(item.typechecklist==="0" || item.typechecklist==="7"){
        defaultChecklistClone.querySelector('.btnAddDefaultChecklist').style.display="block";
    }

    if(item.typechecklist==="0" || item.typechecklist==="7"){
        if(item.idDefaultChecklist != ''){
            defaultChecklistClone.querySelector('.btnDuplicate').classList.remove("d-none");
        }
    }
}

function verifyActiveDefaultChecklist(defaultChecklistClone,item) {
    if(item.active){
        defaultChecklistClone.classList.add('active');
    }
}

function verifyDuplicateButton(defaultChecklistClone,item){
    if(item.duplicate){
        defaultChecklistClone.querySelector('.btnDuplicate').style.backgroundColor='#00b800';
    }else{
        defaultChecklistClone.querySelector('.btnDuplicate').style.backgroundColor='transparent';
    }
}

function verifyBtnScroll() {
    if(defaultChecklistArray.length>0){
        ONE_ELEMENT('.actionsScroll').style.display='flex';
    }else{
        ONE_ELEMENT('.actionsScroll').style.display='none';
    }
}

function appendDefaultChecklist(defaultChecklistClone,item) {
    if(item.idDefaultChecklist != null){
        let defaultChecklist=ONE_ELEMENT(`#defaultCheck${item.idDefaultChecklist}`);
        defaultChecklist.querySelector('.defaultChecklist__container').append(defaultChecklistClone);
    }else{
        ONE_ELEMENT('.checklistContent').append(defaultChecklistClone);
    }
}

function repeatLoopShowDefaultChecklist(item) {
    if(item.subchecklists.length > 0){
        showDefaultChecklist(item.subchecklists);
    }
}

function downScrollNewDefaultChecklist() {
    [...ALL_ELEMENTS('.checklistContent .btnAddDefaultChecklist')].forEach((element)=>{
        let id=parseInt(element.closest('.defaultChecklist').getAttribute('idElement'));
      
        if(id===idIncrement){
            let scrollPosition=element.closest('.defaultChecklist').getBoundingClientRect();
            window.scrollBy(scrollPosition.x,scrollPosition.y);
        }
    });
}

function newDefaultChecklistEffect() {
    [...ALL_ELEMENTS('.checklistContent .btnAddDefaultChecklist')].forEach((element)=>{
        let id=parseInt(element.closest('.defaultChecklist').getAttribute('idElement'));
      
        if(id===idIncrement){
            element.closest('.defaultChecklist').style.backgroundColor='rgb(237 237 237)';
        }
    });
}

/*---------------------------------------------MONTAGEM DO LAYOUT-FIM--------------------------------------------*/


/*----------------------------------------------EVENTOS DAS CHECKLISTS-----------------------------------------*/

function eventsDefaultChecklist(inProgress=false) {
    [...ALL_ELEMENTS('.checklistContent .btnAddDefaultChecklist')].forEach((element)=>{
        let id=parseInt(element.closest('.defaultChecklist').getAttribute('idElement'));
        let elementChecklist=element.closest('.defaultChecklist');
        let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});

        element.addEventListener('click',(e)=>{
            if(validationDefaultChecklist(e.currentTarget.closest('.defaultChecklist'),defaultChecklist)){
                ONE_ELEMENT('.checklistContent').innerHTML="";
                addDefaultChecklist(id); 
                defaultChecklist.active=true;
                showDefaultChecklist(defaultChecklistArray);
                eventsDefaultChecklist();
                eventsBtnSeeMore();
                eventsBtnDelete();
                eventsDuplicateChecklist();
                verifyBtnSave();
                eventsBtnAddOptions();
                showSubchecklistContainerLoop(defaultChecklistArray);
                downScrollNewDefaultChecklist();
                newDefaultChecklistEffect();
                typechecklistModal="";
            }
        })

        if(inProgress){
            if(validationDefaultChecklist(elementChecklist,defaultChecklist)){
                ONE_ELEMENT('.checklistContent').innerHTML="";
                defaultChecklist.active=true;
                showDefaultChecklist(defaultChecklistArray);
                eventsDefaultChecklist();
                eventsBtnSeeMore();
                eventsBtnDelete();
                eventsDuplicateChecklist();
                verifyBtnSave();
                eventsBtnAddOptions();
                showSubchecklistContainerLoop(defaultChecklistArray);
                typechecklistModal="";
            }
        }

        uniqueEventInputChecklistName(elementChecklist,defaultChecklist); 
        uniqueEventInputPointingPercentage(elementChecklist,defaultChecklist); 
        uniqueEventPointingNumber(elementChecklist,defaultChecklist);
        uniqueEventObservation(elementChecklist,defaultChecklist); 
        uniqueEventFocusInputDanger(elementChecklist,defaultChecklist); 
        uniqueEventTypeChecklist(elementChecklist,defaultChecklist); 
    });
}

function uniqueEventInputChecklistName(elementChecklist,defaultChecklist) {
    elementChecklist.querySelectorAll('input')[0].addEventListener('keyup',(e)=>{
        let value=e.currentTarget.value;
        defaultChecklist.name=value;
    });
}

function uniqueEventInputPointingPercentage(elementChecklist,defaultChecklist) {
    elementChecklist.querySelectorAll('input')[1].addEventListener('input',(e)=>{
        idDefaultChecklistFather=calcPointing(e,defaultChecklist); 
        verifyCorrectPercentage(idDefaultChecklistFather);
    });
}

function calcPointing(e,defaultChecklist) {
    let value=parseFloat(e.currentTarget.value);
    defaultChecklist.percentage=value;

    let defaultChecklistFather=filterDefaultChecklist(defaultChecklistArray,defaultChecklist.idDefaultChecklist,{});
    let totalPoints=defaultChecklistFather.points;

    let newPoints=(value/100)*totalPoints;
    defaultChecklist.points=newPoints;
    
    let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${defaultChecklist.id}`);
    defaultChecklistElement.querySelectorAll('input')[2].value=parseFloat(newPoints).toFixed(2);
    
    if(defaultChecklist.subchecklists.length>0){
        let pointsSubchecklist=newPoints/defaultChecklist.subchecklists.length;
        defaultChecklist.subchecklists.forEach((subchecklist)=>{
            updatedSubchecklistPoints(subchecklist.id,pointsSubchecklist) ;
        });
    }

    return defaultChecklistFather.id;
}

function updatedSubchecklistPoints(id,pointsSubchecklist) {
    let defaultChecklistSubchecklist=filterDefaultChecklist(defaultChecklistArray,id,{});
    let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${defaultChecklistSubchecklist.id}`);
    defaultChecklistElement.querySelectorAll('input')[2].value=parseFloat(pointsSubchecklist).toFixed(2);

    if(defaultChecklistSubchecklist.subchecklists.length > 0){
        let newPointsSubchecklist=pointsSubchecklist/defaultChecklistSubchecklist.subchecklists.length;
        defaultChecklistSubchecklist.subchecklists.forEach((subchecklist)=>{
            updatedSubchecklistPoints(subchecklist.id,newPointsSubchecklist); 
        })
    }
}

function uniqueEventPointingNumber(elementChecklist,defaultChecklist) {
    elementChecklist.querySelectorAll('input')[2].addEventListener('input',(e)=>{
        let value=e.currentTarget.value;
        defaultChecklist.points=value;
        defaultChecklist.percentage=100;
        elementChecklist.querySelectorAll('input')[1].value=100;
    });
}

function uniqueEventObservation(elementChecklist,defaultChecklist) {
    elementChecklist.querySelectorAll('input')[3].addEventListener('keyup',(e)=>{
        let value=e.currentTarget.value;
        defaultChecklist.observation=value;
    });
}

function uniqueEventFocusInputDanger(elementChecklist) {
    elementChecklist.querySelectorAll('input')[0].addEventListener('focus',(e)=>{
        e.currentTarget.classList.remove('input-danger');
        elementChecklist.classList.remove('input-danger');
        ONE_ELEMENT('.alert-header').classList.add('d-none');
    });

    elementChecklist.querySelectorAll('input')[2].addEventListener('focus',(e)=>{
        e.currentTarget.classList.remove('input-danger');
        elementChecklist.classList.remove('input-danger');
        ONE_ELEMENT('.alert-header').classList.add('d-none');
    });
    
    elementChecklist.querySelectorAll('input')[3].addEventListener('focus',(e)=>{
        e.currentTarget.classList.remove('input-danger');
        elementChecklist.classList.remove('input-danger');
        ONE_ELEMENT('.alert-header').classList.add('d-none');
    });
}


function uniqueEventTypeChecklist(elementChecklist,defaultChecklist) {
    if(elementChecklist.querySelector('select') !== null){
        elementChecklist.querySelector('select').addEventListener('change',(e)=>{
            let value=e.currentTarget.value;
            defaultChecklist.typechecklist=value;
        
            e.currentTarget.classList.remove('input-danger');
            if(value==="0" || value==="7"){
                e.currentTarget.closest('.defaultChecklist').querySelector('.btnDuplicate').classList.remove('d-none');
                e.currentTarget.closest('.defaultChecklist').querySelector('.btnAddDefaultChecklist').style.display='block';
            }else{
                e.currentTarget.closest('.defaultChecklist').querySelector('.btnDuplicate').classList.add('d-none');
                e.currentTarget.closest('.defaultChecklist').querySelector('.btnAddDefaultChecklist').style.display='none';
            }

            if(value==="3" || value==="4"){
                e.currentTarget.closest('.defaultChecklist').querySelector('.btnAddOptions').style.display="block";
                e.currentTarget.closest('.defaultChecklist').querySelector('.btnAddOptions').setAttribute('type',value);
                
            }else{
                elementChecklist.closest('.defaultChecklist').querySelector('.btnAddOptions').style.display="none";
            }
            defaultChecklist.options=[];
        
        });
    }
}

function eventsBtnSeeMore() {
    [...ALL_ELEMENTS('.checklistContent .btnSeeMore')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let elementChecklist=e.currentTarget.closest('.defaultChecklist');
            showSubchecklistContainer(elementChecklist);
        })
    });
}

function eventsDuplicateChecklist(){
    [...ALL_ELEMENTS('.checklistContent .btnDuplicate')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let id=parseInt(e.currentTarget.closest('.defaultChecklist').getAttribute('idElement'));
            let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});
            defaultChecklist.duplicate=!defaultChecklist.duplicate;
            if(defaultChecklist.duplicate){
                e.currentTarget.style.backgroundColor='#00b800';
            }else{
                e.currentTarget.style.backgroundColor='transparent';
            }
        })
    });
}

function eventsBtnDelete() {
    [...ALL_ELEMENTS('.checklistContent .btnDelete')].forEach((element)=>{
        element.addEventListener('click',(e)=>{

            let id=parseInt(e.currentTarget.closest('.defaultChecklist').getAttribute('idElement'));
            let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});
            let defaultChecklistFather=filterDefaultChecklist(defaultChecklistArray,defaultChecklist.idDefaultChecklist,{});
            filterDefaultChecklistToDelete(defaultChecklistArray,id,{});
            ONE_ELEMENT('.checklistContent').innerHTML="";
            
            setChecklistPoint(defaultChecklistFather.id);
            showDefaultChecklist(defaultChecklistArray);
        
            eventsDefaultChecklist();
            eventsBtnSeeMore();
            eventsBtnDelete();
            eventsBtnAddOptions(); 
            eventsDuplicateChecklist();
            verifyBtnSave();

            showSubchecklistContainerLoop(defaultChecklistArray);
        });
    });
}

var typechecklistModal=""
function eventsBtnAddOptions() {
    [...ALL_ELEMENTS('.checklistContent .btnAddOptions')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            e.currentTarget.classList.remove('input-danger');
            let id=parseInt(e.currentTarget.closest('.defaultChecklist').getAttribute('idelement'));
            let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});
            let type=defaultChecklist.typechecklist;
            let points=defaultChecklist.points;

            if(type==="3"){
                openModalMultipleChoose(points,id);  
            }
            
            if(type==="4"){
                openModalDoubleChoose(points,id);    
            }
        })
    });
}


function clearSelected(allOptions) {
    allOptions.forEach((option)=>{
        option.selected=false;
        option.pointsValue=0;
    })
}

function setChecklistPoint(id) {
    let points=filterDefaultChecklist(defaultChecklistArray,id,{}).points;
    let allDefaultChecklist=filterDefaultChecklistToPoints(defaultChecklistArray,id,[]);
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
    let typechecklist=element.typechecklist;
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

function verifyCorrectPercentage(idDefaultChecklistFather) {
    let points=filterDefaultChecklist(defaultChecklistArray,idDefaultChecklistFather,{}).points;
    let allDefaultChecklist=filterDefaultChecklistToPoints(defaultChecklistArray,idDefaultChecklistFather,[]);
    let totalPoint=0;
  
    allDefaultChecklist.forEach(element => {
        totalPoint+=parseFloat(element.points);
    });

    if(totalPoint != points){
        allDefaultChecklist.forEach(element => {
            element.correctPercentage=false;
        })
       
    }else{
        allDefaultChecklist.forEach(element => {
            element.correctPercentage=true;
        })
    }

    allDefaultChecklist.forEach(item =>{
        if(item.correctPercentage===false){
            let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${item.id}`);
            defaultChecklistElement.querySelectorAll('input')[2].classList.add('input-danger');
        }else{
            let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${item.id}`);
            defaultChecklistElement.querySelectorAll('input')[2].classList.remove('input-danger');
        }
    })
}

function showSubchecklistContainer(elementChecklist){
    let id=parseInt(elementChecklist.getAttribute('idElement'));
    let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});

    if(!elementChecklist.classList.contains('active')){
        let totalDefaultChecklist=elementChecklist.querySelectorAll('.checklistContent .defaultChecklist').length;
        let margin=35*totalDefaultChecklist;
        let heightTotal=65+(65*totalDefaultChecklist)+margin;
            
        elementChecklist.style.height=`${heightTotal}px`;
        elementChecklist.classList.add('active');
        defaultChecklist.active=true;
    }else{
        elementChecklist.style.height="65px";
        elementChecklist.classList.remove('active');
        defaultChecklist.active=false;
    }
}

function showSubchecklistContainerLoop(defaultChecklistArray) {
    defaultChecklistArray.forEach((item) =>{
        let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${item.id}`);
        
        if(item.active){
            let totalDefaultChecklist=defaultChecklistElement.querySelectorAll('.checklistContent .defaultChecklist').length;
            let margin=35*totalDefaultChecklist;
            let heightTotal=65+(65*totalDefaultChecklist)+margin;
           
            defaultChecklistElement.style.height=`${heightTotal}px`;
            defaultChecklistElement.classList.add('active');
            item.active=true;
          
        }else{
            defaultChecklistElement.style.height="65px";
            defaultChecklistElement.classList.remove('active');
            item.active=false;
        }

        if(item.subchecklists.length > 0){
            showSubchecklistContainerLoop(item.subchecklists);
        }
    })
}

function validationDefaultChecklist(defaultChecklistElement,defaultChecklistArray){
    let isOK=true;
    let inputsChecklist=defaultChecklistElement.querySelectorAll('input');
    let selectChecklist=defaultChecklistElement.querySelector('select');
    
    if(defaultChecklistArray.idDefaultChecklist===null){
        selectChecklist=null;
    }

    ONE_ELEMENT('.alert-header').classList.add('d-none');
    defaultChecklistElement.classList.remove('input-danger');
    inputsChecklist[0].classList.remove('input-danger');
    inputsChecklist[2].classList.remove('input-danger');
    
    
    if(selectChecklist !== null){
        selectChecklist.classList.remove('input-danger');
    }

    if(inputsChecklist[0].value==""){
        inputsChecklist[0].classList.add('input-danger');
        isOK=false;
    }

    if(defaultChecklistArray.correctPercentage===false){
        isOK=false;
    }

    if(inputsChecklist[2].value==""){
        inputsChecklist[2].classList.add('input-danger');
        isOK=false;
    }
    
    if(selectChecklist !== null){
        if(selectChecklist.value===""){
            selectChecklist.classList.add('input-danger');
            isOK=false;
        }
    }

    return isOK;
}

function addDefaultChecklist(idDefaultChecklist=null) {
    let id=idIncrement=idIncrement+1;
    
    let defaultChecklistObject={
        id,
        idDefaultChecklist,
        name:"",
        typechecklist:"",
        percentage:"",
        active:false,
        correctPercentage:true,
        points:"",
        observation:'',
        options:[],
        onlyOneChoose:false,
        onlyOneChoosePoints:false,
        duplicate:false,
        subchecklists:[]
    };

    if(idDefaultChecklist !== null){
        let index=defaultChecklistArray.findIndex((item)=>{
            if(item.id===idDefaultChecklist){
                return true;
            }
        });

        if(index != -1){
            let subchecklists=[...defaultChecklistArray[index].subchecklists];
            subchecklists.push(defaultChecklistObject);
            defaultChecklistArray[index].subchecklists=subchecklists;
        }else{
            let defaultChecklistChoose= filterDefaultChecklist(defaultChecklistArray,idDefaultChecklist,{});
            defaultChecklistChoose.subchecklists.push(defaultChecklistObject);
        }
       
    }else{
        defaultChecklistArray.push(defaultChecklistObject);
    }
}

function filterDefaultChecklist(defaultChecklistArray,id,itemObject) {
    let item=itemObject;
    defaultChecklistArray.forEach((itemObject)=>{
        if(itemObject.id===id){
            item=itemObject;
        }else{
            if(itemObject.subchecklists != []){
                item=filterDefaultChecklist(itemObject.subchecklists,id,item);
            }
        }
    })
    
    return item;
}

function filterDefaultChecklistNumber(defaultChecklistArray,id,numberDefaultChecklist=0) {
    let numberDefaultChecklistTotal=numberDefaultChecklist;

    defaultChecklistArray.forEach((itemObject)=>{
        if(itemObject.id!==id){
            numberDefaultChecklistTotal++;
        }
        
        if(itemObject.subchecklists.length>0){
            numberDefaultChecklistTotal=filterDefaultChecklistNumber(itemObject.subchecklists,id,numberDefaultChecklistTotal);
        }
    });

    return numberDefaultChecklistTotal;
}

function filterDefaultChecklistToDelete(defaultChecklistArray,id,itemObject) {
    let item=itemObject;
    defaultChecklistArray.forEach((itemObject,index,object)=>{
        if(itemObject.id===id){
            object.splice(index, 1);
        }else{
            if(itemObject.subchecklists != []){
                item=filterDefaultChecklistToDelete(itemObject.subchecklists,id,item);
            }
        }
    })
    
    return item;
}


function filterDefaultChecklistToPoints(defaultChecklistArray,id,itemObjectArray) {
    let itemArray=itemObjectArray;
    
    defaultChecklistArray.forEach((itemObject)=>{
        if(itemObject.idDefaultChecklist===id){
            itemArray.push(itemObject);
        }else{
            if(itemObject.subchecklists != []){
                itemArray=filterDefaultChecklistToPoints(itemObject.subchecklists,id,itemArray);
            }
        }
    })
    
    return itemArray;
}


/*----------------------------------------------EVENTOS DAS CHECKLISTS-----------------------------------------*/


var allOptions=[];
var pointsModal=0;
var onlyOneChoosePoints=false;
var onlyOneChoose=false;

function openModalMultipleChoose(points,id) {
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").innerHTML="Adicione as opções (multiplas escolhas)"
    +" Pontuação Checklist "+parseFloat(points).toFixed(2);
    
    let only_one_choose_points_input=ONE_ELEMENT('#only_one_choose_points').cloneNode(true);
    only_one_choose_points_input.style.display='block';
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").append(only_one_choose_points_input);

    let only_one_choose_input=ONE_ELEMENT('#only_one_choose').cloneNode(true);
    only_one_choose_input.style.display='block';
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").append(only_one_choose_input);

    pointsModal=points;
    let modalHeader=ONE_ELEMENT('#modalActions .modal-error-header');
    modalHeader.style.display="none";
    
    removeEventsModal();
    removeInputDanger();

    ONE_ELEMENT('#btnAddModal').style.display='block';
    ONE_ELEMENT('#btnEditModal').style.display='block';

    allOptions=[];
    let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});

    verifyOnlyOneChoose(defaultChecklist,only_one_choose_input);
    verifyOnlyOneChoosePoints(defaultChecklist,only_one_choose_points_input);
    eventOnlyOneChoose(defaultChecklist); 
    eventOnlyOneChoosePoints(defaultChecklist); 
    
    if(defaultChecklist.options.length>0){
        allOptions=defaultChecklist.options;
    }
    
    fillLayoutOptionsDefaultChecklist(true,onlyOneChoose,onlyOneChoosePoints);
    eventsMultipleChoose();

    ONE_ELEMENT('#btnAddModal').addEventListener('click',()=>{
        modalHeader.style.display="none";
        removeInputDanger();
        addNewsOptionEmpty(true);
        fillLayoutOptionsDefaultChecklist(true,onlyOneChoose,onlyOneChoosePoints);
        eventsMultipleChoose();
    });

    ONE_ELEMENT('#btnEditModal').addEventListener('click',()=>{
        if(verifyEmptyOptionName()){
            errorDoubleChooseOptions(modalHeader);
        
        }else if(verifyEmptyOptionsArray()){
            errorMultipleChooseOptions(modalHeader); 
        
        }else if(verifyPercentageOptions(modalHeader)===false){
            modalHeader.style.display='block';
            modalHeader.querySelector('.modal-error-content').innerHTML="Porcentagem das opções estão incorretas!!"
        
        }else{
            removeInputDanger();
            addOptionsMultiple(defaultChecklist); 
            ONE_ELEMENT('#modalActions .close').click();
        }
    });
}

function verifyPercentageOptions() {
    let isOk=true;

    allOptions.forEach(option => {
        if(option.correctPercentage===false){
            isOk=false;
        }
    });

    return isOk;
}

function verifyOnlyOneChoose(defaultChecklist,only_one_choose_input){
    if(defaultChecklist.onlyOneChoose){
        onlyOneChoose=true;
        only_one_choose_input.querySelector('input').checked=true;
    }else{
        onlyOneChoose=false;
        only_one_choose_input.querySelector('input').checked=false;
    }
}

function verifyOnlyOneChoosePoints(defaultChecklist,only_one_choose_points_input){
    if(defaultChecklist.onlyOneChoosePoints){
        onlyOneChoosePoints=true;
        only_one_choose_points_input.querySelector('input').checked=true;
    }else{
        onlyOneChoosePoints=false;
        only_one_choose_points_input.querySelector('input').checked=false;
    }
}

function eventOnlyOneChoose(defaultChecklist) {
    ONE_ELEMENT('#only_one_choose').querySelector('input').addEventListener('change',(e)=>{
        if(e.currentTarget.checked){
            defaultChecklist.onlyOneChoose=true;
            onlyOneChoose=true;
            defaultChecklist.onlyOneChoosePoints=false;
            onlyOneChoosePoints=false;
            ONE_ELEMENT('#only_one_choose_points').querySelector('input').checked=false;
        }else{
            defaultChecklist.onlyOneChoose=false;
            onlyOneChoose=false;
        }

        ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
        allOptions=[];
        if(defaultChecklist.options.length>0){
            defaultChecklist.options=[];
        }
    });
}

function eventOnlyOneChoosePoints(defaultChecklist) {
    ONE_ELEMENT('#only_one_choose_points').querySelector('input').addEventListener('change',(e)=>{
        if(e.currentTarget.checked){
            defaultChecklist.onlyOneChoosePoints=true;
            onlyOneChoosePoints=true;
            defaultChecklist.onlyOneChoose=false;
            onlyOneChoose=false;
            ONE_ELEMENT('#only_one_choose').querySelector('input').checked=false;
        }else{
            defaultChecklist.onlyOneChoosePoints=false;
            onlyOneChoosePoints=false;
        }
        
        ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
        allOptions=[];
        if(defaultChecklist.options.length>0){
            defaultChecklist.options=[];
        }
    });
}

function openModalDoubleChoose(points,id) {
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").innerHTML="Adicione as opções (dupla escolha) "
    +" Pontuação Checklist "+parseFloat(points).toFixed(2);
    pointsModal=points;

    let modalHeader=ONE_ELEMENT('#modalActions .modal-error-header');
    modalHeader.style.display="none";
    
    removeEventsModal();
    removeInputDanger();
    
    allOptions=[];
    let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});
    if(defaultChecklist.options.length>0){
        allOptions=defaultChecklist.options;
      
    }else{
        addNewsOptionEmpty()
    }
    
    fillLayoutOptionsDefaultChecklist();
    eventsDoubleChoose(); 
    ONE_ELEMENT('#btnAddModal').style.display='none';
    ONE_ELEMENT('#btnEditModal').style.display='block';

    ONE_ELEMENT('#btnEditModal').addEventListener('click',()=>{
        if(verifyEmptyOptionName()){
            errorDoubleChooseOptions(modalHeader);
        
        }else if(verifyEmptyOptionsArray()){
            modalHeader.style.display='block';
            modalHeader.querySelector('.alert').innerHTML="Adicione pelo menos uma opção!";
        
        }else{
            removeInputDanger();
            addOption(defaultChecklist); 
            ONE_ELEMENT('#modalActions .close').click();
        }
    });
}

function removeEventsModal() {
    let btnAdd=ONE_ELEMENT('#btnAddModal').cloneNode(true);
    let btnEdit=ONE_ELEMENT('#btnEditModal').cloneNode(true);
    ONE_ELEMENT('#modalActions').querySelector(".modal-footer").innerHTML="";
    ONE_ELEMENT('#modalActions').querySelector(".modal-footer").append(btnAdd);
    ONE_ELEMENT('#modalActions').querySelector(".modal-footer").append(btnEdit);
}


function verifyEmptyOptionName() {
    let isEmptyInput=false;
    
    allOptions.forEach((option)=>{
        if(option.nameOption===""){
            isEmptyInput=true;
            idOption=option.id;
        }
    });

    return isEmptyInput;
}

function verifyEmptyOptionsArray() {
    if(allOptions.length===0){
        return true;
    }else{
        return false;
    }
}

function errorDoubleChooseOptions(modalHeader) {
    modalHeader.style.display='block';
    modalHeader.querySelector('.modal-error-content').innerHTML="Os nomes das opções não podem estar vazias!"
    
    let inputs=[...ALL_ELEMENTS('.optionsDefaultChecklist .optionName')];
    inputs.forEach((input)=>{
        if(input.value===""){
            input.classList.add('input-danger');
        }
    })
}

function errorMultipleChooseOptions(modalHeader) {
    modalHeader.style.display='block';
    modalHeader.querySelector('.modal-error-content').innerHTML="Adicione pelo menos uma opção!";
}

function removeInputDanger() {
    let inputs=[...ALL_ELEMENTS('.optionsDefaultChecklist .optionName')];
    inputs.forEach((input)=>{
        if(input.value===""){
            input.classList.remove('input-danger');
        }
    })
}

function addOptionsMultiple(defaultChecklist) {
    defaultChecklist.options=[];
    allOptions.forEach((option)=>{
        defaultChecklist.options.push(option);
    });
}

function addOption(defaultChecklist) {
    if(defaultChecklist.options.length != 2){
        allOptions.forEach((option)=>{
            defaultChecklist.options.push(option);
        });
    }
}

function addNewsOptionEmpty(multiple=false) {
    if(multiple===false){
        for (let index = 0; index < 2; index++) {
            let option={
                id:index,
                nameOption:'',
                pointsValue:'',
                percentage:50,
                selected:false
            };

            if(index===0){
                option.pointsValue=pointsModal;
                option.selected=true;
            }else{
                option.pointsValue=0;
                option.selected=false;
            }
    
            allOptions.push(option);
        }
     }else{
        idIndentOption++;
        let option={
            id:idIndentOption,
            nameOption:'',
            pointsValue:'',
            percentage:50,
            correctPercentage:true,
            selected:false
        };
        allOptions.push(option);
     }
}

function fillLayoutOptionsDefaultChecklist(multipleChoose=false,only_one_choose=false,only_one_choose_points=false){
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    
    allOptions.forEach((option)=>{
        let optionsDefaultChecklistClone=optionsDefaultChecklist.cloneNode(true);
        optionsDefaultChecklistClone.querySelectorAll('input')[0].value=option.nameOption;
        optionsDefaultChecklistClone.querySelectorAll('input')[2].disabled=true;
        optionsDefaultChecklistClone.style.display='flex';
        optionsDefaultChecklistClone.setAttribute('idOption',option.id);

        if(option.selected){
            optionsDefaultChecklistClone.querySelectorAll('input')[2].value=option.pointsValue.toFixed(2);
            optionsDefaultChecklistClone.querySelector('.btnChoose').classList.remove('btnDisabled');
        }else{
            optionsDefaultChecklistClone.querySelector('.btnChoose').classList.add('btnDisabled');
        }

        if(multipleChoose){
            optionsDefaultChecklistClone.querySelectorAll('.defaultChecklist__slot')[1].style.display="block";
            optionsDefaultChecklistClone.querySelector('.btnDeleteChoose').style.display="block";
            optionsDefaultChecklistClone.querySelector('.btnChoose').style.display="none";

            if(only_one_choose===false && only_one_choose_points===false){
                optionsDefaultChecklistClone.querySelectorAll('input')[2].value=calcPercentageEquals()[0].toFixed(2); 
                optionsDefaultChecklistClone.querySelectorAll('input')[1].value=calcPercentageEquals()[1].toFixed(2); 
                option.pointsValue=calcPercentageEquals()[0];
                option.percentage=calcPercentageEquals()[1];
            }else{
                optionsDefaultChecklistClone.querySelectorAll('input')[2].value=pointsModal.toFixed(2); 
                optionsDefaultChecklistClone.querySelectorAll('input')[1].
                    closest('.defaultChecklist__slot').style.display='none'; 
                option.pointsValue=pointsModal;
                option.percentage=calcPercentageEquals()[1];
            }
          
        }else{
            optionsDefaultChecklistClone.querySelectorAll('.defaultChecklist__slot')[1].style.display="none";
            optionsDefaultChecklistClone.querySelector('.btnChoose').style.display="block";
            optionsDefaultChecklistClone.querySelector('.btnDeleteChoose').style.display="none";
        }

        optionsDefaultChecklistClone.setAttribute('id',`optionDefaultChecklist${option.id}`);
        ONE_ELEMENT('#modalActions').querySelector(".modal-body").append(optionsDefaultChecklistClone);
    })
}

function eventsDoubleChoose() {
    [...ALL_ELEMENTS('.optionsDefaultChecklist')].forEach((element)=>{
        uniqueEventsBtnChoose(element);
        uniqueEventOptionName(element);
    })
}

function uniqueEventsBtnChoose(element) {
    element.querySelector('.btnChoose').addEventListener('click',(e)=>{
        clearSelected(allOptions);

        let id=parseInt(element.getAttribute('idOption'));
        let index=allOptions.findIndex((item)=>{
            if(item.id===id){
                return true;
            }
        });

        allOptions[index].selected=true;
        allOptions[index].pointsValue=pointsModal;

        ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
        
        fillLayoutOptionsDefaultChecklist();
        eventsDoubleChoose()
    });
}

function eventsMultipleChoose() {
    [...ALL_ELEMENTS('.optionsDefaultChecklist')].forEach((element)=>{
        uniqueEventDeleteOption(element); 
        uniqueEventOptionName(element);
        uniqueEventInputPercentage(element);
    })
}

function uniqueEventDeleteOption(element) {
    element.querySelector('.btnDeleteChoose').addEventListener('click',(e)=>{
        let id=parseInt(element.getAttribute('idOption'));
        deleteOption(id); 
        ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
        fillLayoutOptionsDefaultChecklist(true,onlyOneChoose);
        eventsMultipleChoose();
    });
}

function deleteOption(id) {
    let index=allOptions.findIndex((option)=>{
        if(option.id===id){
            return true;
        }
    });
    
    allOptions.splice(index,1);
}

function uniqueEventOptionName(element) {
    element.querySelectorAll('input')[0].addEventListener('input',(e)=>{
        let id=parseInt(element.getAttribute('idOption'));
        let index=allOptions.findIndex((item)=>{
            if(item.id===id){
                return true;
            }
        });

        allOptions[index].nameOption=e.currentTarget.value;
    });

    element.querySelectorAll('input')[0].addEventListener('focus',(e)=>{
        e.currentTarget.classList.remove('input-danger')
    })
}

function uniqueEventInputPercentage(element) {
    element.querySelectorAll('input')[1].addEventListener('input',(e)=>{
        let id=parseInt(element.getAttribute('idOption'));
        let index=allOptions.findIndex((item)=>{
            if(item.id===id){
                return true;
            }
        });

        allOptions[index].percentage;
        calcNewValuePercentage(e,allOptions[index]);
    });
}

function calcNewValuePercentage(e,optionsDefaultChecklist) {
    let value=parseFloat(e.currentTarget.value);
    optionsDefaultChecklist.percentage=value;

    let totalPoints=pointsModal;

    let newPoints=(value/100)*totalPoints;
    optionsDefaultChecklist.pointsValue=newPoints;
    
    let optionsDefaultChecklistElement=ONE_ELEMENT(`#optionDefaultChecklist${optionsDefaultChecklist.id}`);
    optionsDefaultChecklistElement.querySelectorAll('input')[2].value=newPoints.toFixed(2);

    verifyCorrectPercentageOptions();
}

function calcPercentageEquals() {
    let numberOptions=allOptions.length;
    let pointsValue=pointsModal/numberOptions;
    let percentage= (pointsValue/pointsModal)*100;
    
    return [pointsValue,percentage];
}

function verifyCorrectPercentageOptions() {
    let totalPoint=0;
    allOptions.forEach(option => {
        totalPoint+=parseFloat(option.pointsValue);
    });


    if(totalPoint != pointsModal){
        allOptions.forEach(option => {
            option.correctPercentage=false;
        })
       
    }else{
        allOptions.forEach(option => {
            option.correctPercentage=true;
        })
    }
    
    allOptions.forEach(item =>{
        if(item.correctPercentage===false){
            let defaultChecklistElement=ONE_ELEMENT(`#optionDefaultChecklist${item.id}`);
            defaultChecklistElement.querySelectorAll('input')[1].classList.add('input-danger');
        }else{
            let defaultChecklistElement=ONE_ELEMENT(`#optionDefaultChecklist${item.id}`);
            defaultChecklistElement.querySelectorAll('input')[1].classList.remove('input-danger');
        }
    })
}


ONE_ELEMENT('#btnSave').addEventListener('click',()=>{
    let alertHeader=ONE_ELEMENT('.alert-header');
    alertHeader.classList.add('d-none');

    if(allValidations(defaultChecklistArray)){
        ONE_ELEMENT('#default_checklist_json').value=JSON.stringify(defaultChecklistArray);
        let namesChecklists=[];
        defaultChecklistArray.forEach((item)=>{
            namesChecklists.push(item.name);
        })
        
        ONE_ELEMENT('#checklist_names').value=namesChecklists.join(',');
        ONE_ELEMENT('#lastIdIncrement').value=idIncrement;
        ONE_ELEMENT('#lastIdIncrementOption').value=idIndentOption;
        ONE_ELEMENT('#formChecklistsJson').submit();
    };
});

ONE_ELEMENT('#btnFinish').addEventListener('click',()=>{
    let alertHeader=ONE_ELEMENT('.alert-header');
    alertHeader.classList.add('d-none');
    if(allValidations(defaultChecklistArray)){
        ONE_ELEMENT('#default_checklist_json_oficial').value=JSON.stringify(defaultChecklistArray);
        ONE_ELEMENT('#allChecklists').value=JSON.stringify(defaultChecklistArray);
        ONE_ELEMENT('#lastIdIncrementOficial').value=idIncrement;
        ONE_ELEMENT('#lastIdIncrementOptionOficial').value=idIndentOption;
        ONE_ELEMENT('#formChecklists').submit();
    };
});


const ERROR_EMPTY_INPUTS=1;
const ERROR_SELECT_VALUE=2;
const ERROR_PERCENTAGE=3;
const ERROR_SUBCHECKLIST_FATHER=4;
const ERROR_EMPTY_DOUBLE_OPTIONS=5;
const ERROR_EMPTY_OPTIONS=6;
const ERROR_OPTIONS_PERCETAGE=7;
const ERROR_GROUPING=8;

//erro numero 5 só pode ser causa se alguem bagunçar o front pelo inspecionar
/*erro numero 7 caso o tipo de checklist seja o dupla escolha só pode 
    ser causado se alguém bagunçar o front pelo inspecionar*/ 

function allValidationsLayout(item,errorNumber) {

    let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${item.id}`);
    let errorsDescription=[
        '',
        'Há campos obrigatórios das checklist que não foram preenchidos!',
        'Há checklists que não foram definidas seu tipo!',
        'Há checklists que suas pontuações estão desiguais!',
        'Há checklists principais que precisam das subchecklists!',
        'Há checklists do tipo (dupla escolha) sem opções!',
        'Há checklists do tipo (multiplas escolhas) sem opções!',
        'Há checklists do tipo (multiplas escolhas) com a porcentagem incorreta!',
        'Há checklists do tipo (agrupamento) que precisam ter pelo menos uma subchecklist!'
    ];

    if(errorNumber === ERROR_EMPTY_INPUTS){
        let inputs=defaultChecklistElement.querySelectorAll('input');
        
        if(inputs[0].value===""){
            inputs[0].classList.add('input-danger');
        }
        
        if(inputs[1].value==="" && item.idDefaultChecklist!==null){
            inputs[1].classList.add('input-danger');
        }
        
        if(inputs[2].value===""){
            inputs[2].classList.add('input-danger');
        }
    }

    if(errorNumber===ERROR_SELECT_VALUE){
        defaultChecklistElement.querySelector('select').classList.add('input-danger');
    }

    if(errorNumber===ERROR_SUBCHECKLIST_FATHER){
        defaultChecklistElement.classList.add('input-danger');
    }

    if(errorNumber===ERROR_EMPTY_DOUBLE_OPTIONS || errorNumber===ERROR_EMPTY_OPTIONS 
        || errorNumber===ERROR_OPTIONS_PERCETAGE){
        
        defaultChecklistElement.querySelector('.btnAddOptions').classList.add('input-danger');
    }

    if(errorNumber===ERROR_GROUPING){
        defaultChecklistElement.querySelector('.btnAddDefaultChecklist').classList.add('input-danger');
    }

    let alertHeader=ONE_ELEMENT('.alert-header');
    alertHeader.classList.remove('d-none');
    let scrollPosition=alertHeader.offsetTop;
    window.scrollTo(0,scrollPosition);

    alertHeader.querySelector('.alert').innerHTML=errorsDescription[errorNumber];

}

function allValidations(defaultChecklistArray) {
    let itemError="";
    let errorNumber=[];
    let isOk=false;
    let thereIsErrors=0;


    defaultChecklistArray.forEach((item)=>{
        if(item.name==="" || item.percentage==="" ||  item.points===""){
            errorNumber.push(ERROR_EMPTY_INPUTS);
            itemError=item;
        }
        
        if(item.typechecklist === "" && item.idDefaultChecklist !== null){
            errorNumber.push(ERROR_SELECT_VALUE);
            itemError=item;
        }
        
        if(item.correctPercentage===false){
            errorNumber.push(ERROR_PERCENTAGE);
            itemError=item;
        }

        if(item.idDefaultChecklist === null){
            if(item.subchecklists.length===0){
                errorNumber.push(ERROR_SUBCHECKLIST_FATHER);
                itemError=item;
            }
        }

        if(item.typechecklist==="0" || item.typechecklist==="7"){
            if(item.subchecklists.length===0){
                errorNumber.push(ERROR_GROUPING);
                itemError=item;
            }
        }

        if(item.typechecklist==="3"){
            let numberOptions=item.options.length;
            if(numberOptions < 1){
                errorNumber.push(ERROR_EMPTY_OPTIONS);
                itemError=item;
            }

            item.options.forEach((option)=>{
                if(option.correctPercentage===false){
                    errorNumber.push(ERROR_OPTIONS_PERCETAGE);
                    itemError=item;
                }
            })
        }

        if(item.typechecklist==="4"){
            let numberOptions=item.options.length;
            if(numberOptions !=2){
                errorNumber.push(ERROR_EMPTY_DOUBLE_OPTIONS);
                itemError=item;
            }
        }

        if(thereIsErrors===0){
            if(errorNumber.length===0){
                isOk=true;
            }else{
                isOk=false;
                thereIsErrors++;
            }
        }

        if(errorNumber != [] && itemError.id===item.id){
            errorNumber.forEach((error)=>{
                allValidationsLayout(item,error);
            });
            
            errorNumber=[];
        }
        
        if(item.subchecklists.length>0){
            isOk=allValidations(item.subchecklists);
        }
    
    });

    return isOk;
}