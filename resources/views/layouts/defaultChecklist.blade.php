@extends('layouts.modal')

<link rel="stylesheet" href="{{asset('css/defaultChecklist.min.css')}}">

<div class="optionsDefaultChecklist">
    <div class="defaultChecklist__content">
        <div class="defaultChecklist__slot">
            <input class="form-control optionName" type="text" placeholder="Nome da opção">
        </div>
        
        <div class="defaultChecklist__slot">
            <input class="form-control mr-1" type="number" placeholder="Porcentagem Pontos">
        </div>
        
        <div class="defaultChecklist__slot">
            <input class="form-control" type="number" placeholder="Pontos">
        </div>
        
        <div class="btnDefault btnDefault--sm btnChoose" disabled style="background-color: green;" title="Correto">
            <img src="{{asset('storage/general_icons/checkbox.png')}}" width="100%">
        </div>

        <div class="btnDefault btnDefault--sm btnDeleteChoose" style="background-color: red;" title="Deletar">
            <img src="{{asset('storage/general_icons/delete.png')}}" width="80%">
        </div>
        
    </div>
</div>

<div class="optionsDefaultChecklistExibition">
    <div class="defaultChecklist__content">
        <div class="defaultChecklist__slot">
            <div class="form-control optionName"></div>
        </div>
        
        <div class="defaultChecklist__slot">
            <div class="form-control mr-1 optionPercentage"></div>
        </div>
        
        <div class="defaultChecklist__slot">
            <div class="form-control optionPoints"></div>
        </div>
    </div>
</div>

<div class="defaultChecklist">
    <div class="defaultChecklist__content">
        <div class="defaultChecklist__slot">
            <input class="form-control" type="text" placeholder="Digite o nome da checklist">
        </div>
        <div class="defaultChecklist__slot">
            <select class="form-control">
                <option value="">Selecione Tipo Checklist</option>
                <option value="0">Agrupamento</option>
                <option value="7">Agrupamento (Dupla Escolha)</option>
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
            <div class="btnDefault btnDefault--sm btnDuplicate d-none" title="Duplicavel">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="react-icons" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg" style="color: black">
                    <path fill-rule="evenodd" d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z" clip-rule="evenodd"></path>
                    <path fill-rule="evenodd" d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z" clip-rule="evenodd"></path>
                </svg>
            </div>
            <div class="btnDefault btnDefault--sm btnSeeMore" title="Ver Mais Checklist">
                ...
            </div>

            <div class="btnDefault btnDefault--sm btnAddOptions" title="Adicionar Opções" 
                data-toggle="modal" data-target="#modalActions" data-toggle="tooltip">
                ++
            </div>

            <div class="btnDefault btnAdd btnDefault--sm btnAddDefaultChecklist" title="Adicionar" style="display: none">
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

<form id="formChecklist" style="display: none;">
    <div class="form-group">
        <label>Nome Checklist</label>
        <div class="form-control nameChecklist"></div>
    </div>
    <div class="form-group">
        <label>Tipo Checklist</label>
        <div class="form-control typeChecklist"></div>
    </div>
    <div class="form-group">
        <label>Porcentagem Checklist</label>
        <div class="form-control pointsPercentageChecklist"></div>
    </div>
    <div class="form-group">
        <label>Pontos Checklist</label>
        <div class="form-control pointsChecklist"></div>
    </div>
    <div class="form-group">
        <label>Observação Checklist</label>
        <div class="form-control observationChecklist"></div>
    </div>
</form>

<div id="only_one_choose_points" style="display: none;">
    <input type="checkbox">
    <label class="only_one_choose_label">Pontuação única (Escolha varias opções mas só irá 
            valer a pontuação total da checklist)</label>
</div>

<div id="only_one_choose" style="display: none;">
    <input type="checkbox">
    <label class="only_one_choose_label">Escolha única (Escolha apenas uma opção valendo a pontuação total da checklist)</label>
</div>

<div class="defaultChecklistExibition">
    <div class="defaultChecklist__content">
        <div class="defaultChecklist__slot">
            <div class="form-control nameChecklist"></div>
        </div>
        <div class="defaultChecklist__slot">
            <div class="form-control typeChecklist"></div>
        </div>
        
        <div class="defaultChecklist__slot">
            <div class="form-control w-50 mr-1 pointsPercentage"></div>
            <div class="form-control w-50 points"></div>
        </div>
        <div class="defaultChecklist__slot">
            <div class="form-control observation"></div>
        </div>
        <div class="defaultChecklist__slot defaultChecklist__slot--auto">
            <div class="btnDefault btnDefault--sm btnOptions" title="Ver Opções" style="display: none;"
                data-toggle="modal" data-target="#modalActions" data-toggle="tooltip">
                ++
            </div>

            <div class="btnDefault btnDefault--sm btnSeeMore" title="Ver Mais Checklist" 
                style="display: none; background-color:transparent">
                <img src="{{asset('storage/general_icons/seeMore.png')}}" width="100%">
            </div>

            <div class="btnDefault btnDefault--sm btnSeeMoreCheck" title="Ver Mais Detalhes Checklist"
                data-toggle="modal" data-target="#modalActions" data-toggle="tooltip">
                ...
            </div>
        </div>
    </div>
    <div class="defaultChecklist__container">
        
    </div>
</div>