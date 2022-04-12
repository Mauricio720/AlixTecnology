var checklist=ONE_ELEMENT('.checklistExibition');
var checklistCompare=ONE_ELEMENT('.checklistCompare');
var checklistArray=JSON.parse(ONE_ELEMENT('#checklistArray1').value);
var checklistArray2=JSON.parse(ONE_ELEMENT('#checklistArray2').value);
var typeChecklistArray=['Agrupamento','Texto','Upload','Multiplas Escolhas','Dupla Escolha','Numerica','Data',
'Agrupamento (dupla escolha)','Maior/Igual Que', 'Menor/Igual Que'];
var optionsChecklist=ONE_ELEMENT('.optionsChecklistExibition');
var downloadChecklistItem=ONE_ELEMENT('.download__item');
var formChecklist=ONE_ELEMENT('#formChecklistExibition');
var carrousel=ONE_ELEMENT('#carousel');
var idChecklist1=parseInt(ONE_ELEMENT('#idChecklist1').value);
var idChecklist2=parseInt(ONE_ELEMENT('#idChecklist2').value);


showChecklist(checklistArray.subchecklist); 
showChecklist2(checklistArray2.subchecklist); 
eventsBtnSeeMore();
eventsBtnSeeOption(); 
eventsBtnSeeMoreCheck(); 
eventFilesNames();
eventBtnPrint();

function showChecklist(checklistArray,checklistElement=null) {
   checklistArray.map((item)=>{
        checklistCompareClone=checklistCompare.cloneNode(true);

        let checklistClone=checklist.cloneNode(true);
        checklistClone.style.display='flex'
        
        if(item.id_type_checklist===0 || item.id_type_checklist===3 || item.id_type_checklist===4){
            checklistClone.querySelector('.checklist__slot--value').remove();
        }

        fillInputsAndAttributeChecklist(checklistClone,item,1);
        appendChecklist(checklistClone,checklistElement,checklistCompareClone,false,item);
        appendOptions(item,checklistClone); 
        repeatLoopShowChecklist(item,checklistClone,1); 

        checklistClone.querySelector('.btnSeeMoreCheck').setAttribute('id',item.id);
        checklistClone.querySelector('.btnSeeMoreCheck').setAttribute('checklistNumber',1);
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

        fillInputsAndAttributeChecklist(checklistClone,item,2);
        let checklistCompareElement=ALL_ELEMENTS('.checklistContentCompare .checklistCompare')[index];
        appendChecklist(checklistClone,checklistElement,checklistCompareElement,true,item);
        appendOptions(item,checklistClone); 
        repeatLoopShowChecklist(item,checklistClone,2); 

        checklistClone.querySelector('.btnSeeMoreCheck').setAttribute('id',item.id);
        checklistClone.querySelector('.btnSeeMoreCheck').setAttribute('checklistNumber',2);
    });
}


function fillInputsAndAttributeChecklist(checklistClone,item,checklistNumber) {
    checklistClone.setAttribute('idElement',item.id);
    checklistClone.setAttribute('checklistNumber',checklistNumber);
    checklistClone.setAttribute('id',"check"+item.id);

    checklistClone.querySelector('.checklist__title').innerHTML=item.name;
    checklistClone.querySelector('.checklist__date').innerHTML=item.created_at;

    if(item.id_type_checklist===2){
        if(item.file_name.length > 0){
            fillPicturesAndDocumentsModal(checklistClone,item.file_name);
        }else{
            checklistClone.querySelector('.valueChecklist').classList.remove('d-none');
            checklistClone.querySelector('.valueChecklist').innerHTML='Nenhum arquivo inserido';
        }
       
    }else{
        if(item.id_type_checklist !== 0 && item.id_type_checklist!==3 && item.id_type_checklist!==4 && item.id_type_checklist!==7){
            checklistClone.querySelector('.valueChecklist').classList.remove('d-none');
            let value='Nenhum Valor Inserido';
            if(item.value !== ''){
                value=item.value;
            }
            checklistClone.querySelector('.valueChecklist').innerHTML=value;
        }else{
            if(item.value === ''){
                let slotValueDiv=checklistClone.querySelector('.checklist__slot--value');
                if(slotValueDiv !==null){
                    slotValueDiv.style.display='none';
                }
            }
        }
    }

    checklistClone.querySelector('.points').innerHTML="Pontos Possiveis: "+item.points.toFixed(2);
    checklistClone.querySelector('.pointsObtained').innerHTML="Pontos Obtidos: "+item.pointsObtained.toFixed(2);
    checklistClone.querySelector('.observation').innerHTML=item.observation===""?
        'Nenhuma observação':item.observation;
}

