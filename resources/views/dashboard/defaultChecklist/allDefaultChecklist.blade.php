@extends('dashboard.base')

@section('content')
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-6">
                    <h4>Checklists Padrão</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
                   
                    <a href="{{route('addDefaultChecklist')}}" class="btnDefault btnAdd" title="Adicionar Checklist Padrão" >
                        +
                    </a>
                </div>
            </div>
        </div>

        <div class="card-header">
            <form class="card" method="get">
                <div class="card-header bg-dark text-white">
                    <h5>Pesquisar:</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <input class="form-control" type="text" name="nameChecklist" 
                                    placeholder="Nome da checklist" value="{{$nameChecklist!=""?$nameChecklist:''}}">
                            </div>
                            <div class="form-group">
                                <input class="form-control" type="text" name="pointsChecklist" 
                                    placeholder="Pontuação checklist" value="{{$pointsChecklist!=""?$pointsChecklist:''}}">
                            </div>
                            <div class="form-group">
                                <input class="form-control" type="text" name="observationChecklist" 
                                    placeholder="Observação checklist" value="{{$observationChecklist!=""?$observationChecklist:''}}">
                            </div>
                            <div class="form-group">
                                <input class="btn btn-success w-50" type="submit" value="Filtrar">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        @if($errors->any())
            <div class="card-header bg-white">
                <div class="alert alert-danger alert-dismissible fade show text-center">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    {{$errors->first()}}
                </div>
            </div>
        @endif 

        <div class="card-body">
            <div class="card">
                <div class="card-header">
                    <h4>Em progresso</h4>
                </div>   
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead class="table-dark">
                            <th>Nomes</th>
                            <th>Criado</th>
                            <th>Ações</th>
                        </thead>
                        <tbody>
                        @foreach ($allDefaultChecklistInProgress as $defaultChecklist)
                            <tr>
                                <td>{{$defaultChecklist->names}}</td>
                                <td>{{$defaultChecklist->created_at->format('d/m/Y H:i:s')}}</td>
                                <td class="d-flex">
                                    <a href="{{route('addDefaultChecklist',
                                        ['checklistRegister'=>false,'default_checklist_json_id'=>$defaultChecklist->id])}}" 
                                        class="btnDefault btnDefault--sm btnSeeMore" title="Ver Mais">
                                        ...
                                    </a>
                                    <a href="{{route('deleteDefaultCheckJson',['id'=>$defaultChecklist->id])}}" class="btnDefault btnDefault--sm btnDelete" title="Deletar Usuário" 
                                        msg="Tem certeza que deseja excluir essa checklist padrão em progresso?">
                                        <img src="{{asset('storage/general_icons/delete.png')}}" width="16" height="16">
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h4>Finalizadas</h4>
                </div>   
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead class="table-dark">
                            <th>Nome</th>
                            <th>Pontuação Total</th>
                            <th>Observação</th>
                            <th>Criado</th>
                            <th>Ações</th>
                        </thead>
                        <tbody>
                        @foreach ($allDefaultChecklist as $defaultChecklist)
                            <tr>
                                <td>{{$defaultChecklist->name}}</td>
                                <td>{{$defaultChecklist->points}}</td>
                                <td style="max-width: 150px;">{{$defaultChecklist->observation==""?"Não Informado":$defaultChecklist->observation}}</td>
                                <td>{{$defaultChecklist->created_at->format('d/m/Y H:i:s')}}</td>
                                <td class="d-flex">
                                    <a href="{{route('getDefaultChecklistById',['id'=>$defaultChecklist->id])}}" 
                                        class="btnDefault btnDefault--sm btnSeeMore" title="Ver Mais">
                                        ...
                                    </a>
                                    <a href="{{route('deleteDefaultChecklist',['id'=>$defaultChecklist->id])}}" class="btnDefault btnDefault--sm btnDelete" title="Deletar Usuário" 
                                        msg="Tem certeza que deseja excluir essa checklist padrão?">
                                        <img src="{{asset('storage/general_icons/delete.png')}}" width="16" height="16">
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection