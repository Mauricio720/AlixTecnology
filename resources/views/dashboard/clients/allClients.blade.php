@extends('dashboard.base')

@section('content')
<div class="card bg-white">
    <div class="card-header bg-white">
        <div class="row">
            <div class="col-6">
                <h4>Todos clientes</h4>
            </div>
            <div class="col-6 d-flex justify-content-end">
                <a href="{{route('addClientView')}}" class="btnDefault btnAdd" title="Adicionar Usuário" >
                    +
                </a>
            </div>
        </div>
    </div>
    
    <div class="card-header bg-white text-white">
        <form class="card" method="get">
            <div class="card-header bg-dark">
                <h5>Pesquisar:</h5>
            </div>
            <div class="card-body row">
                <div class="col-6">
                    <div class="form-group">
                        <input class="form-control" type="text" name="name" 
                            placeholder="Nome do Cliente" value="{{$name!=""?$name:''}}">
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="text" name="cnpj" 
                            placeholder="Cnpj do cliente" value="{{$cnpj!=""?$cnpj:''}}"
                            onkeyup="mascara('##.###.###/####-##',this,event,true)" maxlength="18">
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="text" name="responsible_general" 
                            placeholder="Nome/Telefone Responsavel Geral" value="{{$responsible_general!=""?$responsible_general:''}}">
                    </div>
                    <div class="form-group">
                        <input class="btn btn-success w-50" type="submit" value="Filtrar">
                    </div>
                </div>

                <div class="col-6">
                    <div class="form-group">
                        <input class="form-control" type="text" name="technical_manager" 
                            placeholder="Nome/Telefone Responsavel Técnico" value="{{$technical_manager!=""?$technical_manager:''}}">
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="text" name="financial_officer" 
                            placeholder="Nome/Telefone Responsavel Financeiro" value="{{$financial_officer!=""?$financial_officer:''}}">
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="text" name="contact_monitoring" 
                            placeholder="Nome/Telefone Responsavel Financeiro" value="{{$contact_monitoring!=""?$contact_monitoring:''}}">
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div class="card-body">
        <table class="table table-bordered">
            <thead class="table-dark">
                <th>Nome</th>
                <th>Cnpj</th>
                <th>Geral</th>
                <th>Técnico</th>
                <th>Financeiro</th>
                <th>Monitoramento</th>
                <th>Ações</th>
            </thead>
            <tbody>
                @foreach($allClients as $client)
                    <tr>
                        <td>{{$client->name}}</td>
                        <td>{{$client->cnpj}}</td>
                        <td>{{$client->responsible_general_name}}</td>
                        <td>{{$client->technical_manager_name}}</td>
                        <td>{{$client->financial_officer_name}}</td>
                        <td>{{$client->contact_monitoring_name}}</td>
                        <td class="d-flex">
                            <a href="{{route('addChecklist',['idClient'=>$client->id])}}" class="btnDefault 
                                    btnDefault--sm btnAdd" 
                                title="Adicionar Checklist">
                                +
                            </a>

                            <a href="{{route('historicChecklist',['idClient'=>$client->id])}}" class="btnDefault btnDefault--sm " 
                                title="Histórico checklist" >
                                <img src="{{asset('storage/general_icons/history.png')}}" width="16" height="16"/>
                            </a>
                            
                            <a href="{{route('seeClient',['id'=>$client->id])}}" class="btnDefault btnDefault--sm btnSeeMore" 
                                title="Ver Mais Cliente">
                                ...
                            </a>

                            <a href="{{route('editClientView',['id'=>$client->id])}}" class="btnDefault btnDefault--sm btnEdit" 
                                title="Editar Cliente" >
                                <img src="{{asset('storage/general_icons/pencil.png')}}" width="16" height="16">
                            </a>

                            <a href="{{route('deleteClient',['id'=>$client->id])}}" class="btnDefault btnDefault--sm btnDelete" title="Deletar Usuário" 
                                msg="Tem certeza que deseja excluir esse cliente?">
                                <img src="{{asset('storage/general_icons/delete.png')}}" width="16" height="16">
                            </a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div class="card-footer">
        {{$allClients->links()}}
    </div>
</div>

@endsection