var idDefaultChecklistSelected=0;
var numberChecklistSelected=0;
var linkCompare=BASE_URL+'/historic_checklist_compare/';

[...ALL_ELEMENTS('.checkboxChecklist')].forEach((element)=>{
    element.addEventListener('change',(e)=>{
        let idDefaultChecklist=e.currentTarget.getAttribute('idDefaultChecklist');
        if(e.currentTarget.checked){
            numberChecklistSelected++;
            
            if(numberChecklistSelected===2){
                disabledCheck();
                if(idDefaultChecklistSelected===idDefaultChecklist){
                    ONE_ELEMENT('#btnCompare').style.display='block';
                }
            }else{
                ONE_ELEMENT('#btnCompare').style.display='none';
                enabledCheck();
            }
            idDefaultChecklistSelected=idDefaultChecklist;
        }else{
            numberChecklistSelected--;
            if(numberChecklistSelected < 2){
                enabledCheck();
                ONE_ELEMENT('#btnCompare').style.display='none';

            }
        }
    })
})

function disabledCheck() {
    [...ALL_ELEMENTS('.checkboxChecklist')].forEach((element)=>{
        if(element.checked===false){
            element.disabled=true;
        }
    })
}

function enabledCheck() {
    [...ALL_ELEMENTS('.checkboxChecklist')].forEach((element)=>{
        element.disabled=false;
    })
};

ONE_ELEMENT('#btnCompare').addEventListener('click',(e)=>{
    e.preventDefault();

    let idChecklist1=getIdsCheck()[0];
    let idChecklist2=getIdsCheck()[1];

    linkCompare=linkCompare+`${idChecklist1}/${idChecklist2}`;
    window.location = linkCompare;    
    
});

function getIdsCheck() {
    let idsArray=[];
    [...ALL_ELEMENTS('.checkboxChecklist')].forEach((element)=>{
        if(element.checked){
           let id=element.getAttribute('idChecklist');
            idsArray.push(id);
        }
    })

    return idsArray;
}