@extends('dashboard.base')
@extends('layouts.checklist')

@section('content')
    <form style="display: none;" action="{{route('addChecklist')}}" enctype="multipart/form-data" 
        method="post" id="formChecklistAdd">
        @csrf
        <input type="hidden" name="idClient" id="idClient">
        <input type="hidden" name="checklistArray" id="checklistArray">
        <input type="hidden" name="idChecklistJson" value={{$checkjson_id}}>

    </form>

    <form style="display: none;" action="{{route('addChecklistJson')}}" enctype="multipart/form-data" 
        method="post" id="formChecklistAddJson">
        @csrf
        
        <input type="hidden" name="idChecklistJson" value={{$checkjson_id}}>
        <input type="hidden" name="idDefaultChecklist" id="idDefaultChecklist" value={{$idDefaultChecklist}}>
        <input type="hidden" name="idChecklist" id="idChecklist" value={{$checkjson_id}}>
        <input type="hidden" name="checklist_name" id="checklist_name" value={{$checkjson_name}}>
        <input type="hidden" name="idClientToJson" id="idClientToJson" value={{$idClientToJson}}>
        <input type="hidden" name="checklistArrayJson" id="checklistArrayJson" value="{{$checklistArrayJson}}">
        <input type="hidden" name="groupíngArrayJson" id="groupingArrayJson" value="{{$groupíngArrayJson}}">
        <input type="hidden" name="lastIdIncrement" id="lastIdIncrement" value="{{$lastIdIncrement}}">

    </form>

    <div class="card">
        <div class="card-header bg-dark text-white">
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
        <div class="card-header bg-white alert-header d-none">
            <div class="alert alert-danger alert-dismissible fade show text-center">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="alert-content"></div>
            </div>
        </div>
        <div class="card-body">
            <div class="card">
                <div class="card-header bg-dark text-white">
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
                        <input type="hidden" name="nameDefaultChecklist" 
                            value="{{$nameDefaultChecklist!=""?$nameDefaultChecklist:""}}"/>
                        
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
                        </thead>
                        <tbody>
                            @foreach($allClients as $client)
                                <tr>
                                    <td>
                                        <input type='radio' class="clientRadio" name="clientRadio" 
                                            value="{{$client->id}}" {{$idClient!=""?'checked':''}}
                                            {{$idClientToJson!="" && $idClientToJson==$client->id?'checked':''}}>
                                    </td>
                                    <td>{{$client->name}}</td>
                                    <td>{{$client->cnpj}}</td>
                                   
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
                <div class="card-header bg-dark text-white">
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
                        <input type="hidden" name="nameCnpj" value="{{$nameCnpj!=""?$nameCnpj:""}}"/>
                        
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
                                        <input type='radio' class="defaultCheckRadio" name="defaultCheckRadio" 
                                            value="{{$defaultChecklist->id}}" 
                                            {{$idDefaultChecklist!="" && $defaultChecklist->id==$idDefaultChecklist?'checked':''}}>
                                    </td>
                                    <td>{{$defaultChecklist->name}}</td>
                                    <td>{{$defaultChecklist->points}}</td>
                                    <td style="max-width: 150px">{{$defaultChecklist->observation==""?"Não Informado":$defaultChecklist->observation}}</td>
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

            <div class="card" id="card-loading" style="display: none">

            </div>

            <div class="card" id="cardContentChecklist" style="display: none;">
                <div class="card-header bg-dark text-white">
                    <div class="row">
                        <div class="col-6">
                            <h5 class="defaultChecklist__name"></h5>
                            <h5 class="defaultChecklist__points"></h5>
                        </div>
                        <div class="col-6 text-right">
                            <h5 class="defaultChecklist__possiblePoints"></h5>
                            <h5 class="defaultChecklist__observation"></h5>
                        </div>
                    </div>
                </div>
                <div class="card-body" id="contentChecklist"></div>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-center">
            <button class="btn btn-info w-25 mr-1" id="btnSave">Salvar</button>
            <button class="btn btn-success w-25"  id="btnFinish">Finalizar</button>
        </div>
    </div>

    <div class="actionsScroll">
        <button class="btn btn-success m-1 btnScrollToBotttom">Ir Até Finalizar/Salvar</button>
    </div>
</div>
@endsection

@section('javascript')
    <script>
        var csrfToken="{{csrf_token()}}"; 
    </script>
    
    <script src="https://unpkg.com/js-big-decimal@1.3.1/dist/web/js-big-decimal.min.js"></script>
    <script  src="{{ asset('js/checklist.min.js') }}" defer></script>
@endsection