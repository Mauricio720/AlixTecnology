var defaultChecklist=ONE_ELEMENT('.defaultChecklist');
let defaultChecklistJson= ONE_ELEMENT('#default_checklist_json').value;
var defaultChecklistArray=defaultChecklistJson!==''?JSON.parse(ONE_ELEMENT('#default_checklist_json').value):[];
var idIncrement=1;
var idIndentOption=1;
var optionsDefaultChecklist=ONE_ELEMENT('.optionsDefaultChecklist');
var checklistSave=false;
var typechecklistModal=""

eventCloneDefaultChecklist();

verifyInProgressDefaultChecklist();

function verifyInProgressDefaultChecklist(){
    if(defaultChecklistJson != ''){
        idIncrement=parseInt(ONE_ELEMENT('#lastIdIncrement').value);
        idIndentOption=parseInt(ONE_ELEMENT('#lastIdIncrementOption').value);
        checklistSave=true;
        ONE_ELEMENT('.checklistContent').innerHTML="";
        showDefaultChecklist(defaultChecklistArray);
        allEventsInAddChecklist(true);
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
    checklistSave=false;
    addDefaultChecklist(); 
    clearContent();
    showDefaultChecklist(defaultChecklistArray);
    allEventsInAddChecklist();
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
      
        if(checklistSave===false){
            setChecklistPoint(item.id);
        }
        
        repeatLoopShowDefaultChecklist(item,checklistSave);
    });
}


function fillInputsAndAttributeDefaultChecklist(defaultChecklistClone,item) {
    defaultChecklistClone.setAttribute('idElement',item.id);
    defaultChecklistClone.setAttribute('id',"defaultCheck"+item.id);
    
    defaultChecklistClone.querySelectorAll('input')[0].value=item.name;
    defaultChecklistClone.querySelectorAll('input')[2].value=parseFloat(item.percentage).toFixed(2); 
    defaultChecklistClone.querySelectorAll('input')[3].value=parseFloat(item.points).toFixed(2);
    defaultChecklistClone.querySelectorAll('input')[4].value=item.observation;
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
        defaultChecklistClone.querySelectorAll('input')[2].disabled=false;
        defaultChecklistClone.querySelectorAll('input')[3].disabled=true;
    }
}

function verifyCorrectPercentageInputDanger(defaultChecklistClone,item) {
    if(item.correctPercentage){
        defaultChecklistClone.querySelectorAll('input')[3].classList.remove('input-danger');
    }else{
        defaultChecklistClone.querySelectorAll('input')[3].classList.add('input-danger');
    }
}

function verifySubchecklists(defaultChecklistClone,item) {
    if(item.subchecklists.length===0 && item.idDefaultChecklist === null){
        defaultChecklistClone.querySelectorAll('input')[3].disabled=false;
    }else{
        if(item.typechecklist === '0' || item.typechecklist === '7'){
            defaultChecklistClone.querySelectorAll('input')[3].disabled=false;
        }else{
            defaultChecklistClone.querySelectorAll('input')[3].disabled=true;
        }
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

function repeatLoopShowDefaultChecklist(item,checklistSave) {
    if(item.subchecklists.length > 0){
        showDefaultChecklist(item.subchecklists,checklistSave);
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

function eventCloneDefaultChecklist(){
    ALL_ELEMENTS('.defaultCheckRadio').forEach((item)=>{
        item.addEventListener('change',(e)=>{
            let defaultCheckInfo=e.currentTarget.previousElementSibling;
            defaultChecklistArray=JSON.parse(defaultCheckInfo.value);
            idIncrement=parseInt(defaultCheckInfo.getAttribute('lastidincrement'));
            idIndentOption=parseInt(defaultCheckInfo.getAttribute('lastidincrementoption'));
            checklistSave=false;
            
            clearContent();
            showDefaultChecklist(defaultChecklistArray);
            allEventsInAddChecklist(true);
            eventsBtnDelete();
            verifyBtnSave();
            showSubchecklistContainerLoop(defaultChecklistArray);
        })
    })
}

function allEventsInAddChecklist(inProgress=false){
    [...ALL_ELEMENTS('.checklistContent .btnAddDefaultChecklist')].forEach((addBtnElement)=>{
        let id=getIdToDefaultChecklist(addBtnElement);
        let elementChecklist=getMainElementHTMLDefaultChecklist(addBtnElement);
        let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});
        
        eventAddChecklist(addBtnElement,id,inProgress);
        uniqueEventInputChecklistName(elementChecklist,defaultChecklist); 
        uniqueEventInputPointingPercentage(elementChecklist,defaultChecklist); 
        uniqueEventPointingNumber(elementChecklist,defaultChecklist);
        if(defaultChecklist.idDefaultChecklist !== null){
            uniqueEventInputPointingAgrouping(elementChecklist,defaultChecklist); 
        }
        uniqueEventObservation(elementChecklist,defaultChecklist); 
        uniqueEventFocusInputDanger(elementChecklist,defaultChecklist); 
        uniqueEventTypeChecklist(elementChecklist,defaultChecklist); 
        uniqueEventBiggerSmaller(elementChecklist,defaultChecklist);
    });
}

function eventAddChecklist(addBtnElement,id,inProgress=false){
    let elementChecklist=getMainElementHTMLDefaultChecklist(addBtnElement);
    let checklistToValidate=getElementByInProgress(inProgress,elementChecklist);
    let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});
    
    addBtnElement.addEventListener('click',()=>{
        if(validationDefaultChecklist(checklistToValidate,defaultChecklist)){
            clearContent();
            addDefaultChecklist(id); 
            setActiveDefaultChecklist(defaultChecklist);
            showDefaultChecklist(defaultChecklistArray);
            allEventsInAddChecklist();
            eventsBtnSeeMore();
            eventsBtnDelete();
            eventsDuplicateChecklist();
            verifyBtnSave();
            eventsBtnAddOptions();
            showSubchecklistContainerLoop(defaultChecklistArray);
            
            if(inProgress===false){
                downScrollNewDefaultChecklist();
                newDefaultChecklistEffect();
            }
            
            typechecklistModal="";
        }
    })
}

