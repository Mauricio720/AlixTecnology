@extends('dashboard.base')
@extends('layouts.checklist')

@section('content')
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-6">
                    <h4>Adicionar Checklist</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <a href="{{route('allChecklists')}}" class="btnDefault btnBack" title="Voltar">
                        <img src="{{asset('storage/general_icons/back.png')}}" width="16" height="16">
                    </a>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h4>Selecione o cliente:</h4>
                        </div>
                        <div class="col-6 d-flex justify-content-end">
                            <a href="{{route('addClientView',['registerChecklist'=>true])}}" class="btnDefault btnAdd" title="Adicionar Cliente" >
                                +
                            </a>
                        </div>
                    </div>
                </div>

                <div class="card-header">
                    <form class="row">
                        <div class="col-6 d-flex">
                            <div class="form-group w-75">
                                <input class="form-control" type="text" name="nameCnpj" 
                                    placeholder="Digite o nome ou o CNPJ do cliente"
                                    value="{{$nameCnpj!=""?$nameCnpj:""}}">
                            </div>
                            <div class="form-group w-25">
                                <input class="btn btn-success" type="submit" value="Pesquisar">
                            </div>
                        </div>
                        <div class="col-6"></div>
                    </form>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <th></th>
                            <th>Nome</th>
                            <th>Cnpj</th>
                            <th>Geral</th>
                            <th>Técnico</th>
                            <th>Financeiro</th>
                            <th>Monitoramento</th>
                        </thead>
                        <tbody>
                            @foreach($allClients as $client)
                                <tr>
                                    <td>
                                        <input type='radio' name="clientRadio" value="{{$client->id}}">
                                    </td>
                                    <td>{{$client->name}}</td>
                                    <td>{{$client->cnpj}}</td>
                                    <td>{{$client->responsible_general_name}}</td>
                                    <td>{{$client->technical_manager_name}}</td>
                                    <td>{{$client->financial_officer_name}}</td>
                                    <td>{{$client->contact_monitoring_name}}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                <div class="card-footer">
                    {{$allClients->links()}}
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h4>Selecione a checklist padrão:</h4>
                        </div>
                        <div class="col-6 d-flex justify-content-end">
                            <a href="{{route('addDefaultChecklist',['registerChecklist'=>true])}}" class="btnDefault btnAdd" title="Adicionar Cliente" >
                                +
                            </a>
                        </div>
                    </div>
                </div>

                <div class="card-header">
                    <form class="row">
                        <div class="col-6 d-flex">
                            <div class="form-group w-75">
                                <input class="form-control" type="text" name="nameDefaultChecklist" 
                                    placeholder="Digite o nome da checklist padrão"
                                    value="{{$nameDefaultChecklist!=""?$nameDefaultChecklist:""}}">
                            </div>
                            <div class="form-group w-25">
                                <input class="btn btn-success" type="submit" value="Pesquisar">
                            </div>
                        </div>
                        <div class="col-6"></div>
                    </form>
                </div>

                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <th></th>
                            <th>Nome</th>
                            <th>Pontuação Total</th>
                            <th>Observação</th>
                            <th>Criado</th>
                        </thead>
                        <tbody>
                            @foreach ($allDefaultChecklist as $defaultChecklist)
                                <tr>
                                    <td>
                                        <input type='radio' class="defaultCheckRadio" 
                                            name="defaultCheckRadio" value="{{$defaultChecklist->id}}">
                                    </td>
                                    <td>{{$defaultChecklist->name}}</td>
                                    <td>{{$defaultChecklist->points}}</td>
                                    <td>{{$defaultChecklist->observation==""?"Não Informado":$defaultChecklist->observation}}</td>
                                    <td>{{$defaultChecklist->created_at->format('d/m/Y - H:i:s')}}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                <div class="card-footer">
                    {{$allDefaultChecklist->links()}}
                </div>
            </div>

            <div class="card" id="cardContentChecklist">
                <div class="card-header">
                    <h5 class="defaultChecklist__name"></h5>
                    <h5 class="defaultChecklist__points"></h5>
                    <h5 class="defaultChecklist__possiblePoints"></h5>
                    <h5 class="defaultChecklist__observation"></h5>
                </div>
                <div class="card-body" id="contentChecklist"></div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('javascript')
    <script src="{{ asset('js/checklist.min.js') }}" defer></script>
@endsection