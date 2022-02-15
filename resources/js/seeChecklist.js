var checklist=ONE_ELEMENT('.checklistExibition');
var checklistArray=JSON.parse(ONE_ELEMENT('#checklistArray').value);
var typeChecklistArray=['Agrupamento','Texto','Upload','Multiplas Escolhas','Dupla Escolha','Numerica','Data','Agrupamento (dupla escolha)'];
var optionsChecklist=ONE_ELEMENT('.optionsChecklistExibition');
var downloadChecklistItem=ONE_ELEMENT('.download__item');
var formChecklist=ONE_ELEMENT('#formChecklistExibition');

showChecklist(checklistArray.subchecklist); 
eventsBtnSeeMore();
eventsBtnSeeOption(); 
eventsBtnSeeMoreCheck();
eventFilesNames();  

function showChecklist(checklistArray,checklistElement=null) {
    checklistArray.map((item)=>{
        let checklistClone=checklist.cloneNode(true);
        checklistClone.style.display='flex'
        
        if(item.id_type_checklist===0 || item.id_type_checklist===3 || item.id_type_checklist===4){
            checklistClone.querySelector('.checklist__slot--value').remove();
        }

        fillInputsAndAttributeChecklist(checklistClone,item);
        appendChecklist(checklistClone,checklistElement);
        appendOptions(item,checklistClone); 
        repeatLoopShowChecklist(item,checklistClone); 

        checklistClone.querySelector('.btnSeeMoreCheck').setAttribute('id',item.id);

    });
}

function fillInputsAndAttributeChecklist(checklistClone,item) {
    checklistClone.setAttribute('idElement',item.id);
    checklistClone.setAttribute('id',"check"+item.id);
    checklistClone.style.height="100px";
    checklistClone.querySelector('.checklist__title').innerHTML=item.name;
    checklistClone.querySelector('.checklist__title').setAttribute('title',item.name);

    if(item.id_type_checklist===2){
        let linkElement=checklistClone.querySelector('.checklist__download--btn');
        linkElement.style.display='block';
        linkElement.setAttribute('id',item.id);
        checklistClone.querySelector('.valueChecklist').style.display='none';
    }else{
        if(item.id_type_checklist !== 0 && item.id_type_checklist!==3 && item.id_type_checklist!==4 && item.id_type_checklist!==7){
            checklistClone.querySelector('.valueChecklist').innerHTML=item.value;
        }else if(item.id_type_checklist === 0 || item.id_type_checklist === 7){
            checklistClone.querySelector('.checklist__slot--value').style.display='none';
        }
    }
    checklistClone.querySelector('.typeChecklist').innerHTML="Tipo: "+typeChecklistArray[item.id_type_checklist];
    checklistClone.querySelector('.typeChecklist').setAttribute('title',typeChecklistArray[item.id_type_checklist]);
    checklistClone.querySelector('.points').innerHTML="Pontos Possiveis: "+item.points;
    checklistClone.querySelector('.points').setAttribute('title',item.points);
    checklistClone.querySelector('.pointsObtained').innerHTML="Pontos Obtidos: "+item.pointsObtained;
    checklistClone.querySelector('.pointsObtained').setAttribute('title',item.pointsObtained);
    checklistClone.querySelector('.observation').innerHTML=item.observation===""?
        'Nenhuma observação':item.observation;
    checklistClone.querySelector('.observation').setAttribute('title',item.observation);
    
    if(item.id_type_checklist===7){
        renameChecklist(item);
    }
}

function renameChecklist(checklist) {
    if(checklist.subchecklist){
        checklist.subchecklist.forEach((checklistItem,index)=>{
            if(checklistItem.id_type_checklist===7){
                checklistItem.name=`${checklistItem.name} - ${index+1}`;
            }
        })
        
    }
}

function appendOptions(item,checklistClone) {
    if(item.options.length > 0){
        checklistClone.querySelector('.btnOptions').style.display='block';
        checklistClone.querySelector('.btnOptions').setAttribute('id',item.id);
    }
}

function appendChecklist(checklistClone,checklistElement) {
    if(checklistElement === null){
        ONE_ELEMENT('.checklistContent').append(checklistClone);
    }else{
        checklistElement.querySelector('.checklist__container').append(checklistClone);
    }
}

function repeatLoopShowChecklist(item,checklistClone=null) {
     if(item.subchecklist.length > 0){
        checklistClone.querySelector('.btnSeeMore').style.display='block';
        showChecklist(item.subchecklist,checklistClone); 
    }
}

function eventFilesNames() {
    [...ALL_ELEMENTS('.checklistContent .checklist__download--btn')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let id=parseInt(e.currentTarget.getAttribute('id'));
            let checklist=filterChecklist(checklistArray.subchecklist,id,{}); 
            openModalFiles(checklist.file_name);
        })
    });
}

function openModalFiles(files) {
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").innerHTML="Arquivos para download";
    ONE_ELEMENT('#btnAddModal').style.display='none';
    ONE_ELEMENT('#btnEditModal').style.display='none';

    files.forEach((file)=>{
        let downloadChecklistItemClone=downloadChecklistItem.cloneNode(true);
        downloadChecklistItemClone.style.display='flex';
        downloadChecklistItemClone.querySelector('.download__link').setAttribute('href',BASE_URL+"/storage/checklists_files/"+file);
        downloadChecklistItemClone.querySelector('.download__link').innerHTML=file;
        ONE_ELEMENT('#modalActions').querySelector(".modal-body").append(downloadChecklistItemClone);
    })
}


function eventsBtnSeeOption() {
    [...ALL_ELEMENTS('.checklistContent .btnOptions')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let id=parseInt(e.currentTarget.getAttribute('id'));
            let checklist=filterChecklist(checklistArray.subchecklist,id,{}); 
            openModalOptions(checklist.options);
        })
    });
}

