@extends('dashboard.base')

@section('content')
<div class="card bg-white">
    <div class="card-header bg-white">
        <div class="row">
            <div class="col-6">
                <h4>Todos usuários</h4>
            </div>
            <div class="col-6 d-flex justify-content-end">
                <a href="{{route('addClientView')}}" class="btnDefault btnAdd" title="Adicionar Usuário" >
                    +
                </a>
            </div>
        </div>
    </div>
    
    <div class="card-header bg-white">
        <div class="row">
            <div class="col-4">
               
            </div>
            <div class="col-8"></div>
        </div>
    </div>

    <div class="card-body">
        <table class="table table-bordered">
            <thead>
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
                            <a href="{{route('editClientView',['id'=>$client->id])}}" class="btnDefault btnDefault--sm btnEdit" 
                                title="Editar Cliente" id="{{$client->id}}" >
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