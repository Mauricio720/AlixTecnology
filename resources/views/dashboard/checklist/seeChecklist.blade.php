@extends('dashboard.base')
@extends('layouts.checklist')
@extends('layouts.carrousel')

@section('content')
    <input type="hidden" id="checklistArray" value="{{$allChecklists}}">
    <div class="card">
        <div class="card-header bg-dark text-white">
            <div class="row">
                <div class="col-6">
                    <input type="hidden" id="defaultChecklistId" value="{{$checklist->id}}">
                    <h5>Checklist: {{$defaultChecklist->name}}</h5>
                    <h5>Pontuação Total: {{$checklist->points}}</h5>
                    <h5>Observação: {{$checklist->observation==""?'Não informado':$checklist->observation}}</h5>
                    <h5>Cliente: {{$client->name}} {{$client->cnpj}}</h5>
                </div>

                <div class="col-6 d-flex justify-content-end">
                    <div class="btnDefault btnPrint" id="btnPrint">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="react-icons" width="100%" xmlns="http://www.w3.org/2000/svg" style="color: white;">
                            <path d="M360 180h304v152H360zm492 220H172c-6.6 0-12 5.4-12 12v292h132V500h440v204h132V412c0-6.6-5.4-12-12-12zm-24 84c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-40c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v40z"></path>
                            <path d="M852 332H732V120c0-4.4-3.6-8-8-8H300c-4.4 0-8 3.6-8 8v212H172c-44.2 0-80 35.8-80 80v328c0 17.7 14.3 32 32 32h168v132c0 4.4 3.6 8 8 8h424c4.4 0 8-3.6 8-8V772h168c17.7 0 32-14.3 32-32V412c0-44.2-35.8-80-80-80zM360 180h304v152H360V180zm304 664H360V568h304v276zm200-140H732V500H292v204H160V412c0-6.6 5.4-12 12-12h680c6.6 0 12 5.4 12 12v292z"></path><path d="M820 436h-40c-4.4 0-8 3.6-8 8v40c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-40c0-4.4-3.6-8-8-8z"></path></svg>
                    </div>
                    <a href="{{$historic_checklist_idClient==""?route('allChecklists'):route('historicChecklist',['idClient'=>$historic_checklist_idClient])}}" 
                        class="btnDefault btnBack" title="Voltar">
                        <img src="{{asset('storage/general_icons/back.png')}}" width="16" height="16">
                    </a>
                </div>
            </div>
        </div>
        
        <div class="card-body checklistContent"></div>
    </div>
@endsection

@section('javascript')
    <script src="{{ asset('js/seeChecklist.min.js') }}"></script>
@endsection