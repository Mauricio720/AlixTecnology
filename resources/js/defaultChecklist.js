var defaultChecklist=ONE_ELEMENT('.defaultChecklist');
var defaultChecklistArray=[];
var idIncrement=1;

ONE_ELEMENT('#btnAddDefaultCheck').addEventListener('click',(e)=>{
    addDefaultChecklist(); 
    ONE_ELEMENT('.checklistContent').innerHTML="";
    showDefaultChecklist(defaultChecklistArray);
    eventsDefaultChecklist();
    eventsBtnDelete();

});

function showDefaultChecklist(defaultChecklistArray) {
    defaultChecklistArray.map((item)=>{
        let defaultChecklistClone=defaultChecklist.cloneNode(true);
        defaultChecklistClone.style.display='flex'
        defaultChecklistClone.setAttribute('idElement',item.id);
        defaultChecklistClone.setAttribute('id',"defaultCheck"+item.id);
        
        defaultChecklistClone.querySelectorAll('input')[0].value=item.name;
        defaultChecklistClone.querySelectorAll('input')[1].value=item.percentage;
        defaultChecklistClone.querySelectorAll('input')[2].value=item.points;
        defaultChecklistClone.querySelectorAll('input')[3].value=item.observation;
        defaultChecklistClone.querySelector('select').value=item.typechecklist.toString();
        
        if(item.correctPercentage===false){
            defaultChecklistClone.querySelectorAll('input')[2].classList.add('input-danger');
        }else{
            defaultChecklistClone.querySelectorAll('input')[2].classList.remove('input-danger');
        }

        if(item.idDefaultChecklist !== null){
            defaultChecklistClone.querySelectorAll('input')[1].disabled=false;
            defaultChecklistClone.querySelectorAll('input')[2].disabled=true;
        }

        if(item.subchecklists.length===0 && item.idDefaultChecklist === null){
            defaultChecklistClone.querySelectorAll('input')[2].disabled=false;
        }else{
            defaultChecklistClone.querySelectorAll('input')[2].disabled=true;
        }

        if(item.subchecklists.length===0){
            defaultChecklistClone.querySelector('.btnSeeMore').style.display="none";
        }else{
            defaultChecklistClone.querySelector('.btnSeeMore').style.display="block";
        }

        if(item.active){
            defaultChecklist.classList.add('active');
        }

        if(item.idDefaultChecklist != null){
            let defaultChecklist=ONE_ELEMENT(`#defaultCheck${item.idDefaultChecklist}`);
            defaultChecklist.querySelector('.defaultChecklist__container').append(defaultChecklistClone);
        }else{
            ONE_ELEMENT('.checklistContent').append(defaultChecklistClone);
        }
        if(item.subchecklists.length > 0){
            showDefaultChecklist(item.subchecklists);
        }

    });
}

