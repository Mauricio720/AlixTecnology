ONE_ELEMENT('#btnAddUser').addEventListener('click',(e)=>{
    openModal("Adicionar Usuário",ADD_USER_URL,false);
});

[...ALL_ELEMENTS('.btnEdit')].forEach(element=>{
    element.addEventListener('click',(e)=>{
        let id=e.currentTarget.getAttribute('id');
        openModal('Editar usuário',EDIT_USER_URL,true,id);    
    })
})

function openModal(title,actionUrl,edit,id=null){
    let form=ONE_ELEMENT('#formUser');
    form.style.display='flex';
    form.setAttribute('action',actionUrl);
    clearInputs();
    
    
    ONE_ELEMENT('#idUser').value=id;
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").append(form);
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").innerHTML=title;
    ONE_ELEMENT('#btnAddModal').style.display=edit===false?'block':'none';
    ONE_ELEMENT('#btnEditModal').style.display=edit?'block':'none';

    if(edit){
        form.style.display="none";
        LOADING_ELEMENT.style.display="flex";
        ONE_ELEMENT('#modalActions').querySelector(".modal-body").append(LOADING_ELEMENT);
        fillUserInfo(id,form);
       
    }

    ONE_ELEMENT('#btnAddModal').addEventListener('click',()=>{
        form.submit();
    });

    ONE_ELEMENT('#btnEditModal').addEventListener('click',()=>{
        form.submit();
    });
}

async function fillUserInfo(id,form) {
    const r= await fetch(BASE_URL+"/get_user/"+id);
    const json=await r.json();
    ONE_ELEMENT('#idUser').value=json.user.id;
    ONE_ELEMENT('#name').value=json.user.name;
    ONE_ELEMENT('#email').value=json.user.email;
    ONE_ELEMENT('#permission').value=json.user.permission;   
    ONE_ELEMENT('#password').value=json.user.password;    

    form.style.display="flex";
    LOADING_ELEMENT.style.display='none';
}

function  clearInputs() {
    ONE_ELEMENT('#idUser').value="";
    ONE_ELEMENT('#name').value="";
    ONE_ELEMENT('#email').value="";
    ONE_ELEMENT('#permission').value="";   
    ONE_ELEMENT('#password').value="";    
}