function openModalOptions(options) {
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").innerHTML="Opções da checklist";
    ONE_ELEMENT('#btnAddModal').style.display='none';
    ONE_ELEMENT('#btnEditModal').style.display='none';

    options.forEach((option)=>{
        let optionsChecklistClone=optionsChecklist.cloneNode(true);
        optionsChecklistClone.querySelector('.optionName').innerHTML=option.name;
        optionsChecklistClone.querySelector('.optionSelected').innerHTML=option.selected?'Sim':'Não';
        optionsChecklistClone.querySelector('.optionPointsObtained').innerHTML=option.pointsObtained;
        optionsChecklistClone.querySelector('.optionPoints').innerHTML=option.points;
        optionsChecklistClone.style.display='flex';
        
        ONE_ELEMENT('#modalActions').querySelector(".modal-body").append(optionsChecklistClone);
    })
}

function eventsBtnSeeMore() {
    [...ALL_ELEMENTS('.checklistContent .btnSeeMore')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let elementChecklist=e.currentTarget.closest('.checklistExibition');
            showSubchecklistContainer(elementChecklist);
        })
    });
}

function eventsBtnSeeMoreCheck() {
    [...ALL_ELEMENTS('.checklistContent .btnSeeMoreCheck')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let id=parseInt(e.currentTarget.getAttribute('id'));
            let checklist=filterChecklist(checklistArray.subchecklist,id,{}); 
            openModalChecklist(checklist);
        })
    });
}

function openModalChecklist(item) {
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").innerHTML="Detalhes Checklist";
    ONE_ELEMENT('#btnAddModal').style.display='none';
    ONE_ELEMENT('#btnEditModal').style.display='none';

    formChecklist.querySelector('.nameChecklist').innerHTML=item.name;
    formChecklist.querySelector('.typeChecklist').innerHTML=typeChecklistArray[item.id_type_checklist];
    if(item.id_type_checklist===2){
        let linkElement=formChecklist.querySelector('.valueChecklist').querySelector('a');
        linkElement.style.display='block';
        linkElement.innerHTML="Download: "+item.name;
        linkElement.setAttribute('href',BASE_URL+"/storage/checklists_files/"+item.file_name);
    }else{
        if(item.id_type_checklist !== 0 && item.id_type_checklist!==3 && item.id_type_checklist!==4){
            formChecklist.querySelector('.valueChecklist').innerHTML=item.value;
        }else{
            formChecklist.querySelector('.valueChecklist').closest('.form-group').style.display="none";
        }
    }
    formChecklist.querySelector('.pointsChecklist').innerHTML="Pontos: "+item.points;
    formChecklist.querySelector('.pointsObtainedChecklist').innerHTML=item.pointsObtained;
    formChecklist.querySelector('.observationChecklist').innerHTML=item.observation===""?
        'Nenhuma observação':item.observation;

    formChecklist.style.display='block';

    ONE_ELEMENT('#modalActions').querySelector(".modal-body").append(formChecklist);

}

function showSubchecklistContainer(elementChecklist){
    let id=parseInt(elementChecklist.getAttribute('idElement'));
    let checklist=filterChecklist(checklistArray.subchecklist,id,{});
    
    if(!elementChecklist.classList.contains('active')){
        let totalDefaultChecklist=elementChecklist.querySelectorAll('.checklistContent .checklistExibition').length;
        let margin=35*totalDefaultChecklist;
        let heightTotal=100+(100*totalDefaultChecklist)+margin;
            
        elementChecklist.style.height=`${heightTotal}px`;
        elementChecklist.classList.add('active');
        checklist.active=true;
    }else{
        elementChecklist.style.height="100px";
        elementChecklist.classList.remove('active');
        checklist.active=false;
    }
}

function showSubchecklistContainerLoop(checklistArray) {
    checklistArray.forEach(item =>{
        let checklistElement=ONE_ELEMENT(`#check${item.id}`);
        
        if(item.active){
            let totalDefaultChecklist=checklistElement.querySelectorAll('.checklistContent .checklistExibition').length;
          
            let margin=35*totalDefaultChecklist;
            let heightTotal=100+(100*totalDefaultChecklist)+margin;
           
            checklistElement.style.height=`${heightTotal}px`;
            checklistElement.classList.add('active');
            item.active=true;

        }else{
            defaultChecklistElement.style.height="65px";
            defaultChecklistElement.classList.remove('active');
            item.active=false;
        }

        if(item.subchecklist.length > 0){
            showSubchecklistContainerLoop(item.subchecklist);
        }
    })
}

function increaseDefaultChecklistFather(item,extraHeight=65) {
    let defaultChecklist=ONE_ELEMENT(`#check${item.id}`);
    let height=defaultChecklist.offsetHeight;
    if(extraHeight > 65){
        defaultChecklist.style.height=height+extraHeight+"px";
    }
    
    if(item.idDefaultChecklist != null){
        let defaultChecklistFather=filterChecklist(checklistArray.subchecklist,item.idDefaultChecklist,{});
        let totalDefaultChecklist=item.subchecklist.length;
        let margin=35*totalDefaultChecklist;
        let heightTotal=65+(65*totalDefaultChecklist)+margin+extraHeight;
        increaseDefaultChecklistFather(defaultChecklistFather,heightTotal); 
    }
}


function filterChecklist(checklistArray,id,itemObject) {
    let item=itemObject;
    checklistArray.forEach((itemObject)=>{
        if(itemObject.id===id){
            item=itemObject;
        }else{
            if(itemObject.subchecklist != []){
                item=filterChecklist(itemObject.subchecklist,id,item);
            }
        }
    })
    
    return item;
}