function fillPicturesAndDocumentsModal(checklistClone,files){
    let picturesCarrousel=checklistClone.querySelector('.picturesCarrousel');
    picturesCarrousel.style.display='flex';
    let pictureItem=picturesCarrousel.querySelectorAll('.picture')[0].cloneNode(true);
    picturesCarrousel.innerHTML='';
    
    files.forEach((file,index)=>{
        let picture=pictureItem.cloneNode(true);
        let img=picture.querySelector('img');
        
        if(verifyImgs(file)){
            picture.setAttribute('href',`${BASE_URL}/storage/checklists_files/${file}`);
            img.setAttribute('src',`${BASE_URL}/storage/checklists_files/${file}`);
        }else{
            img.setAttribute('src',`${BASE_URL}/storage/general_icons/file.png`);
            picture.setAttribute('href',`${BASE_URL}/storage/general_icons/${file}`);
        }

        picture.setAttribute('key',index);
        picturesCarrousel.append(picture);
    });

    eventPictureShowModal(picturesCarrousel,files);
}

function eventPictureShowModal(picturesCarrousel,files){
    let allPictures=[...picturesCarrousel.querySelectorAll('.picture')];

    allPictures.forEach((picture)=>{
        picture.addEventListener('click',(e)=>{
            let key=parseInt(e.currentTarget.getAttribute('key'));
            openModalFiles(files,key);
        })
    })
}

function openModalFiles(files,key) {
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").innerHTML="Clique para baixar";
    ONE_ELEMENT('#btnAddModal').style.display='none';
    ONE_ELEMENT('#btnEditModal').style.display='none';
    
    ONE_ELEMENT('#modalActions .modal-body').append(carrousel);

    let carouselItem=carrousel.querySelector('.carousel-item').cloneNode(true);
    let carouselInner=carrousel.querySelector('.carousel-inner');
    carouselInner.innerHTML='';

    files.forEach((file,index) => {
        let carouselImg=carouselItem.cloneNode(true);
        if(verifyImgs(file)){
            carouselImg.querySelector('img').setAttribute('src',`${BASE_URL}/storage/checklists_files/${file}`);
            carouselImg.setAttribute('href',`${BASE_URL}/storage/checklists_files/${file}`);
        }else{
            carouselImg.querySelector('img').setAttribute('src',`${BASE_URL}/storage/general_icons/file.png`);
            carouselImg.setAttribute('href',`${BASE_URL}/storage/checklists_files/${file}`);
        }
        
        carouselInner.append(carouselImg);
        if(index===key){
            carouselImg.classList.add('active');
        }else{
            carouselImg.classList.remove('active');
        }
    }); 

    carrousel.classList.remove('d-none');
}

function verifyImgs(file){
    let ext=file.split('.')[1];
    let extArray=['jpg','jpeg','png','gif','svg'];

    let result=extArray.find((item)=>{
        return item===ext;
    });

    if(result !== undefined){
        return true;
    }else{
        return false;
    }
}


function appendOptions(item,checklistClone) {
    if(item.options.length > 0){
        item.options.forEach((option)=>{
            let optionsChecklistClone=optionsChecklist.cloneNode(true);
            optionsChecklistClone.querySelector('.optionName').innerHTML=option.name;
            optionsChecklistClone.querySelector('.optionSelected').innerHTML=option.selected?'Sim':'Não';
            optionsChecklistClone.querySelector('.optionPointsObtained').innerHTML=option.pointsObtained.toFixed(2);
            optionsChecklistClone.querySelector('.optionPoints').innerHTML=option.points.toFixed(2);
            optionsChecklistClone.style.display='flex';
            checklistClone.style.height='auto';
            checklistClone.querySelector('.checklist__container').append(optionsChecklistClone);
        })
    }
}


