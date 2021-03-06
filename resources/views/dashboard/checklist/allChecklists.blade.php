@extends('dashboard.base')

@section('content')
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-6">
                    <h4>Checklists</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
                   <a href="{{route('addChecklistView')}}" class="btnDefault btnAdd" title="Adicionar Checklist" >
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
                                <input class="form-control" type="text" name="pointsObtained" 
                                    placeholder="Pontuação obtida checklist" value="{{$pointsObtained!=""?$pointsObtained:''}}">
                            </div>
                            <div class="form-group">
                                <input class="btn btn-success w-50" type="submit" value="Filtrar">
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="form-group">
                                <input class="form-control" type="text" name="clientName" 
                                    placeholder="Nome Cliente" value="{{$clientName!=""?$clientName:''}}">
                            </div>
                            <div class="form-group">
                                <input class="form-control" type="text" name="observationChecklist" 
                                    placeholder="Observação checklist" value="{{$observationChecklist!=""?$observationChecklist:''}}">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

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
                        @foreach ($allChecklistInProgress as $checklist)
                            <tr>
                                <td>{{$checklist->names}}</td>
                                <td>{{$checklist->created_at->format('d/m/Y H:i:s')}}</td>
                                <td class="d-flex">
                                    <a href="{{route('addChecklist',
                                        ['checklistRegister'=>false,'checklist_json_id'=>$checklist->id])}}" 
                                        class="btnDefault btnDefault--sm btnSeeMore" title="Ver Mais">
                                        ...
                                    </a>
                                    <a href="{{route('deleteCheckJson',['id'=>$checklist->id])}}" class="btnDefault btnDefault--sm btnDelete" title="Deletar Checklist" 
                                        msg="Tem certeza que deseja excluir essa checklist em progresso?">
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
                    <h4>Finalizado</h4>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead class="table-dark">
                            <th>Nome</th>
                            <th>Cliente</th>
                            <th>Pontuação</th>
                            <th>Observação</th>
                            <th>Usuário</th>
                            <th>Criado</th>
                            <th>Ações</th>
                        </thead>
                        <tbody>
                            @foreach ($allChecklist as $checklist)
                                <tr>
                                    <td style="max-width:200px;">{{$checklist->checklistName}}</td>
                                    <td>{{$checklist->clientName}}</td>
                                    <td>
                                        {{"Pontuação Total: ".number_format($checklist->points,2,',','.')}}<br>
                                        {{"Pontuação Obtida: ".number_format($checklist->pointsObtained,2,',','.')}}
                                    </td>
                                    <td>{{$checklist->observation==""?"Não Informado":$checklist->observationChecklist}}</td>
                                    <td>{{$checklist->userName}}</td>
                                    <td>{{$checklist->created_at->format('d/m/Y H:i:s')}}</td>
                                    <td class="d-flex">
                                        <a href="{{route('getChecklistById',['id'=>$checklist->id])}}" 
                                            class="btnDefault btnDefault--sm btnSeeMore" title="Ver Mais">
                                            ...
                                        </a>
                                        <a href="{{route('deleteChecklist',['id'=>$checklist->id])}}" class="btnDefault btnDefault--sm btnDelete" title="Deletar Checklist" 
                                            msg="Tem certeza que deseja excluir essa checklist?">
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



