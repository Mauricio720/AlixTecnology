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
