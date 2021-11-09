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
        
        <div class="card-header bg-white alert-header d-none">
            <div class="alert alert-danger alert-dismissible fade show text-center">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>

        <div class="card-body checklistContent">
            
        </div>

        <div class="card-footer">
            <center><button class="btn btn-success w-25 d-none" id="btnSave">Salvar</button></center>
        </div>
    </div>
@endsection

@section('javascript')
    <script src="{{ asset('js/defaultChecklist.min.js') }}" defer></script>
@endsection