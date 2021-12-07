var defaultChecklist=ONE_ELEMENT('.defaultChecklistExibition');
var defaultChecklistArray=JSON.parse(ONE_ELEMENT('#defaultChecklistArray').value);
var typeChecklistArray=['Agrupamento','Texto','Upload','Multiplas Escolhas','Dupla Escolha','Numerica','Data'];
var optionsDefaultChecklist=ONE_ELEMENT('.optionsDefaultChecklistExibition');
var formChecklist=ONE_ELEMENT('#formChecklist');

showDefaultChecklist(defaultChecklistArray.subchecklist); 
eventsBtnSeeMore();
eventsBtnSeeOption(); 
eventsBtnSeeMoreCheck(); 

function showDefaultChecklist(defaultChecklistArray,defaultChecklistElement=null) {
    defaultChecklistArray.map((item)=>{
        let defaultChecklistClone=defaultChecklist.cloneNode(true);
        defaultChecklistClone.style.display='flex'
        
        fillInputsAndAttributeDefaultChecklist(defaultChecklistClone,item);
        appendDefaultChecklist(defaultChecklistClone,defaultChecklistElement);
        appendOptions(item,defaultChecklistClone); 
        repeatLoopShowDefaultChecklist(item,defaultChecklistClone); 

        defaultChecklistClone.querySelector('.btnSeeMoreCheck').setAttribute('id',item.id);

    });
}

function fillInputsAndAttributeDefaultChecklist(defaultChecklistClone,item) {
    defaultChecklistClone.setAttribute('idElement',item.id);
    defaultChecklistClone.setAttribute('id',"defaultCheck"+item.id);

    defaultChecklistClone.querySelector('.nameChecklist').innerHTML=item.name;
    defaultChecklistClone.querySelector('.nameChecklist').setAttribute('title',item.name);
    defaultChecklistClone.querySelector('.typeChecklist').innerHTML="Tipo: "+typeChecklistArray[item.id_type_checklist];
    defaultChecklistClone.querySelector('.typeChecklist').setAttribute('title',"Tipo: "+typeChecklistArray[item.id_type_checklist]);
    defaultChecklistClone.querySelector('.pointsPercentage').innerHTML=item.percentage+"%";
    defaultChecklistClone.querySelector('.pointsPercentage').setAttribute('title',item.percentage+"%");
    defaultChecklistClone.querySelector('.points').innerHTML="Pontos: "+item.points;
    defaultChecklistClone.querySelector('.points').setAttribute('title',item.points);
    defaultChecklistClone.querySelector('.observation').innerHTML=item.observation===""?
        'Nenhuma observação':item.observation;
    defaultChecklistClone.querySelector('.observation').setAttribute('title',item.observation);
}

function appendOptions(item,defaultChecklistClone) {
    if(item.options.length > 0){
        defaultChecklistClone.querySelector('.btnOptions').style.display='block';
        defaultChecklistClone.querySelector('.btnOptions').setAttribute('id',item.id);
    }
}

function appendDefaultChecklist(defaultChecklistClone,defaultChecklistElement) {
    if(defaultChecklistElement === null){
        ONE_ELEMENT('.checklistContent').append(defaultChecklistClone);
    }else{
        defaultChecklistElement.querySelector('.defaultChecklist__container').append(defaultChecklistClone);
    }
}

function repeatLoopShowDefaultChecklist(item,defaultChecklistClone=null) {
     if(item.subchecklist.length > 0){
        defaultChecklistClone.querySelector('.btnSeeMore').style.display='block';
        showDefaultChecklist(item.subchecklist,defaultChecklistClone); 
    }
}

function eventsBtnSeeOption() {
    [...ALL_ELEMENTS('.checklistContent .btnOptions')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let id=parseInt(e.currentTarget.getAttribute('id'));
            let defaultChecklist=filterDefaultChecklist(defaultChecklistArray.subchecklist,id,{}); 
            openModal(defaultChecklist.options);
        })
    });
}

function openModal(options) {
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").innerHTML="Opções da checklist";
    ONE_ELEMENT('#btnAddModal').style.display='none';
    ONE_ELEMENT('#btnEditModal').style.display='none';

    options.forEach((option)=>{
        let optionsDefaultChecklistClone=optionsDefaultChecklist.cloneNode(true);
        optionsDefaultChecklistClone.querySelector('.optionName').innerHTML=option.name;
        optionsDefaultChecklistClone.querySelector('.optionPercentage').innerHTML=option.percentage+"%";
        optionsDefaultChecklistClone.querySelector('.optionPoints').innerHTML="Pontos: "+option.points.toFixed(2);
        optionsDefaultChecklistClone.style.display='flex';
        
        ONE_ELEMENT('#modalActions').querySelector(".modal-body").append(optionsDefaultChecklistClone);
    })
}

