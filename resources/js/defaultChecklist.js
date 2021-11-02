var defaultChecklist=ONE_ELEMENT('.defaultChecklist');
var defaultChecklistArray=[];
var idIncrement=1;

ONE_ELEMENT('#btnAddDefaultCheck').addEventListener('click',(e)=>{
    addDefaultChecklist(); 
    ONE_ELEMENT('.checklistContent').innerHTML="";
    showDefaultChecklist(defaultChecklistArray);
    eventsDefaultChecklist();
});

function showDefaultChecklist(defaultChecklistArray) {
    defaultChecklistArray.map((item)=>{
        let defaultChecklistClone=defaultChecklist.cloneNode(true);
        defaultChecklistClone.style.display='flex'
        defaultChecklistClone.setAttribute('idElement',item.id);
        defaultChecklistClone.setAttribute('id',"defaultCheck"+item.id);
        
        defaultChecklistClone.querySelectorAll('input')[0].value=item.name;
        defaultChecklistClone.querySelectorAll('input')[1].value=item.points;
        defaultChecklistClone.querySelectorAll('input')[2].value=item.observation;
        defaultChecklistClone.querySelector('select').value=item.typechecklist.toString();
        
        if(item.subchecklists.length===0){
            defaultChecklistClone.querySelector('.btnSeeMore').style.display="none";
        }else{
            defaultChecklistClone.querySelector('.btnSeeMore').style.display="block";
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
        let defaultChecklist=filterSubchecklist(defaultChecklistArray,id,{});

        element.addEventListener('click',(e)=>{
            if(validationDefaultChecklist(e.currentTarget.closest('.defaultChecklist'))){
                addDefaultChecklist(id); 
                ONE_ELEMENT('.checklistContent').innerHTML="";
                showDefaultChecklist(defaultChecklistArray);
                eventsDefaultChecklist();
                eventsBtnSeeMore();
                let defaultChecklist=ONE_ELEMENT(`#defaultCheck${id}`);
                showSubchecklistContainer(defaultChecklist);
            }
        })

        elementChecklist.querySelectorAll('input')[0].addEventListener('keyup',(e)=>{
            let value=e.currentTarget.value;
            defaultChecklist.name=value;
        });

        elementChecklist.querySelectorAll('input')[1].addEventListener('keyup',(e)=>{
            let value=e.currentTarget.value;
            defaultChecklist.points=value;
        });
        
        elementChecklist.querySelectorAll('input')[2].addEventListener('keyup',(e)=>{
            let value=e.currentTarget.value;
            defaultChecklist.observation=value;
        });

        elementChecklist.querySelector('select').addEventListener('change',(e)=>{
            let value=e.currentTarget.value;
            defaultChecklist.typechecklist=value;
        });
    })
}

function eventsBtnSeeMore() {
    [...ALL_ELEMENTS('.checklistContent .btnSeeMore')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let elementChecklist=e.currentTarget.closest('.defaultChecklist');
            showSubchecklistContainer(elementChecklist);
        })
    });
}

function showSubchecklistContainer(elementChecklist){
    if(!elementChecklist.classList.contains('active')){
        let totalDefaultChecklist=elementChecklist.querySelectorAll('.checklistContent .defaultChecklist').length;
        let margin=25*totalDefaultChecklist;
        let heightTotal=50+(50*totalDefaultChecklist)+margin;
            
        elementChecklist.style.height=`${heightTotal}px`;
        elementChecklist.classList.add('active');
    }else{
        elementChecklist.style.height="50px";
        elementChecklist.classList.remove('active');
    }
}

function validationDefaultChecklist(defaultChecklist){
    let isOK=true;
    let inputsChecklist=defaultChecklist.querySelectorAll('input');
    let selectChecklist=defaultChecklist.querySelector('select');

    inputsChecklist[0].classList.remove('input-danger');
    inputsChecklist[1].classList.remove('input-danger');
    selectChecklist.classList.remove('input-danger');

    if(inputsChecklist[0].value==""){
        inputsChecklist[0].classList.add('input-danger');
        isOK=false;
    }
    
    if(inputsChecklist[1].value==""){
        inputsChecklist[1].classList.add('input-danger');
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
        idDefaultChecklist:idDefaultChecklist,
        name:"",
        typechecklist:"",
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
            let defaultChecklistChoose= filterSubchecklist(defaultChecklistArray,idDefaultChecklist,{});
            defaultChecklistChoose.subchecklists.push(defaultChecklistObject);
        }
       
    }else{
        defaultChecklistArray.push(defaultChecklistObject);
    }
}

function filterSubchecklist(defaultChecklistArray,id,itemObject) {
    let item=itemObject;

    defaultChecklistArray.forEach((itemObject)=>{
        if(itemObject.id===id){
            item=itemObject;
        }else{
            if(itemObject.subchecklists != []){
                item=filterSubchecklist(itemObject.subchecklists,id,item);
            }
        }
    })
    
    return item;
}