function getElementByInProgress(inProgress,elementChecklist){
    return inProgress?elementChecklist:elementChecklist.closest('.defaultChecklist');
}

function getMainElementHTMLDefaultChecklist(element){
    let elementChecklist=element.closest('.defaultChecklist');
    return elementChecklist;
}

function setActiveDefaultChecklist(defaultChecklist){
    defaultChecklist.active=true;
}

function uniqueEventInputChecklistName(elementChecklist,defaultChecklist) {
    elementChecklist.querySelectorAll('input')[0].addEventListener('keyup',(e)=>{
        let value=e.currentTarget.value;
        defaultChecklist.name=value;
    });
}

function uniqueEventInputPointingPercentage(elementChecklist,defaultChecklist) {
    elementChecklist.querySelectorAll('input')[2].addEventListener('input',(e)=>{
        let value=e.currentTarget.value;
        idDefaultChecklistFather=calcPointing(value,defaultChecklist); 
        
        if(value==='0'){
            setNewsPercentageWhenDelete(defaultChecklist);
            changeValuesDefaultChecklist(defaultChecklist);
        }

        verifyCorrectPercentage(idDefaultChecklistFather);

    });
}

function changeValuesDefaultChecklist(defaultChecklist){
    let defaultChecklistFather=filterDefaultChecklist(defaultChecklistArray,defaultChecklist.idDefaultChecklist,{});
    
    defaultChecklistFather.subchecklists.forEach((defaultChecklist)=>{
        let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${defaultChecklist.id}`);
        defaultChecklistElement.querySelectorAll('input')[2].value=defaultChecklist.percentage;
        defaultChecklistElement.querySelectorAll('input')[3].value=defaultChecklist.points;
        
        calcPointAgrouping(defaultChecklist.points,defaultChecklist);
    })
}

function setNewsPercentageWhenDelete(defaultChecklist){
    let defaultChecklistFather=filterDefaultChecklist(defaultChecklistArray,defaultChecklist.idDefaultChecklist,{});
    let totalPoints=defaultChecklistFather.points;
    let points=totalPoints/getNumberSubchecklist(defaultChecklist);

    defaultChecklistFather.subchecklists.forEach((item)=>{
        if(item.percentage > 0){
            item.points=points;
        }
    })
}

function getNumberSubchecklist(defaultChecklist){
    let defaultChecklistFather=filterDefaultChecklist(defaultChecklistArray,defaultChecklist.idDefaultChecklist,{});
    let numberSubchecklist=0;

    defaultChecklistFather.subchecklists.forEach((item)=>{
        if(item.percentage > 0){
            numberSubchecklist++;
        }
    })

    return numberSubchecklist;
}

function uniqueEventInputPointingAgrouping(elementChecklist,defaultChecklist) {
    elementChecklist.querySelectorAll('input')[3].addEventListener('input',(e)=>{
        let value=e.currentTarget.value;
        let valuePercentage=calcPointAgrouping(value,defaultChecklist)
        idDefaultChecklistFather=calcPointing(valuePercentage,defaultChecklist); 
        
        if(valuePercentage===0){
            setNewsPercentageWhenDelete(defaultChecklist);
            changeValuesDefaultChecklist(defaultChecklist);
        }
        verifyCorrectPercentage(idDefaultChecklistFather);
    });
}

function calcPointAgrouping(value,defaultChecklist){
    let valuePoints=parseFloat(value);
    let defaultChecklistFather=filterDefaultChecklist(defaultChecklistArray,defaultChecklist.idDefaultChecklist,{});
    let totalPoints=defaultChecklistFather.points;
    
    let percentage=(valuePoints*100)/totalPoints;
    
    let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${defaultChecklist.id}`);
    defaultChecklistElement.querySelectorAll('input')[2].value=percentage;
    
    return percentage;

}

function calcPointing(value,defaultChecklist) {
    let valuePercentage=parseFloat(value);
    defaultChecklist.percentage=value;

    let defaultChecklistFather=filterDefaultChecklist(defaultChecklistArray,defaultChecklist.idDefaultChecklist,{});
    let totalPoints=defaultChecklistFather.points;

    let newPoints=(valuePercentage/100)*totalPoints;
    defaultChecklist.points=newPoints;
    
    let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${defaultChecklist.id}`);
    defaultChecklistElement.querySelectorAll('input')[3].value=parseFloat(newPoints).toFixed(2);
    
    if(defaultChecklist.subchecklists.length>0){
        let pointsSubchecklist=newPoints/defaultChecklist.subchecklists.length;
        defaultChecklist.subchecklists.forEach((subchecklist)=>{
            updatedSubchecklistPoints(subchecklist.id,pointsSubchecklist) ;
        });
    }

    return defaultChecklistFather.id;
}

function getSubchecklistValues(defaultChecklist){
    let numberChecklist=0;
    
    defaultChecklist.subchecklists.forEach((item)=>{
        if(item.percentage >0){
            numberChecklist++;
        }
    })

    return numberChecklist;
}

function updatedSubchecklistPoints(id,pointsSubchecklist) {
    let defaultChecklistSubchecklist=filterDefaultChecklist(defaultChecklistArray,id,{});
    let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${defaultChecklistSubchecklist.id}`);
    defaultChecklistElement.querySelectorAll('input')[3].value=parseFloat(pointsSubchecklist).toFixed(2);

    if(defaultChecklistSubchecklist.subchecklists.length > 0){
        let newPointsSubchecklist=pointsSubchecklist/defaultChecklistSubchecklist.subchecklists.length;
        defaultChecklistSubchecklist.subchecklists.forEach((subchecklist)=>{
            updatedSubchecklistPoints(subchecklist.id,newPointsSubchecklist); 
        })
    }
}

