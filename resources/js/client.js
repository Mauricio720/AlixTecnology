ONE_ELEMENT('#cepInput').addEventListener('focusout',(e)=>{
    let cep=e.currentTarget.value;
    fillAddrees(cep);
});

async function fillAddrees(cep) {
    const r= await fetch(BASE_URL+"/get_address/"+cep);
    const json=await r.json();
    
    ONE_ELEMENT('input[name=street]').value=json.address.logradouro;
    ONE_ELEMENT('input[name=neighboorhood]').value=json.address.bairro;
    ONE_ELEMENT('input[name=state]').value=json.address.localidade;
}