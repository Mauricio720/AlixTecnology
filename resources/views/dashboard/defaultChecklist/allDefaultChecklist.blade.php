@extends('dashboard.base')

@section('content')
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-6">
                    <h4>Checklist Padrão</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <a href="{{route('addDefaultChecklist')}}" class="btnDefault btnAdd" title="Adicionar Usuário" >
                        +
                    </a>
                </div>
            </div>
        </div>
        <div class="card-body">

        </div>
    </div>
@endsection