function uniqueEventPointingNumber(elementChecklist,defaultChecklist) {
    elementChecklist.querySelectorAll('input')[3].addEventListener('input',(e)=>{
        let value=e.currentTarget.value;
        defaultChecklist.points=value;
        defaultChecklist.percentage=100;
        elementChecklist.querySelectorAll('input')[2].value=100;
    });
}

function uniqueEventObservation(elementChecklist,defaultChecklist) {
    elementChecklist.querySelectorAll('input')[4].addEventListener('keyup',(e)=>{
        let value=e.currentTarget.value;
        defaultChecklist.observation=value;
    });
}

function uniqueEventBiggerSmaller(elementChecklist,defaultChecklist){
    elementChecklist.querySelectorAll('input')[1].addEventListener('keyup',(e)=>{
        let value=e.currentTarget.value;
        defaultChecklist.biggerSmaller=value;
    });
}


function uniqueEventFocusInputDanger(elementChecklist) {
    eventFocusInputsDangerValidation(0,elementChecklist);
    eventFocusInputsDangerValidation(3,elementChecklist);
    eventFocusInputsDangerValidation(4,elementChecklist);
}

function eventFocusInputsDangerValidation(index,elementChecklist){
    elementChecklist.querySelectorAll('input')[index].addEventListener('focus',(e)=>{
        let input=e.currentTarget;
        removeToInputsDangerValidation(input,elementChecklist);
    });
}

function removeToInputsDangerValidation(input,elementChecklist){
    input.classList.remove('input-danger');
    elementChecklist.classList.remove('input-danger');
    ONE_ELEMENT('.alert-header').classList.add('d-none');
}

function uniqueEventTypeChecklist(elementChecklist,defaultChecklist) {
    if(elementChecklist.querySelector('select') !== null){
        elementChecklist.querySelector('select').addEventListener('change',(e)=>{
            let value=e.currentTarget.value;
            let selectElement=e.currentTarget;
            
            setDisableInputInEventsSelected(value,elementChecklist);
            setTypeChecklist(value,defaultChecklist);
            clearOptionsToDefaultChecklist(defaultChecklist)
            removeDangerValidationLayout(selectElement);
            verifyTypeChecklist(value,selectElement);
        });
    }
}

function setTypeChecklist(value,defaultChecklist){
    defaultChecklist.typechecklist=value;
}

function clearOptionsToDefaultChecklist(defaultChecklist){
    defaultChecklist.options=[];
}

function removeDangerValidationLayout(selectElement){
    selectElement.classList.remove('input-danger');
}

function verifyTypeChecklist(valueSelect,selectElement){
    if(valueSelect==="0" || valueSelect==="7"){
        changeLayoutBtnsVisibleInEventsAddAndDuplicate(true,selectElement);
    }else{
        changeLayoutBtnsVisibleInEventsAddAndDuplicate(false,selectElement);
    }
    
    if(valueSelect==="3" || valueSelect==="4"){
        changeLayoutBtnsVisibleInEventsAddOptions(true,selectElement);
        selectElement.closest('.defaultChecklist').querySelector('.btnAddOptions').setAttribute('type',valueSelect);
    }else{
        changeLayoutBtnsVisibleInEventsAddOptions(false,selectElement);
    }

    if(valueSelect==='8'){
        selectElement.closest('.defaultChecklist').querySelectorAll('.defaultChecklist__slot')[1].style.display='flex';
    }else{
        selectElement.closest('.defaultChecklist').querySelectorAll('.defaultChecklist__slot')[1].style.display='none';
    }
}

function setDisableInputInEventsSelected(value,elementChecklist){
    if(value==='0' || value==='7'){
        elementChecklist.querySelectorAll('input')[3].disabled=false;
    }else{
        elementChecklist.querySelectorAll('input')[3].disabled=true;
    }
}

function changeLayoutBtnsVisibleInEventsAddAndDuplicate(visible,selectElement){
    if(visible){
        selectElement.closest('.defaultChecklist').querySelector('.btnDuplicate').classList.remove('d-none');
        selectElement.closest('.defaultChecklist').querySelector('.btnAddDefaultChecklist').style.display='block';
    }else{
        selectElement.closest('.defaultChecklist').querySelector('.btnDuplicate').classList.add('d-none');
        selectElement.closest('.defaultChecklist').querySelector('.btnAddDefaultChecklist').style.display='none';
    }
}

function changeLayoutBtnsVisibleInEventsAddOptions(visible,selectElement){
    if(visible){
        selectElement.closest('.defaultChecklist').querySelector('.btnAddOptions').style.display="block";
    }else{
        selectElement.closest('.defaultChecklist').querySelector('.btnAddOptions').style.display="none";
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
            let id=getIdToDefaultChecklist(element);
            let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});
            let btnDuplicate=e.currentTarget;
            verifyDuplicate(defaultChecklist,btnDuplicate);
        })
    });
}

function verifyDuplicate(defaultChecklist,btnDuplicate){
    defaultChecklist.duplicate=!defaultChecklist.duplicate;
    if(defaultChecklist.duplicate){
        btnDuplicate.style.backgroundColor='#00b800';
    }else{
        btnDuplicate.style.backgroundColor='transparent';
    }
}

function eventsBtnDelete() {
    [...ALL_ELEMENTS('.checklistContent .btnDelete')].forEach((element)=>{
        element.addEventListener('click',()=>{
            let id=getIdToDefaultChecklist(element);
            let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});
            let defaultChecklistFather=filterDefaultChecklist(defaultChecklistArray,defaultChecklist.idDefaultChecklist,{});
            allEventsAndFunctionsToDelete(id,defaultChecklistFather);
        });
    });
}

