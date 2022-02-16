var checklist=ONE_ELEMENT('.checklistExibition');
var checklistCompare=ONE_ELEMENT('.checklistCompare');
var checklistArray=JSON.parse(ONE_ELEMENT('#checklistArray1').value);
var checklistArray2=JSON.parse(ONE_ELEMENT('#checklistArray2').value);
var typeChecklistArray=['Agrupamento','Texto','Upload','Multiplas Escolhas','Dupla Escolha','Numerica','Data','Agrupamento (dupla escolha)'];
var optionsChecklist=ONE_ELEMENT('.optionsChecklistExibition');
var downloadChecklistItem=ONE_ELEMENT('.download__item');
var formChecklist=ONE_ELEMENT('#formChecklistExibition');

showChecklist(checklistArray.subchecklist); 
showChecklist2(checklistArray2.subchecklist); 
eventsBtnSeeMore();
eventsBtnSeeOption(); 
eventsBtnSeeMoreCheck(); 
eventFilesNames();

function showChecklist(checklistArray,checklistElement=null) {
   checklistArray.map((item)=>{
        checklistCompareClone=checklistCompare.cloneNode(true);

        let checklistClone=checklist.cloneNode(true);
        checklistClone.style.display='flex'
        
        if(item.id_type_checklist===0 || item.id_type_checklist===3 || item.id_type_checklist===4){
            checklistClone.querySelector('.checklist__slot--value').remove();
        }

         if(item.id_type_checklist===7){
            renameChecklist(item);
        }

        fillInputsAndAttributeChecklist(checklistClone,item,1);
        appendChecklist(checklistClone,checklistElement,checklistCompareClone);
        appendOptions(item,checklistClone); 
        repeatLoopShowChecklist(item,checklistClone); 

        checklistClone.querySelector('.btnSeeMoreCheck').setAttribute('id',item.id);
        checklistClone.classList.add('checklistCompareOne'); 
    });
}

function showChecklist2(checklistArray,checklistElement=null) {
    checklistArray.map((item,index)=>{
        let checklistClone=checklist.cloneNode(true);
        checklistClone.style.display='flex'

        if(item.id_type_checklist===0 || item.id_type_checklist===3 || item.id_type_checklist===4){
            checklistClone.querySelector('.checklist__slot--value').remove();
        }

        if(item.id_type_checklist===7){
            renameChecklist(item);
        }

        fillInputsAndAttributeChecklist(checklistClone,item,2);
        let checklistCompareElement=ALL_ELEMENTS('.checklistContentCompare .checklistCompare')[index];
        appendChecklist(checklistClone,checklistElement,checklistCompareElement,true);
        appendOptions(item,checklistClone); 
        repeatLoopShowChecklist(item,checklistClone); 

        checklistClone.querySelector('.btnSeeMoreCheck').setAttribute('id',item.id);
    });
}

function renameChecklist(checklist) {
    if(checklist.subchecklist.length > 0){
        checklist.subchecklist.forEach((checklistItem,index)=>{
            if(checklistItem.id_type_checklist===7){
                checklistItem.name=`${checklistItem.name} - ${index+1}`;
            }
        })
    }
}


function fillInputsAndAttributeChecklist(checklistClone,item,checklistNumber) {
    checklistClone.setAttribute('idElement',item.id);
    checklistClone.setAttribute('checklistNumber',checklistNumber);
    checklistClone.setAttribute('id',"check"+item.id);

    checklistClone.querySelector('.checklist__title').innerHTML=item.name;
    checklistClone.querySelector('.checklist__date').innerHTML=item.created_at;

    if(item.id_type_checklist===2){
        let linkElement=checklistClone.querySelector('.checklist__download--btn');
        linkElement.style.display='block';
        linkElement.setAttribute('id',item.id);
        checklistClone.querySelector('.valueChecklist').style.display='none';
    }else{
        if(item.id_type_checklist !== 0 && item.id_type_checklist!==3 && item.id_type_checklist!==4 && item.id_type_checklist!==7){
            checklistClone.querySelector('.valueChecklist').innerHTML=item.value !==''?item.value:'Não preenchido.';
        }else if(item.id_type_checklist === 0 || item.id_type_checklist === 7){
            
            checklistClone.querySelector('.checklist__slot--value').style.display='none';
        }
    }

    checklistClone.querySelector('.typeChecklist').innerHTML="Tipo: "+typeChecklistArray[item.id_type_checklist];
    checklistClone.querySelector('.points').innerHTML="Pontos Possiveis: "+item.points;
    checklistClone.querySelector('.pointsObtained').innerHTML="Pontos Obtidos: "+item.pointsObtained;
    checklistClone.querySelector('.observation').innerHTML=item.observation===""?
        'Nenhuma observação':item.observation;
}

