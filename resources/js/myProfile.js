ONE_ELEMENT('.myProfileBtn').addEventListener('click',(e)=>{
    let id=e.currentTarget.getAttribute('id');
    openModalMyProfile('Meu Perfil',id);    
})

function openModalMyProfile(title,id){
    let form=ONE_ELEMENT('#formUser');
    form.style.display="none";
    form.setAttribute('action',MY_PROFILE_URL);

    ONE_ELEMENT('#idUser').value=id;
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").innerHTML="";
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").append(form);
    ONE_ELEMENT("#modalActions").querySelector(".modal-title").innerHTML=title;
    ONE_ELEMENT('#btnAddModal').style.display='none';
    ONE_ELEMENT('#btnEditModal').style.display='block';

    LOADING_ELEMENT.style.display='flex';
    ONE_ELEMENT('#modalActions').querySelector(".modal-body").append(LOADING_ELEMENT);
    fillUserInfoMyProfile(id,form);

    ONE_ELEMENT('#btnEditModal').addEventListener('click',()=>{
        if(validationUser()){
            form.submit();
        }
    });
}

function validationUser(){
    let name=ONE_ELEMENT('#name').value;
    let email=ONE_ELEMENT('#email').value;
    let permission=ONE_ELEMENT('#permission').value;   
    let password=ONE_ELEMENT('#password').value; 

    if(name==="" || email==="" || permission===0 || password===""){
        ONE_ELEMENT('#modalActions').querySelector(".modal-error-header").style.display='block';
        ONE_ELEMENT('#modalActions').querySelector(".modal-error-content").innerHTML="Preencha os campos em branco!";
        return false;
    }else{
        return true;
    }

}

async function fillUserInfoMyProfile(id,form) {
    const r= await fetch(BASE_URL+"/api/get_user/"+id);
    const json=await r.json();
    ONE_ELEMENT('#idUser').value=json.user.id;
    ONE_ELEMENT('#name').value=json.user.name;
    ONE_ELEMENT('#email').value=json.user.email;
    ONE_ELEMENT('#permission').value=json.user.permission;   
    ONE_ELEMENT('#password').value=json.user.password;    

    form.style.display="flex";
    LOADING_ELEMENT.style.display='none';
}