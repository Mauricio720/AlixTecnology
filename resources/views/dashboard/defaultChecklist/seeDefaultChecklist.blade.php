@extends('dashboard.base')
@extends('layouts.defaultChecklist')

@section('content')
    <input type="hidden" id="defaultChecklistArray" value="{{$allDefaultChecklist}}">
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-6">
                    <h4>Checklist Padrão: {{$defaultChecklist->name}}</h4><br>
                    <h5>Pontuação Total: {{$defaultChecklist->points}}</h5><br>
                    <h5>Observação: {{$defaultChecklist->observation==""?'Não informado':$defaultChecklist->observation}}</h5>
                </div>

                <div class="col-6 d-flex justify-content-end">
                    <a href="{{route('defaultChecklist')}}" class="btnDefault btnBack" title="Voltar">
                        <img src="{{asset('storage/general_icons/back.png')}}" width="16" height="16">
                    </a>
                </div>
            </div>
        </div>
        
        <div class="card-body checklistContent"></div>
    </div>
@endsection

@section('javascript')
    <script src="{{ asset('js/seeDefaultChecklist.min.js') }}"></script>
@endsection