function allEventsAndFunctionsToDelete(id,defaultChecklistFather){
    filterDefaultChecklistToDelete(defaultChecklistArray,id,{});
    clearContent();
    setChecklistPoint(defaultChecklistFather.id);
    showDefaultChecklist(defaultChecklistArray);
    allEventsInAddChecklist();
    eventsBtnSeeMore();
    eventsBtnDelete();
    eventsBtnAddOptions(); 
    eventsDuplicateChecklist();
    verifyBtnSave();
    showSubchecklistContainerLoop(defaultChecklistArray);
}

function clearContent() {
    ONE_ELEMENT('.checklistContent').innerHTML="";
}

function eventsBtnAddOptions() {
    [...ALL_ELEMENTS('.checklistContent .btnAddOptions')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            e.currentTarget.classList.remove('input-danger');
            let id=getIdToDefaultChecklist(element);
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

function getIdToDefaultChecklist(element){
    let id=parseInt(element.closest('.defaultChecklist').getAttribute('idElement'));
    return id;
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
            defaultChecklistElement.querySelectorAll('input')[3].classList.add('input-danger');
        }else{
            let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${item.id}`);
            defaultChecklistElement.querySelectorAll('input')[3].classList.remove('input-danger');
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

    removeValidationsLayout(defaultChecklistElement,inputsChecklist,selectChecklist);
    
    isOK=addLayoutDangerValidationInputs(0,inputsChecklist,selectChecklist);
    isOK=addLayoutDangerValidationInputs(3,inputsChecklist,selectChecklist);
    
    return isOK;
}

function removeValidationsLayout(defaultChecklistElement,inputsChecklist,selectChecklist){
    ONE_ELEMENT('.alert-header').classList.add('d-none');
    defaultChecklistElement.classList.remove('input-danger');
    inputsChecklist[0].classList.remove('input-danger');
    inputsChecklist[3].classList.remove('input-danger');

    if(selectChecklist !== null){
        selectChecklist.classList.remove('input-danger');
    }
}

function addLayoutDangerValidationInputs(index,inputsChecklist,selectChecklist){
    let isOK=true;
    
    if(inputsChecklist[index].value==""){
        inputsChecklist[index].classList.add('input-danger');
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
    idIncrement=idIncrement+1;
    let id=idIncrement;
    verifyIdDefaultChecklist(idDefaultChecklist,newDefaultChecklistObject(id,idDefaultChecklist));
}

function newDefaultChecklistObject(id,idDefaultChecklist){
    let defaultChecklistObject={
        id,
        idDefaultChecklist,
        name:"",
        biggerSmaller:'',
        typechecklist:"",
        percentage:"",
        active:false,
        correctPercentage:true,
        points:"",
        observation:'',
        options:[],
        onlyOneChoose:false,
        onlyOneChoosePoints:false,
        onlyDistinctPercentage:false,
        duplicate:false,
        subchecklists:[]
    };

    return defaultChecklistObject;
}

function verifyIdDefaultChecklist(idDefaultChecklist,defaultChecklistObject){
    if(idDefaultChecklist !== null){
        let index=findIndexInDefaultChecklist(idDefaultChecklist);
        addSubchecklists(index,defaultChecklistObject,idDefaultChecklist);
    }else{
        defaultChecklistArray.push(defaultChecklistObject);
    }
}

function findIndexInDefaultChecklist(idDefaultChecklist){
    let index=defaultChecklistArray.findIndex((item)=>{
        if(item.id===idDefaultChecklist){
            return true;
        }
    });

    return index;
}

function addSubchecklists(index,defaultChecklistObject,idDefaultChecklist){
    if(index != -1){
        let subchecklists=[...defaultChecklistArray[index].subchecklists];
        subchecklists.push(defaultChecklistObject);
        defaultChecklistArray[index].subchecklists=subchecklists;
    }else{
        let defaultChecklistChoose=filterDefaultChecklist(defaultChecklistArray,idDefaultChecklist,{});
        defaultChecklistChoose.subchecklists.push(defaultChecklistObject);
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
var onlyOneDistinctPercentage=false;
var onlyOneChoosePointsInputElement=null;
var onlyOneChooseInputElement=null;
var onlyDistinctInputElement=null;
var justViewModal=false;

function openModalMultipleChoose(points,id) {
    pointsModal=points;

    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    modalLayoutOptionsMultiple(points);
    let modalHeader=modalLayoutRemoveHeader();
    
    removeEventsModal();
    removeInputDanger();
    modalBtnsBlock();
    
    allOptions=[];
    let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});
    
    verifyOnlyOneChoose(defaultChecklist);
    verifyOnlyOneChoosePoints(defaultChecklist);
    verifyOneDistinctPercentage(defaultChecklist);
    eventOnlyOneChoose(defaultChecklist); 
    eventOnlyOneChoosePoints(defaultChecklist); 
    eventDistinctPercentage(defaultChecklist);
    verifyOptionsChecklist(defaultChecklist);
    fillLayoutOptionsDefaultChecklist(true);
    
    eventsMultipleChoose();
    eventModalAddBtn(modalHeader);
    eventModalEditBtn(modalHeader,defaultChecklist);
   
}

function modalLayoutOptionsMultiple(points){
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").innerHTML="Adicione as opções (multiplas escolhas)"
    +" Pontuação Checklist "+parseFloat(points).toFixed(2);

    onlyOneChoosePointsInputElement=ONE_ELEMENT('#only_one_choose_points').cloneNode(true);
    onlyOneChoosePointsInputElement.style.display='block';
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").append(onlyOneChoosePointsInputElement);

    onlyOneChooseInputElement=ONE_ELEMENT('#only_one_choose').cloneNode(true);
    onlyOneChooseInputElement.style.display='block';
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").append(onlyOneChooseInputElement);

    onlyDistinctInputElement=ONE_ELEMENT('#only_one_distinct_percentage').cloneNode(true);
    onlyDistinctInputElement.style.display='block';
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").append(onlyDistinctInputElement);
}

function modalBtnsBlock(){
    ONE_ELEMENT('#btnAddModal').style.display='block';
    ONE_ELEMENT('#btnEditModal').style.display='block';
}

function modalLayoutRemoveHeader(){
    let modalHeader=ONE_ELEMENT('#modalActions .modal-error-header');
    modalHeader.style.display="none";
    
    return modalHeader;
}

function verifyOptionsChecklist(defaultChecklist){
    if(defaultChecklist.options.length>0){
        allOptions=JSON.parse(JSON.stringify(defaultChecklist.options));
        justViewModal=true;
    }
    
}

function eventModalAddBtn(modalHeader){
    ONE_ELEMENT('#btnAddModal').addEventListener('click',()=>{
        modalHeader.style.display="none";
        justViewModal=false;
        removeInputDanger();
        addNewsOptionEmpty(true);
        fillLayoutOptionsDefaultChecklist(true);
        eventsMultipleChoose();
    });
}

function eventModalEditBtn(modalHeader,defaultChecklist){
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

function verifyOnlyOneChoose(defaultChecklist){
    if(defaultChecklist.onlyOneChoose){
        onlyOneChoose=true;
        onlyOneChooseInputElement.querySelector('input').checked=true;
    }else{
        onlyOneChoose=false;
        onlyOneChooseInputElement.querySelector('input').checked=false;
    }
}

function verifyOnlyOneChoosePoints(defaultChecklist){
    if(defaultChecklist.onlyOneChoosePoints){
        onlyOneChoosePoints=true;
        onlyOneChoosePointsInputElement.querySelector('input').checked=true;
    }else{
        onlyOneChoosePoints=false;
        onlyOneChoosePointsInputElement.querySelector('input').checked=false;
    }
}

function verifyOneDistinctPercentage(defaultChecklist){
    if(defaultChecklist.onlyDistinctPercentage){
        onlyOneDistinctPercentage=true;
        onlyDistinctInputElement.querySelector('input').checked=true;
    }else{
        onlyOneDistinctPercentage=false;
        onlyDistinctInputElement.querySelector('input').checked=false;
    }
}

function eventOnlyOneChoose(defaultChecklist) {
    ONE_ELEMENT('#only_one_choose').querySelector('input').addEventListener('change',(e)=>{
        if(e.currentTarget.checked){
            onlyOneChooseChecked(defaultChecklist)
        }else{
            onlyOneChooseNotChecked(defaultChecklist);
        }
    
        clearModalContent();
        clearOptions(defaultChecklist);
    });
}

function onlyOneChooseChecked(defaultChecklist){
    defaultChecklist.onlyOneChoose=true;
    onlyOneChoose=true;

    defaultChecklist.onlyOneChoosePoints=false;
    onlyOneChoosePoints=false;
    
    defaultChecklist.onlyDistinctPercentage=false;
    onlyOneDistinctPercentage=false;
    
    ONE_ELEMENT('#only_one_choose_points').querySelector('input').checked=false;
    ONE_ELEMENT('#only_one_distinct_percentage').querySelector('input').checked=false;
}

function onlyOneChooseNotChecked(defaultChecklist){
    defaultChecklist.onlyOneChoose=false;
    onlyOneChoose=false;
}

function clearOptions(defaultChecklist){
    allOptions=[];
    
    if(defaultChecklist.options.length>0){
        defaultChecklist.options=[];
    }
}

function eventOnlyOneChoosePoints(defaultChecklist) {
    ONE_ELEMENT('#only_one_choose_points').querySelector('input').addEventListener('change',(e)=>{
        if(e.currentTarget.checked){
            onlyOneChoosePointsChecked(defaultChecklist);
        }else{
            onlyOneChoosePointsNotChecked(defaultChecklist);
        }
        
        clearModalContent();
        clearOptions(defaultChecklist);
    });
}

function onlyOneChoosePointsChecked(defaultChecklist){
    defaultChecklist.onlyOneChoosePoints=true;
    onlyOneChoosePoints=true;

    defaultChecklist.onlyOneChoose=false;
    onlyOneChoose=false;
    
    defaultChecklist.onlyDistinctPercentage=false;
    onlyOneDistinctPercentage=false;

    ONE_ELEMENT('#only_one_choose').querySelector('input').checked=false;
    ONE_ELEMENT('#only_one_distinct_percentage').querySelector('input').checked=false;
}

function onlyOneChoosePointsNotChecked(defaultChecklist){
    defaultChecklist.onlyOneChoosePoints=false;
    onlyOneChoosePoints=false;
}

function clearOptions(defaultChecklist){
    allOptions=[];
    if(defaultChecklist.options.length>0){
        defaultChecklist.options=[];
    }
}

function eventDistinctPercentage(defaultChecklist){
    ONE_ELEMENT('#only_one_distinct_percentage').querySelector('input').addEventListener('change',(e)=>{
        if(e.currentTarget.checked){
            onlyOneDistinctPercentageCheck(defaultChecklist);
        }else{
            onlyOneDistinctPercentageNotCheck(defaultChecklist);
        }
    
        clearModalContent();
        clearOptions(defaultChecklist);
    });
}

function onlyOneDistinctPercentageCheck(defaultChecklist) {
    defaultChecklist.onlyDistinctPercentage=true;
    onlyOneDistinctPercentage=true;
    
    defaultChecklist.onlyOneChoosePoints=false;
    onlyOneChoosePoints=false;
    
    defaultChecklist.onlyOneChoose=false;
    onlyOneChoose=false;

    ONE_ELEMENT('#only_one_choose').querySelector('input').checked=false;
    ONE_ELEMENT('#only_one_choose_points').querySelector('input').checked=false;
}

function onlyOneDistinctPercentageNotCheck(defaultChecklist) {
    defaultChecklist.distinctPercentage=false;
    onlyOneDistinctPercentage=false;
}

var modalHeader=null;
function openModalDoubleChoose(points,id) {
    clearModalContent();
    modalLayoutOptionsDoubleChoose(points);
    
    removeEventsModal();
    removeInputDanger();
    
    allOptions=[];
    verifyDefaultChecklistOptions(id);
    
    fillLayoutOptionsDefaultChecklist();
    eventsDoubleChoose(); 
    modalBtnsDoubleChooseBlock();
}

function modalLayoutOptionsDoubleChoose(points){
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").innerHTML="Adicione as opções (dupla escolha) "
    +" Pontuação Checklist "+parseFloat(points).toFixed(2);
    pointsModal=points;

    modalHeader=ONE_ELEMENT('#modalActions .modal-error-header');
    modalHeader.style.display="none";
}

function modalBtnsDoubleChooseBlock(){
    ONE_ELEMENT('#btnAddModal').style.display='none';
    ONE_ELEMENT('#btnEditModal').style.display='block';
}

function verifyDefaultChecklistOptions(id){
    let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});

    if(defaultChecklist.options.length>0){
        allOptions=defaultChecklist.options;
    }else{
        addNewsOptionEmpty();
    }
}

function eventModalBtnEdit(){
    ONE_ELEMENT('#btnEditModal').addEventListener('click',()=>{
        if(verifyEmptyOptionName()){
            errorDoubleChooseOptions(modalHeader);
        }else if(verifyEmptyOptionsArray()){
            showErrorModalDoubleChoose();
        }else{
            removeInputDanger();
            addOption(defaultChecklist); 
            ONE_ELEMENT('#modalActions .close').click();
        }
    });
}

function showErrorModalDoubleChoose(){
    modalHeader.style.display='block';
    modalHeader.querySelector('.alert').innerHTML="Adicione pelo menos uma opção!";
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
        addOptionsDoubleChoose();
    }else{
        addOptionsMultipleOptions();
    }
}

function addOptionsDoubleChoose(){
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
}

function addOptionsMultipleOptions(){
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

function fillLayoutOptionsDefaultChecklist(multipleChoose=false){
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    
    allOptions.forEach((option)=>{
        let optionsDefaultChecklistClone=optionsDefaultChecklist.cloneNode(true);

        fillLayoutOptionClone(optionsDefaultChecklistClone,option);
        fillLayoutOptionSelected(optionsDefaultChecklistClone,option);
        
        if(multipleChoose){
            showBtnsOptionsInMultipleModal(optionsDefaultChecklistClone);
            verifyChecksInputsSelectedInMultipleOptionsModal(optionsDefaultChecklistClone,option);
        }else{
            showBtnsOptionsInDoubleChooseModal(optionsDefaultChecklistClone);
        }

        optionsDefaultChecklistClone.setAttribute('id',`optionDefaultChecklist${option.id}`);
        ONE_ELEMENT('#modalActions').querySelector(".modal-body").append(optionsDefaultChecklistClone);
    })
}

function fillLayoutOptionClone(optionsDefaultChecklistClone,option){
    optionsDefaultChecklistClone.querySelectorAll('input')[0].value=option.nameOption;
    optionsDefaultChecklistClone.querySelectorAll('input')[1].value=option.percentage;
    optionsDefaultChecklistClone.querySelectorAll('input')[2].value=option.pointsValue;
    optionsDefaultChecklistClone.querySelectorAll('input')[2].disabled=true;
    optionsDefaultChecklistClone.style.display='flex';
    optionsDefaultChecklistClone.setAttribute('idOption',option.id);
}

function fillLayoutOptionSelected(optionsDefaultChecklistClone,option){
    if(option.selected){
        optionsDefaultChecklistClone.querySelectorAll('input')[2].value=option.pointsValue.toFixed(2);
        optionsDefaultChecklistClone.querySelector('.btnChoose').classList.remove('btnDisabled');
    }else{
        optionsDefaultChecklistClone.querySelector('.btnChoose').classList.add('btnDisabled');
    }
}

function showBtnsOptionsInMultipleModal(optionsDefaultChecklistClone){
    optionsDefaultChecklistClone.querySelectorAll('.defaultChecklist__slot')[1].style.display="block";
    optionsDefaultChecklistClone.querySelector('.btnDeleteChoose').style.display="block";
    optionsDefaultChecklistClone.querySelector('.btnChoose').style.display="none";
}

function showBtnsOptionsInDoubleChooseModal(optionsDefaultChecklistClone){
    optionsDefaultChecklistClone.querySelectorAll('.defaultChecklist__slot')[1].style.display="none";
    optionsDefaultChecklistClone.querySelector('.btnChoose').style.display="block";
    optionsDefaultChecklistClone.querySelector('.btnDeleteChoose').style.display="none";
}

function setValuesCalcPercentageOptions(optionsDefaultChecklistClone,option){
    optionsDefaultChecklistClone.querySelectorAll('input')[2].value=calcPercentageEquals()[0].toFixed(2); 
    optionsDefaultChecklistClone.querySelectorAll('input')[1].value=calcPercentageEquals()[1].toFixed(2); 
    option.pointsValue=calcPercentageEquals()[0];
    option.percentage=calcPercentageEquals()[1];
}

function verifyChecksInputsSelectedInMultipleOptionsModal(optionsDefaultChecklistClone,option){
    if(justViewModal===false){
        if(onlyOneChoose===false && onlyOneChoosePoints===false){
            setValuesCalcPercentageOptions(optionsDefaultChecklistClone,option)
        }else{
            setValuesInOptions(optionsDefaultChecklistClone,option)
        }
    }
}

function setValuesInOptions(optionsDefaultChecklistClone,option){
    optionsDefaultChecklistClone.querySelectorAll('input')[2].value=pointsModal.toFixed(2); 
    optionsDefaultChecklistClone.querySelectorAll('input')[1].
        closest('.defaultChecklist__slot').style.display='none'; 
    option.pointsValue=pointsModal;
    option.percentage=calcPercentageEquals()[1];
}

function eventsDoubleChoose() {
    [...ALL_ELEMENTS('.optionsDefaultChecklist')].forEach((element)=>{
        uniqueEventsBtnChoose(element);
        uniqueEventOptionName(element);
    })
}

function uniqueEventsBtnChoose(element) {
    element.querySelector('.btnChoose').addEventListener('click',()=>{
        clearSelected(allOptions);

        let id=parseInt(element.getAttribute('idOption'));
        let index=findIndexOption(id);

        setOptionSelectedAndValue(index);
        clearModalContent();
        
        fillLayoutOptionsDefaultChecklist();
        eventsDoubleChoose()
    });
}

function setOptionSelectedAndValue(index){
    allOptions[index].selected=true;
    allOptions[index].pointsValue=pointsModal;
}

function clearModalContent(){
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
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
        validationDeleteOptions();
        ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
        fillLayoutOptionsDefaultChecklist(true);
        eventsMultipleChoose();
        layoutCorrectPercentageOptions();
    });
}

function validationDeleteOptions(){
    if(onlyOneDistinctPercentage===false){
        verifyCorrectPercentageOptions();
    }
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
        let index=findIndexOption(id)

        allOptions[index].nameOption=e.currentTarget.value;
    });

    element.querySelectorAll('input')[0].addEventListener('focus',(e)=>{
        removeInputDangerOption(event);
    })
}

function uniqueEventInputPercentage(element) {
    element.querySelectorAll('input')[1].addEventListener('input',(e)=>{
        let id=parseInt(element.getAttribute('idOption'));
        let index=findIndexOption(id);
        calcNewValuePercentage(e.currentTarget.value,allOptions[index]);
    });
}

function removeInputDangerOption(event){
    event.currentTarget.classList.remove('input-danger')
}

function findIndexOption(id){
    let index=allOptions.findIndex((item)=>{
        if(item.id===id){
            return true;
        }
    });

    return index;
}

function calcNewValuePercentage(valueOption,optionsDefaultChecklist) {
    let value=parseFloat(valueOption);
    optionsDefaultChecklist.percentage=value;

    let totalPoints=pointsModal;
    let newPoints=(value/100)*totalPoints;
    optionsDefaultChecklist.pointsValue=newPoints;
    
    setValueInOption(newPoints,optionsDefaultChecklist);
    if(onlyOneDistinctPercentage){
        verifyCorrectPercetageDistinct(value,optionsDefaultChecklist);
    }else{
        verifyCorrectPercentageOptions();
    }
}

function setValueInOption(newPoints,optionsDefaultChecklist){
    let optionsDefaultChecklistElement=ONE_ELEMENT(`#optionDefaultChecklist${optionsDefaultChecklist.id}`);
    optionsDefaultChecklistElement.querySelectorAll('input')[2].value=newPoints.toFixed(2);
}

function calcPercentageEquals() {
    let numberOptions=allOptions.length;
    let pointsValue=pointsModal/numberOptions;
    let percentage= (pointsValue/pointsModal)*100;
    
    return [pointsValue,percentage];
}

function verifyCorrectPercetageDistinct(value,optionsDefaultChecklist){
    if(value > 100 || value < 0){
        optionsDefaultChecklist.correctPercentage=false;
    }else{
        optionsDefaultChecklist.correctPercentage=true;
    }

    layoutCorrectPercentageOptions();
}

function verifyCorrectPercentageOptions() {
    let totalPoint=getTotalPointsOptions();
   
    if(totalPoint != pointsModal){
        setOptionsCorrectPercentage(false);
    }else{
        setOptionsCorrectPercentage(true);
    }
    
    layoutCorrectPercentageOptions();
}

function getTotalPointsOptions(){
    let totalPoint=0;
    allOptions.forEach(option => {
        totalPoint+=parseFloat(option.pointsValue);
    });

    return totalPoint;
}

function setOptionsCorrectPercentage(correct){
    allOptions.forEach(option => {
        option.correctPercentage=correct;
    })
}

function layoutCorrectPercentageOptions(){
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

var namesChecklists=[];
ONE_ELEMENT('#btnSave').addEventListener('click',()=>{
    showAlertHeader();
    if(allValidations(defaultChecklistArray)){
        setChecklistNamesSave();
        setInfoInInputsFormsSave();
        ONE_ELEMENT('#formChecklistsJson').submit();
    };
});

function setChecklistNamesSave(){
    defaultChecklistArray.forEach((item)=>{
        namesChecklists.push(item.name);
    })
}

function setInfoInInputsFormsSave(){
    ONE_ELEMENT('#default_checklist_json').value=JSON.stringify(defaultChecklistArray);
    ONE_ELEMENT('#checklist_names').value=namesChecklists.join(',');
    ONE_ELEMENT('#lastIdIncrement').value=idIncrement;
    ONE_ELEMENT('#lastIdIncrementOption').value=idIndentOption;
}

ONE_ELEMENT('#btnFinish').addEventListener('click',()=>{
    showAlertHeader();
    if(allValidations(defaultChecklistArray)){
        setInfoInInputsFormsFinish();
        ONE_ELEMENT('#formChecklists').submit();
    };
});

function setInfoInInputsFormsFinish(){
    ONE_ELEMENT('#default_checklist_json_oficial').value=JSON.stringify(defaultChecklistArray);
    ONE_ELEMENT('#allChecklists').value=JSON.stringify(defaultChecklistArray);
    ONE_ELEMENT('#lastIdIncrementOficial').value=idIncrement;
    ONE_ELEMENT('#lastIdIncrementOptionOficial').value=idIndentOption;
}

function showAlertHeader(){
    let alertHeader=ONE_ELEMENT('.alert-header');
    alertHeader.classList.remove('d-none');
}

function goToAlertHeader(){
    let alertHeader=ONE_ELEMENT('.alert-header');
    let scrollPosition=alertHeader.getBoundingClientRect();
    window.scrollBy(scrollPosition.x,scrollPosition.y-60);
}

function allValidations(defaultChecklistArray) {
    let itemError=[];
    let errorNumber=[];
    let isOk=false;
    let thereIsErrors=0;

    defaultChecklistArray.forEach((item)=>{
        verifyEmptyInputsInValidation(item,errorNumber);
        verifyTypeChecklistInValidation(item,errorNumber);
        verifyCorrectPercentageInValidation(item,errorNumber);
        verifyAgroupingDefaultChecklistWithouChildreenInValidation(item,errorNumber);
        verifyEmptyAndPercentageOptionsInValidation(item,errorNumber);
        verifyDoubleOptionWithoutTwoOptions(item,errorNumber);

        isOk=verifyIfThereErrors(thereIsErrors,errorNumber);
        if(isOk===false){
            itemError=item;
        }
        setLayoutValidationIfThereErrors(errorNumber,item,itemError);
       
        if(isOk){
            if(item.subchecklists.length>0){
                isOk=allValidations(item.subchecklists);
            }
        }
    });

    return isOk;
}


function verifyIfThereErrors(thereIsErrors,errorNumber){
    let isOk=false;
    
    if(thereIsErrors===0){
        if(errorNumber.length===0){
            isOk=true;
        }else{
            isOk=false;
            thereIsErrors++;
        }
    }

    return isOk;
}

function setLayoutValidationIfThereErrors(errorNumber,item,itemError){
    if(errorNumber != [] && itemError.id===item.id){
        errorNumber.forEach((error)=>{
            allValidationsLayout(item,error);
        });
        
        errorNumber=[];
    }
}

function verifyEmptyInputsInValidation(item,errorNumber){
    let isOk=true;
    
    if(item.name==="" || item.percentage==="" ||  item.points===""){
        errorNumber.push(ERROR_EMPTY_INPUTS);
        isOk=false;
    }

    return isOk;
}

function verifyTypeChecklistInValidation(item,errorNumber){
    let isOk=true;

    if(item.typechecklist === "" && item.idDefaultChecklist !== null){
        errorNumber.push(ERROR_SELECT_VALUE);
        isOk=false;
    }

    return isOk;
}

function verifyCorrectPercentageInValidation(item,errorNumber){
    let isOk=true;

    if(item.correctPercentage===false){
        errorNumber.push(ERROR_PERCENTAGE);
        isOk=false;
    }

    return isOk;
}

function verifyAgroupingDefaultChecklistWithouChildreenInValidation(item,errorNumber){
    let isOk=true;

    if(item.idDefaultChecklist === null){
        if(item.subchecklists.length===0){
            errorNumber.push(ERROR_SUBCHECKLIST_FATHER);
            isOk=false;
        }
    }

    if(item.typechecklist==="0" || item.typechecklist==="7"){
        if(item.subchecklists.length===0){
            errorNumber.push(ERROR_GROUPING);
            isOk=false;
        }
    }

    return isOk;
}


function verifyEmptyAndPercentageOptionsInValidation(item,errorNumber){
    let isOk=true;

    if(item.typechecklist==="3"){
        let numberOptions=item.options.length;
        if(numberOptions < 1){
            errorNumber.push(ERROR_EMPTY_OPTIONS);
            isOk=false;
        }

        item.options.forEach((option)=>{
            if(option.correctPercentage===false){
                errorNumber.push(ERROR_OPTIONS_PERCETAGE);
                isOk=false;
            }
        })
    }

    return isOk;
}

//Em teoria, só irá parar nessa validação se alguem baguçar o front pelo inspecionar
function verifyDoubleOptionWithoutTwoOptions(item,errorNumber){
    let isOk=true;

    if(item.typechecklist==="4"){
        let numberOptions=item.options.length;
        if(numberOptions !=2){
            errorNumber.push(ERROR_EMPTY_DOUBLE_OPTIONS);
            isOk=false;
        }
    }

    return isOk;
}

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

    verifyErrorAndAddDanger(errorNumber,defaultChecklistElement,item);
    showAlertHeader()
    goToAlertHeader();

    let alertHeader=ONE_ELEMENT('.alert-header');
    alertHeader.querySelector('.alert').innerHTML=errorsDescription[errorNumber];
}


function verifyErrorAndAddDanger(errorNumber,defaultChecklistElement,item){
    if(errorNumber === ERROR_EMPTY_INPUTS){
        verifyInpusWithEmptyValue(defaultChecklistElement,item);
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
}

function verifyInpusWithEmptyValue(defaultChecklistElement,item){
    let inputs=defaultChecklistElement.querySelectorAll('input');
        
    setDangerInputsInValidation(inputs[0]);
    
    if(item.typechecklist==='8'){
        setDangerInputsInValidation(inputs[1]);
    }
    
    setDangerInputsInValidation(inputs[2]);
    setDangerInputsInValidation(inputs[3]);
}

function setDangerInputsInValidation(input){
    if(input.value===""){
        input.classList.add('input-danger');
    }
}