function eventsDefaultChecklist() {
    [...ALL_ELEMENTS('.checklistContent .btnAddDefaultChecklist')].forEach((element)=>{
        let id=parseInt(element.closest('.defaultChecklist').getAttribute('idElement'));
        let elementChecklist=element.closest('.defaultChecklist');
        let defaultChecklist=filterDefaultChecklist(defaultChecklistArray,id,{});

        element.addEventListener('click',(e)=>{
            if(validationDefaultChecklist(e.currentTarget.closest('.defaultChecklist'))){
                addDefaultChecklist(id); 
                ONE_ELEMENT('.checklistContent').innerHTML="";
                setChecklistPoint(id);
                defaultChecklist.active=true;
                showDefaultChecklist(defaultChecklistArray);
                eventsDefaultChecklist();
                eventsBtnSeeMore();
                eventsBtnDelete();


            }
        })

        elementChecklist.querySelectorAll('input')[0].addEventListener('keyup',(e)=>{
            let value=e.currentTarget.value;
            defaultChecklist.name=value;
        });

        elementChecklist.querySelectorAll('input')[1].addEventListener('input',(e)=>{
            let value=parseFloat(e.currentTarget.value);
            defaultChecklist.percentage=value;

            let defaultChecklistFather=filterDefaultChecklist(defaultChecklistArray,defaultChecklist.idDefaultChecklist,{});
            let totalPoints=defaultChecklistFather.points;

            let newPoints=(value/100)*totalPoints;
            defaultChecklist.points=newPoints;
            
            let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${defaultChecklist.id}`);
            defaultChecklistElement.querySelectorAll('input')[2].value=newPoints.toFixed(2);
            
            verifyCorrectPercetage(defaultChecklistFather.id);
        });

        elementChecklist.querySelectorAll('input')[2].addEventListener('input',(e)=>{
            let value=e.currentTarget.value;
            defaultChecklist.points=value;
            defaultChecklist.percentage=100;
            elementChecklist.querySelectorAll('input')[1].value=100;
        });

      
        elementChecklist.querySelectorAll('input')[3].addEventListener('keyup',(e)=>{
            let value=e.currentTarget.value;
            defaultChecklist.observation=value;
        });

        elementChecklist.querySelectorAll('input')[0].addEventListener('focus',(e)=>{
            e.currentTarget.classList.remove('input-danger');
        });

        elementChecklist.querySelectorAll('input')[2].addEventListener('focus',(e)=>{
            e.currentTarget.classList.remove('input-danger');
        });
        
        elementChecklist.querySelectorAll('input')[3].addEventListener('focus',(e)=>{
            e.currentTarget.classList.remove('input-danger');
        });

        elementChecklist.querySelector('select').addEventListener('change',(e)=>{
            let value=e.currentTarget.value;
            defaultChecklist.typechecklist=value;
            e.currentTarget.classList.remove('input-danger');
        });
    })

    showSubchecklistContainerLoop();
}

function eventsBtnSeeMore() {
    [...ALL_ELEMENTS('.checklistContent .btnSeeMore')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let elementChecklist=e.currentTarget.closest('.defaultChecklist');
            showSubchecklistContainer(elementChecklist);
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
        });
    });
}

function setChecklistPoint(id) {
    let points=filterDefaultChecklist(defaultChecklistArray,id,{}).points;
    let allDefaultChecklist=filterDefaultChecklistToPoints(defaultChecklistArray,id,[]);
    let totalNumberDefaultChecklists=allDefaultChecklist.length;
    let pointsValue=points/totalNumberDefaultChecklists;
    let percentage= (pointsValue/points)*100;

    allDefaultChecklist.forEach(element => {
        element.points=pointsValue.toFixed(2);
        element.percentage=percentage.toFixed(2);
        element.correctPercentage=true;
    });
}

function verifyCorrectPercetage(idDefaultChecklistFather) {
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

function showSubchecklistContainerLoop() {
    defaultChecklistArray.forEach(item =>{
        let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${item.id}`);
        if(item.active){
            let totalDefaultChecklist=item.subchecklists.length;
            let margin=35*totalDefaultChecklist;
            let heightTotal=65+(65*totalDefaultChecklist)+margin;
                
            defaultChecklistElement.style.height=`${heightTotal}px`;
            defaultChecklistElement.classList.add('active');
            defaultChecklistElement.active=true;

        }else{
            defaultChecklistElement.style.height="65px";
            defaultChecklistElement.classList.remove('active');
            defaultChecklistElement.active=false;
        }
    })
}

function validationDefaultChecklist(defaultChecklist){
    let isOK=true;
    let inputsChecklist=defaultChecklist.querySelectorAll('input');
    let selectChecklist=defaultChecklist.querySelector('select');

    inputsChecklist[0].classList.remove('input-danger');
    inputsChecklist[2].classList.remove('input-danger');
    selectChecklist.classList.remove('input-danger');

    if(inputsChecklist[0].value==""){
        inputsChecklist[0].classList.add('input-danger');
        isOK=false;
    }
    
    if(inputsChecklist[2].value==""){
        inputsChecklist[2].classList.add('input-danger');
        isOK=false;
    }
    
    if(selectChecklist.value===""){
        selectChecklist.classList.add('input-danger');
        isOK=false;
    }

    return isOK;
}

function addDefaultChecklist(idDefaultChecklist=null) {
    let id=idIncrement++;
    
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
