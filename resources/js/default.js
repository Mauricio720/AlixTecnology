window.onload = function() {
    ONE_ELEMENT('.loadingSystem').style.display="none";
}

let allDeleteBtns=[...ALL_ELEMENTS('.btnDelete')];

allDeleteBtns.forEach((element)=>{
    element.addEventListener('click',(event)=>{
    event.preventDefault();
    var href=event.currentTarget.getAttribute('href');
    
    new Swal({
        title: event.currentTarget.getAttribute('msg'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'Cancelar',
        confirmButtonText: 'Sim',

        }).then((result) => {
            if (result.value) {
                window.location = href;                
            }
        })
    })
})