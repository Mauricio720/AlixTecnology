@extends('layouts.modal')

<link rel="stylesheet" href="{{asset('css/checklist.min.css')}}">

<div class="checklist">
    <div class="checklist__title"></div>
    <div class="checklist__content">
        <div class="checklist__slot">
            <input class="form-control inputText" type="text">
            <input class="form-control inputDate" type="date">
            <input class="form-control inputNumber" type="number">
            <input class="inputFile" type="file">
        </div>
        <div class="checklist__slot checklistTypeChecklist"></div>
        <div class="checklist__slot checklistPossiblePoints"></div>
        <div class="checklist__slot checklistPoints"></div>
        <div class="checklist__slot checklistObservation"></div>
    </div>
    <div class="checklist__container">
        
    </div>
</div>

<div class="checklistOption">
    <div class="checklist__content">
        <div class="checklist__slot">
            <input type="checkbox" class="checklistOptionCheck mr-1">
            <input type="radio" class="checklistOptionRadio mr-1">
            <label class="optionName"></label>
        </div>
        <div class="checklist__slot checklistPoints"></div>
        <div class="checklist__slot checklistObservation"></div>
    </div>
</div>

<div class="checklist checklistMultiple">
    <div class="checklist__content">
        <div class="checklist__slot checklistTitleSlot"></div>
        <div class="checklist__slot checklistTypeChecklist"></div>
        <div class="checklist__slot checklistPossiblePoints"></div>
        <div class="checklist__slot checklistPoints"></div>
        <div class="checklist__slot checklistObservation"></div>
    </div>
    <div class="checklist__options"></div>
    <div class="checklist__container">
        
    </div>
</div>

<form id="formChecklist" style="display: none;">
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
    <div class="checklist__title"></div>
    <div class="checklist__content">
        <div class="checklist__slot checklist__slot--value">
            <div class="form-control valueChecklist">
                <a style="display: none" href="http://" download=""></a>
            </div>
        </div>
        
        <div class="checklist__slot">
            <div class="form-control typeChecklist"></div>
        </div>

        <div class="checklist__slot">
            <div class="form-control points"></div>
        </div>
        
        <div class="checklist__slot">
            <div class="form-control  pointsObtained"></div>
        </div>
        
        <div class="checklist__slot">
            <div class="form-control observation"></div>
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
