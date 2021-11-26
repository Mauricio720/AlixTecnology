@extends('layouts.modal')

<link rel="stylesheet" href="{{asset('css/checklist.min.css')}}">

<div class="checklist">
    <div class="checklist__title"></div>
    <div class="checklist__content">
        <div class="checklist__slot">
            <input class="form-control inputText" type="text"  placeholder="Digite o conteúdo da checklist">
            <input class="form-control inputDate" type="date">
            <input class="form-control inputNumber" type="number" placeholder="Digite o valor da checklist">
            <input class="inputFile" type="file">
        </div>
        <div class="checklist__slot checklistTypeChecklist" title=""></div>
        <div class="checklist__slot checklistPossiblePoints" title=""></div>
        <div class="checklist__slot checklistPoints" title=""></div>
        <div class="checklist__slot checklistObservation" title=""></div>
        <div class="checklist__slot">
            <input style="display: block" class="form-control inputObservation" type="text" placeholder="Digite alguma observação">
        </div>
    </div>
    <div class="checklist__container">
        
    </div>
    <div class="alert alert-danger mt-2 d-none"></div>
 
</div>

<div class="checklistOption" style="margin-left: 95px;">
    <div class="checklist__content" >
        <div class="checklist__slot justify-content-start">
            <input type="checkbox" class="checklistOptionCheck mr-2 mb-1">
            <input type="radio" class="checklistOptionRadio mr-2 mb-1">
            <label class="optionName"></label>
        </div>
        <div class="checklist__slot justify-content-start checklistPoints" title=""></div>
        <div class="checklist__slot justify-content-start checklistObservation" title=""></div>
        <div class="checklist__slot">
            <input style="display: block" class="form-control inputObservation" type="text" placeholder="Digite alguma observação">
        </div>
    </div>
</div>

<div class="checklist checklistMultiple">
    <div class="checklist__content" style="border-bottom: 1px dashed #e9e9e9;">
        <div class="checklist__slot checklistTitleSlot" title=""></div>
        <div class="checklist__slot checklistTypeChecklist" title=""></div>
        <div class="checklist__slot checklistPossiblePoints" title=""></div>
        <div class="checklist__slot checklistPoints" title=""></div>
        <div class="checklist__slot checklistObservation" title=""></div>
    </div>
    <div class="checklist__options"></div>
    <div class="checklist__container">
        
    </div>
</div>

<div class="checklists__point">
    <div class="checklists__point-slot bg-dark text-white">
        <label>Pontos Possiveis:</label>
        <div class="checklist__pointTotal ml-2">1000</div>
    </div>
    <div class="checklists__point-slot">
        <label>Pontos Obtidos:</label>
        <div class="checklist__pointObtained ml-2">1000</div>
    </div>
</div>

<form id="formChecklistExibition" style="display: none;">
    <div class="form-group">
        <label>Nome Checklist</label>
        <div class="form-control nameChecklist"></div>
    </div>

    <div class="form-group">
        <label>Valor Preenchido</label>
        <div class="form-control valueChecklist">
            <a href="http://" download="" style="display: none;"></a>
        </div>
    </div>

    <div class="form-group">
        <label>Tipo Checklist</label>
        <div class="form-control typeChecklist"></div>
    </div>

    <div class="form-group">
        <label>Pontos Checklist</label>
        <div class="form-control pointsChecklist"></div>
    </div>

    <div class="form-group">
        <label>Pontos Obtidos</label>
        <div class="form-control pointsObtainedChecklist"></div>
    </div>

    <div class="form-group">
        <label>Observação Checklist</label>
        <div class="form-control observationChecklist"></div>
    </div>
</form>

<div class="checklistExibition">
    <div class="row">
        <div class="col-6">
            <div class="checklist__title" title=""></div>
        </div>
        <div class="col-6 d-flex justify-content-end">
            <div class="checklist__date" title=""></div>
        </div>
    </div>
    <div class="checklist__content">
        <div class="checklist__slot checklist__slot--value">
            <div class="form-control valueChecklist" title="">
                <a style="display: none" href="http://" download=""></a>
            </div>
        </div>
        
        <div class="checklist__slot">
            <div class="form-control typeChecklist" title=""></div>
        </div>

        <div class="checklist__slot">
            <div class="form-control points" title=""></div>
        </div>
        
        <div class="checklist__slot">
            <div class="form-control pointsObtained" title=""></div>
        </div>
        
        <div class="checklist__slot">
            <div class="form-control observation" title=""></div>
        </div>
        <div class="checklist__slot checklist__slot--auto">
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
    <div class="checklist__container">
        
    </div>
</div>

<div class="optionsChecklistExibition">
    <div class="checklist__content">
        <div class="checklist__slot align-items-start flex-column">
            <label for="optionName">Nome opção</label>
            <div class="form-control optionName"></div>
        </div>

        <div class="checklist__slot  align-items-start flex-column">
            <label for="optionSelected">Selecionado</label>
            <div class="form-control optionSelected"></div>
        </div>
        
        <div class="checklist__slot  align-items-start flex-column">
            <label for="optionPoints">Pontos</label>
            <div class="form-control optionPoints"></div>
        </div>

        <div class="checklist__slot  align-items-start flex-column">
            <label for="optionPointsObtained">Pontos Obtidos</label>
            <div class="form-control optionPointsObtained"></div>
        </div>
    </div>
</div>

<div class="checklistCompare"></div>

