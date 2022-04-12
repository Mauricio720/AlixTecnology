@extends('layouts.modal')

<link rel="stylesheet" href="{{asset('css/checklist.min.css')}}">

<div class="checklist">
    <div class="checklist__header">
        <div class="checklist__header__slot">
            <div class="checklist__title"></div>
        </div>
        <div class="checklist__header__slot checklist__header__actions">
            <div class="checklist__header__slot align-items-center justify-content-center d-none">
                <span class="mr-1">Quantidade:</span>
                <div class="checklist__header__quantity"></div>
            </div>

            <div class="checklist__header__slot align-items-center justify-content-center">
                <div class="checklist__header--optionsContainer">
                    <input class="d-flex checkGroupingChoice" type="radio" 
                        name="checkGroupingChoice" value="1"/>
                    <span class="ml-2 mr-2" for="checkradio">Sim</span>
                    <input class="d-flex mr-1 checkGroupingChoice" type="radio" 
                        name="checkGroupingChoice" value="2" checked/>
                    <span class="mr-2" for="checkradio">Não</span>
                </div>
            </div>
            
            <div class="checklist__header__slot justify-content-end">
                <div class="btnDefault btnAdd btnDefault--sm d-none" title="Adicionar">
                    +
                </div>
                <div class="btnDefault btnDefault--sm btnDelete d-none" title="Deletar Checklist"> 
                    <img src="{{asset('storage/general_icons/delete.png')}}" width="16" height="16">
                </div>
            </div>
        </div>
    </div>
    <div class="checklist__content">
        <div class="checklist__slot">
            <input class="form-control inputText" type="text"  placeholder="Digite o conteúdo da checklist">
            <input class="form-control inputDate" type="date">
            <input class="form-control inputNumber" type="number" step="0,01"
                placeholder="Digite o valor da checklist">
            <input class="inputFile" type="file" multiple>
        </div>
        <div class="checklist__slot checklistTypeChecklist" title=""></div>
        <div class="checklist__slot checklistPossiblePoints" title=""></div>
        <div class="checklist__slot checklistPoints" title=""></div>
        <div class="checklist__slot">
            <input style="display: block" class="form-control inputObservation" type="text" placeholder="Digite alguma observação">
        </div>
     </div>
    <div class="checklist__container"></div>
    <div class="alert alert-danger mt-2 d-none"></div>
    <div class="observationIcon">!</div>
</div>

<div class="checklistOption" style="margin-left: 95px;">
    <div class="checklist__content" >
        <div class="checklist__slot justify-content-start">
            <input type="checkbox" class="checklistOptionCheck mr-2 mb-2">
            <input type="radio" class="checklistOptionRadio mr-2 mb-2">
            <label class="optionName"></label>
        </div>
        <div class="checklist__slot justify-content-start checklistPoints" title=""></div>
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
    </div>
    <div class="checklist__options"></div>
    <div class="checklist__container">
        
    </div>
    <div class="observationIconMultiple">!</div>

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

        <div class="picturesCarrousel">
            <a href="./" download class="picture" data-toggle="modal" 
                data-target="#modalActions" data-toggle="tooltip" >
                <img src="{{asset('storage/checklists_files/3b917484f5e2754b094112d6fc26ebda.jpg')}}">
            </a>
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
            <div class="form-control valueChecklist d-none"></div>
            <div class="picturesCarrousel">
                <a href="./" download class="picture" data-toggle="modal" 
                    data-target="#modalActions" data-toggle="tooltip" >
                    <img src="{{asset('storage/checklists_files/3b917484f5e2754b094112d6fc26ebda.jpg')}}">
                </a>
            </div>
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

<div class="download__item">
    <div class="download__icon">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" 
            class="react-icons" height="90%" width="100%" xmlns="http://www.w3.org/2000/svg" 
            style="color: black;"><path d="M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
        </svg>
    </div>
    <a class="download__link" download></a>
</div>

<div class="checklistCompare"></div>

<form id="uploadFileForm" action="{{route('uploadFile')}}" 
    method="post" enctype="multipart/form-data">
    @csrf
</form>