function eventsBtnSeeMore() {
    [...ALL_ELEMENTS('.checklistContent .btnSeeMore')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let elementChecklist=e.currentTarget.closest('.defaultChecklistExibition');
            showSubchecklistContainer(elementChecklist);
        })
    });
}

function eventsBtnSeeMoreCheck() {
    [...ALL_ELEMENTS('.checklistContent .btnSeeMoreCheck')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let id=parseInt(e.currentTarget.getAttribute('id'));
            let defaultChecklist=filterDefaultChecklist(defaultChecklistArray.subchecklist,id,{}); 
            openModalChecklist(defaultChecklist);
        })
    });
}

function openModalChecklist(item) {
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").innerHTML="Detalhes Checklist";
    ONE_ELEMENT('#btnAddModal').style.display='none';
    ONE_ELEMENT('#btnEditModal').style.display='none';

    
    formChecklist.querySelector('.nameChecklist').innerHTML=item.name;
    formChecklist.querySelector('.typeChecklist').innerHTML="Tipo: "+typeChecklistArray[item.id_type_checklist];
    formChecklist.querySelector('.pointsPercentageChecklist').innerHTML=item.percentage+"%";
    formChecklist.querySelector('.pointsChecklist').innerHTML="Pontos: "+item.points;
    formChecklist.querySelector('.observationChecklist').innerHTML=item.observation===""?
        'Nenhuma observação':item.observation;

    formChecklist.style.display='block';

    ONE_ELEMENT('#modalActions').querySelector(".modal-body").append(formChecklist);

}

function showSubchecklistContainer(elementChecklist){
    let id=parseInt(elementChecklist.getAttribute('idElement'));
    let defaultChecklist=filterDefaultChecklist(defaultChecklistArray.subchecklist,id,{});
    
    if(!elementChecklist.classList.contains('active')){
        let totalDefaultChecklist=elementChecklist.querySelectorAll('.checklistContent .defaultChecklistExibition').length;
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
    defaultChecklistArray.forEach(item =>{
        let defaultChecklistElement=ONE_ELEMENT(`#defaultCheck${item.id}`);
        
        if(item.active){
            let totalDefaultChecklist=item.subchecklist.length;
            let margin=35*totalDefaultChecklist;
            let heightTotal=65+(65*totalDefaultChecklist)+margin;
            
            defaultChecklistElement.style.height=`${heightTotal}px`;
            defaultChecklistElement.classList.add('active');
            defaultChecklistElement.active=true;

            if(item.subchecklist > 0){
               increaseDefaultChecklistFather(item);
            }

        }else{
            defaultChecklistElement.style.height="65px";
            defaultChecklistElement.classList.remove('active');
            defaultChecklistElement.active=false;
        }

        if(item.subchecklist.length > 0){
            showSubchecklistContainerLoop(item.subchecklist);
        }
    })
}

function increaseDefaultChecklistFather(item,extraHeight=65) {
    let defaultChecklist=ONE_ELEMENT(`#defaultCheck${item.id}`);
    let height=defaultChecklist.offsetHeight;
    if(extraHeight > 65){
        defaultChecklist.style.height=height+extraHeight+"px";
    }
    
    if(item.idDefaultChecklist != null){
        let defaultChecklistFather=filterDefaultChecklist(defaultChecklistArray.subchecklist,item.idDefaultChecklist,{});
        let totalDefaultChecklist=item.subchecklist.length;
        let margin=35*totalDefaultChecklist;
        let heightTotal=65+(65*totalDefaultChecklist)+margin+extraHeight;
        increaseDefaultChecklistFather(defaultChecklistFather,heightTotal); 
    }
}


function filterDefaultChecklist(defaultChecklistArray,id,itemObject) {
    let item=itemObject;
    defaultChecklistArray.forEach((itemObject)=>{
        if(itemObject.id===id){
            item=itemObject;
        }else{
            if(itemObject.subchecklist != []){
                item=filterDefaultChecklist(itemObject.subchecklist,id,item);
            }
        }
    })
    
    return item;
}