function appendChecklist(checklistClone,checklistElement,checklistCompare,isSecondChecklist=false,item) {
    if(checklistElement === null){
        checklistCompare.append(checklistClone);
        if(isSecondChecklist===false){
            ONE_ELEMENT('.checklistContentCompare').append(checklistCompare);
        }
    }else{
        checklistElement.querySelector('.checklist__container').append(checklistClone);
    }

    if(item.file_name.length > 0){
        checklistClone.style.height='auto';
    }else{
        checklistClone.style.height='100px';
    }
}

function repeatLoopShowChecklist(item,checklistClone=null,numberChecklist) {
     if(item.subchecklist.length > 0){
        checklistClone.querySelector('.btnSeeMore').style.display='block';
        if(numberChecklist===1){
            showChecklist(item.subchecklist,checklistClone); 
        }else{
            showChecklist2(item.subchecklist,checklistClone); 
        }
    }
}

function eventBtnPrint(){
    ONE_ELEMENT('#btnPrint').addEventListener('click',()=>{
        ONE_ELEMENT('#card_base').style.display='none';

        [...ALL_ELEMENTS('.checklistContentCompare .checklistExibition .btnSeeMore')].forEach((element)=>{
            if(element.style.display==='block'){
                let elementChecklist=element.closest('.checklistExibition');
                if(!elementChecklist.classList.contains('active')){
                    showSubchecklistContainerCompare(elementChecklist);
                }
            }
        });

        window.print();
        ONE_ELEMENT('#card_base').style.display='block';
    })
}

function eventFilesNames() {
    [...ALL_ELEMENTS('.checklistContentCompare .checklist__download--btn')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let id=parseInt(e.currentTarget.getAttribute('id'));
            let checklist=filterChecklist(checklistArray.subchecklist,id,{}); 
            openModalFiles(checklist.file_name);
        })
    });
}

function eventPictureShowModal(picturesCarrousel,files){
    let allPictures=[...picturesCarrousel.querySelectorAll('.picture')];

    allPictures.forEach((picture)=>{
        picture.addEventListener('click',(e)=>{
            let key=parseInt(e.currentTarget.getAttribute('key'));
            openModalFiles(files,key);
        })
    })
}

function openModalFiles(files,key) {
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").innerHTML="Clique para baixar";
    ONE_ELEMENT('#btnAddModal').style.display='none';
    ONE_ELEMENT('#btnEditModal').style.display='none';
    
    ONE_ELEMENT('#modalActions .modal-body').append(carrousel);

    let carouselItem=carrousel.querySelector('.carousel-item').cloneNode(true);
    let carouselInner=carrousel.querySelector('.carousel-inner');
    carouselInner.innerHTML='';

    files.forEach((file,index) => {
        let carouselImg=carouselItem.cloneNode(true);
        if(verifyImgs(file)){
            carouselImg.querySelector('img').setAttribute('src',`${BASE_URL}/storage/checklists_files/${file}`);
            carouselImg.setAttribute('href',`${BASE_URL}/storage/checklists_files/${file}`);
        }else{
            carouselImg.querySelector('img').setAttribute('src',`${BASE_URL}/storage/general_icons/file.png`);
            carouselImg.setAttribute('href',`${BASE_URL}/storage/checklists_files/${file}`);
        }
        
        carouselInner.append(carouselImg);
        if(index===key){
            carouselImg.classList.add('active');
        }else{
            carouselImg.classList.remove('active');
        }
    }); 

    carrousel.classList.remove('d-none');
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
            let numberChecklist=elementChecklist.getAttribute('checklistnumber');
            showSubchecklistContainerCompare(elementChecklist,numberChecklist);
        })
    });
}

