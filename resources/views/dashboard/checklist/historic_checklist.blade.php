@extends('dashboard.base')

<style>
    #btnCompare{
        position: fixed;
        bottom: 5px;
        right: 5px;
        color: white;
        display: none;
    }
</style>

@section('content')
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-6">
                    <h4>Histórico Checklist</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
                   <a href="{{route('addChecklistView')}}" class="btnDefault btnAdd" title="Adicionar Checklist" >
                        +
                    </a>
                </div>
            </div>
        </div>

        <div class="card-body">
            <div class="card">
                <div class="card-header bg-white">
                    <h5>Informações Cliente</h5>
                </div>

                <div class="card-body">
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label for="name">Nome Cliente</label>
                                <div class="form-control">
                                    {{$client->name}}
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="cnpj">Cnpj Cliente</label>
                                <div class="form-control">
                                    {{$client->cnpj}}
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="responsible_general_name">Nome Responsável Geral</label>
                                <div class="form-control">
                                    {{$client->responsible_general_name}}
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label for="responsible_general_phone">Telefone Responsável Geral</label>
                                <div class="form-control">
                                    {{$client->responsible_general_phone}}
                                </div>
                            </div>
        
                            <div class="form-group">
                                <label for="technical_manager_name">Nome Responsável Técnico</label>
                                <div class="form-control">
                                    {{$client->technical_manager_name}}
                                </div>
                            </div>
        
                            <div class="form-group">
                                <label for="technical_manager_phone">Telefone Responsável Técnico</label>
                                <div class="form-control">
                                    {{$client->technical_manager_phone}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h5 class="mt-4">Checklist - {{$year}}</h5>
                        </div>
                        <div class="col-6 d-flex justify-content-end">
                            <div class="form-group d-flex">
                                <div class="form-group">
                                    <label>Inicial</label>
                                    <input class="form-control" type="date" 
                                        name="startDate" value="{{$startDate!=""?$startDate:$startDate}}">
                                </div>
                                <div class="form-group">
                                    <label>Final</label>
                                    <input class="form-control" type="date" 
                                        name="finalDate" value="{{$finalDate!=""?$finalDate:$finalDate}}">
                                </div>
                                <div class="form-group" style="margin-top: 28px;">
                                    <input class="btn btn-success" type="submit" value="Filtrar">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <th></th>
                            <th>Nome</th>
                            <th>Pontuação</th>
                            <th>Observação</th>
                            <th>Criado</th>
                            <th>Ações</th>
                        </thead>
                        <tbody>
                            @foreach ($allChecklist as $checklist)
                                <tr>
                                    <td>
                                        <input type="checkbox" class="checkboxChecklist"
                                            idDefaultChecklist="{{$checklist->id_default_checklist}}"
                                            idChecklist="{{$checklist->id}}">
                                    </td>
                                    <td>{{$checklist->checklistName}}</td>
                                    <td>
                                        {{"Pontuação Total: ".$checklist->points}}<br>
                                        {{"Pontuação Obtida: ".$checklist->pointsObtained}}
                                    </td>
                                    <td>{{$checklist->observation==""?"Não Informado":$checklist->observationChecklist}}</td>
                                    <td>{{$checklist->created_at->format('d/m/Y H:i:s')}}</td>
                                    <td class="d-flex">
                                        <a href="{{route('getChecklistById',['id'=>$checklist->id
                                            ,'historic_checklist_idClient'=>$client->id])}}" 
                                            class="btnDefault btnDefault--sm btnSeeMore" title="Ver Mais">
                                            ...
                                        </a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
        <button class="btn btn-success" id="btnCompare">Comparar</button>
    </div>
@endsection

@section('javascript')
   <script src="{{ asset('js/historicChecklist.min.js') }}" defer></script>
@endsection