function appendOptions(item,checklistClone) {
    if(item.options.length > 0){
        checklistClone.querySelector('.btnOptions').style.display='block';
        checklistClone.querySelector('.btnOptions').setAttribute('id',item.id);
    }
}

function appendChecklist(checklistClone,checklistElement,checklistCompare,isSecondChecklist=false) {
    if(checklistElement === null){
        checklistCompare.append(checklistClone);
        if(isSecondChecklist===false){
            ONE_ELEMENT('.checklistContentCompare').append(checklistCompare);
        }
    }else{
        checklistElement.querySelector('.checklist__container').append(checklistClone);
    }

    checklistClone.style.height='100px';
}

function repeatLoopShowChecklist(item,checklistClone=null) {
     if(item.subchecklist.length > 0){
        checklistClone.querySelector('.btnSeeMore').style.display='block';
        showChecklist(item.subchecklist,checklistClone); 
    }
}

function eventsBtnSeeOption() {
    [...ALL_ELEMENTS('.checklistContentCompare .btnOptions')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let id=parseInt(e.currentTarget.getAttribute('id'));
            let checklistNumber=parseInt(e.currentTarget.closest('.checklistExibition').getAttribute('checklistNumber'))
            let subchecklist=[];
            if(checklistNumber===1){
                subchecklist=checklistArray.subchecklist;
            }else{
                subchecklist=checklistArray2.subchecklist;
            }

            let checklist=filterChecklist(subchecklist,id,{}); 
            openModal(checklist.options);
        })
    });
}

function eventFilesNames() {
    [...ALL_ELEMENTS('.checklistContentCompare  .checklist__download--btn')].forEach((element)=>{
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


function openModal(options) {
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
    [...ALL_ELEMENTS('.checklistContentCompare .btnSeeMore')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let elementChecklist=e.currentTarget.closest('.checklistExibition');
            showSubchecklistContainerCompare(elementChecklist);
        })
    });
}

function eventsBtnSeeMoreCheck() {
    [...ALL_ELEMENTS('.checklistContentCompare .btnSeeMoreCheck')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let id=parseInt(e.currentTarget.getAttribute('id'));
            let checklistNumber=parseInt(e.currentTarget.closest('.checklistExibition')
                .getAttribute('checklistNumber'));
            
            let subchecklist=[];
            if(checklistNumber===1){
                subchecklist=checklistArray.subchecklist;
            }else{
                subchecklist=checklistArray2.subchecklist;
            }
            
            let checklist=filterChecklist(subchecklist,id,{}); 
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

function showSubchecklistContainerCompare(elementChecklist){
    let id=parseInt(elementChecklist.getAttribute('idElement'));
    let checklistNumber=parseInt(elementChecklist.getAttribute('checklistNumber'));
    let subchecklist=[];
    
    if(checklistNumber===1){
        subchecklist=checklistArray.subchecklist;
    }else{
        subchecklist=checklistArray2.subchecklist;
    }

    let checklist=filterChecklist(subchecklist,id,{});

    if(!elementChecklist.classList.contains('active')){
        let totalDefaultChecklist=elementChecklist.querySelectorAll('.checklist__container .checklistExibition').length;
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


function showSubchecklistContainerLoopCompare(checklistArray) {
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
            showSubchecklistContainerLoopCompare(item.subchecklist);
        }
    })
}

function increaseDefaultChecklistFatherCompare(item,extraHeight=65) {
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
        increaseDefaultChecklistFatherCompare(defaultChecklistFather,heightTotal); 
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