function eventsBtnSeeMoreCheck() {
    [...ALL_ELEMENTS('.checklistContentCompare .btnSeeMoreCheck')].forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let id=parseInt(e.currentTarget.getAttribute('id'));
            let checklistNumber=parseInt(e.currentTarget.getAttribute('checklistNumber'));
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
        formChecklist.querySelector('.valueChecklist').style.display='none';
        if(item.file_name.length > 0){
            let picturesCarrousel=formChecklist.querySelector('.picturesCarrousel');
            picturesCarrousel.style.display='flex';
            let pictureItem=picturesCarrousel.querySelectorAll('.picture')[0].cloneNode(true);
            picturesCarrousel.innerHTML='';
            picturesCarrousel.style.maxWidth='initial';

            item.file_name.forEach((file,index)=>{
                    let picture=pictureItem.cloneNode(true);
                    let img=picture.querySelector('img');
                    
                    if(verifyImgs(file)){
                        picture.setAttribute('href',`${BASE_URL}/storage/checklists_files/${file}`);
                        img.setAttribute('src',`${BASE_URL}/storage/checklists_files/${file}`);
                    }else{
                        img.setAttribute('src',`${BASE_URL}/storage/general_icons/file.png`);
                        picture.setAttribute('href',`${BASE_URL}/storage/general_icons/${file}`);
                    }

                    picture.setAttribute('key',index);
                    picturesCarrousel.append(picture);
                    eventPictureShowModal(picturesCarrousel,item.file_name);

                });
            }
        }else{
            if(item.id_type_checklist !== 0 && item.id_type_checklist!==3 && item.id_type_checklist!==4){
                formChecklist.querySelector('.valueChecklist').style.display='flex';
                formChecklist.querySelector('.valueChecklist').innerHTML=item.value;
            }else{
                formChecklist.querySelector('.valueChecklist').closest('.form-group').style.display="none";
            }
        }

    formChecklist.querySelector('.pointsChecklist').innerHTML="Pontos: "+item.points;
    formChecklist.querySelector('.pointsObtainedChecklist').innerHTML="Pontos Obtidos: "+item.pointsObtained;
    formChecklist.querySelector('.observationChecklist').innerHTML=item.observation===""?
        'Nenhuma observação':item.observation;

    formChecklist.style.display='block';

    ONE_ELEMENT('#modalActions').querySelector(".modal-body").append(formChecklist);

}

function showSubchecklistContainerCompare(elementChecklist,numberChecklist){
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
        let totalDefaultChecklist=elementChecklist.querySelector('.checklist__container').children.length;
        let margin=35*totalDefaultChecklist;
        let heightTotal=100+getTotalHeight(elementChecklist)+margin;
        
        elementChecklist.style.height=`${heightTotal}px`;
        elementChecklist.classList.add('active');
        checklist.active=true;
        
        let idChecklistPrincipal="";
        if(numberChecklist==="1"){
            idChecklistPrincipal=idChecklist1;
        }else{
            idChecklistPrincipal=idChecklist2;
        }

        if(checklist.idChecklist != null && checklist.idChecklist !== idChecklistPrincipal){
            let checklistFather=[];
            
            if(numberChecklist==='1'){
                checklistFather=filterChecklist(checklistArray.subchecklist,checklist.idChecklist,{}); 
            }else{
                checklistFather=filterChecklist(checklistArray2.subchecklist,checklist.idChecklist,{}); 
            }

            let checklistElementFather=getElementChecklist(checklistFather.id);
            checklistElementFather.style.height='auto';
        }

    }else{
        elementChecklist.style.height="100px";
        elementChecklist.classList.remove('active');
        checklist.active=false;
    }
}


function getElementChecklist(idChecklist){
    let allChecklistExibition=ONE_ELEMENT('.checklistContentCompare').querySelectorAll('.checklistExibition');
    let checklistElement='';
    
    [...allChecklistExibition].forEach((checkExibition)=>{
        let idElement=parseInt(checkExibition.getAttribute('idelement'));
        if(idChecklist===idElement){
            checklistElement=checkExibition;
        }
    });

  
    return checklistElement;
}


function getTotalHeight(elementChecklist){
    let totalHeight=0;
    let checklistElements=[...elementChecklist.querySelector('.checklist__container').children];
    
    checklistElements.forEach((checklist)=>{
        let height=checklist.offsetHeight;
        totalHeight+=height;
    })
    
    return totalHeight;
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