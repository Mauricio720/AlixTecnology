@extends('dashboard.base')
@extends('layouts.checklist')

@section('content')
    <input type="hidden" id="checklistArray" value="{{$allChecklists}}">
    <div class="card">
        <div class="card-header bg-dark text-white">
            <div class="row">
                <div class="col-6">
                    <h5>Checklist: {{$defaultChecklist->name}}</h5>
                    <h5>Pontuação Total: {{$checklist->points}}</h5>
                    <h5>Observação: {{$checklist->observation==""?'Não informado':$checklist->observation}}</h5>
                </div>

                <div class="col-6 d-flex justify-content-end">
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