@extends('layouts.defaultChecklist')
@extends('dashboard.base')


@section('content')
   <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-6">
                    <h4>Adicionar Checklist Padrão</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <div class="btnDefault btnAdd" id="btnAddDefaultCheck" title="Adicionar Checklist" >
                        +
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body checklistContent">
            
        </div>
    </div>
@endsection

@section('javascript')
    <script src="{{ asset('js/defaultChecklist.min.js') }}" defer></script>
@endsection