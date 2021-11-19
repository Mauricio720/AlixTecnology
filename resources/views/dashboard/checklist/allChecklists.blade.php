@extends('dashboard.base')

@section('content')
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-6">
                    <h4>Checklists</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
                   <a href="{{route('addChecklist')}}" class="btnDefault btnAdd" title="Adicionar Checklist" >
                        +
                    </a>
                </div>
            </div>
        </div>

        <div class="card-body">
            <table class="table table-bordered">
                <thead>
                    <th>Nome</th>
                    <th>Cliente</th>
                    <th>Pontuação</th>
                    <th>Observação</th>
                    <th>Usuário</th>
                    <th>Criado</th>
                    <th>Ações</th>
                </thead>
                <tbody>
               
                </tbody>
            </table>
        </div>
    </div>
@endsection

