<link rel="stylesheet" href="{{asset('css/defaultChecklist.min.css')}}">

<div class="defaultChecklist">
    <div class="defaultChecklist__content">
        <div class="defaultChecklist__slot">
            <input class="form-control" type="text" placeholder="Digite o nome da checklist">
        </div>
        <div class="defaultChecklist__slot">
            <select class="form-control">
                <option value="">Selecione Tipo Checklist</option>
                <option value="1">Texto</option>
                <option value="2">Upload</option>
                <option value="3">Multiplas Escolhas</option>
                <option value="4">Dupla Escolha (Ex: Sim ou Não)</option>
                <option value="5">Numerica</option>
                <option value="6">Data</option>
            </select>
        </div>
        
        <div class="defaultChecklist__slot">
            <input class="form-control w-50 mr-1" type="number" placeholder="pontos %" disabled min="1">

            <input class="form-control w-50" type="number" placeholder="Pontuação" min="1">
        </div>
        <div class="defaultChecklist__slot">
            <input class="form-control" type="text" placeholder="Observação">
        </div>
        <div class="defaultChecklist__slot defaultChecklist__slot--auto">
            <div class="btnDefault btnDefault--sm btnSeeMore" title="Ver Mais Checklist">
                ...
            </div>

            <div class="btnDefault btnAdd btnDefault--sm btnAddDefaultChecklist" title="Adicionar">
                +
            </div>

            <div class="btnDefault btnDefault--sm btnDelete" title="Deletar Checklist" >
                <img src="{{asset('storage/general_icons/delete.png')}}" width="16" height="16">
            </div>
        </div>
    </div>
    <div class="defaultChecklist__container">
        
    </div>
</div>