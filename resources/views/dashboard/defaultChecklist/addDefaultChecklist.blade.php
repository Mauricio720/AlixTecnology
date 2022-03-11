@extends('layouts.defaultChecklist')
@extends('dashboard.base')

@section('content')

   <!--Formulario para guardar o progresso da criação da checklist e poder continuar depois-->
    <form id="formChecklistsJson" action="{{route('saveDefaultChecklist')}}" method="post">
        @csrf
        <input type="hidden" name="idDefaultCheckJson" id="idDefaultCheckJson" value="{{$default_checkjson_id}}">
        <input type="hidden" name="checklist_names" id="checklist_names">
        <input type="hidden" name="lastIdIncrement" id="lastIdIncrement" value="{{$lastIdIncrement}}">
        <input type="hidden" name="lastIdIncrementOption" id="lastIdIncrementOption" value="{{$lastIdIncrementOption}}">
        <input type="hidden" name="default_checklist_json" id="default_checklist_json" value="{{$default_checklist_json}}">
    </form>

    <!--Salva e finaliza em definitivo a criação da checklist-->
   <form id="formChecklists" action="{{route('addDefaultChecklist')}}" method="post" style="display: none">
        @csrf
        <input type="hidden" name="idDefaultCheckJson" value="{{$default_checkjson_id}}">
        <input type="hidden" name="allChecklists" id="allChecklists" value="allChecklists"> 
        <input type="hidden" name="registerChecklist" value="{{$registerChecklist}}">
        <input type="hidden" name="default_checklist_json_oficial" id="default_checklist_json_oficial" value="{{$default_checklist_json}}">
        <input type="hidden" name="lastIdIncrement" id="lastIdIncrementOficial" value="{{$lastIdIncrement}}">
        <input type="hidden" name="lastIdIncrementOption" id="lastIdIncrementOptionOficial" value="{{$lastIdIncrementOption}}">
    </form>

    <div class="card">
        <div class="card-header bg-dark text-white">
            <div class="row">
                <div class="col-6">
                    <h4>Clonar checklist padrão:</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <a href="{{$registerChecklist==""?route('defaultChecklist'):route('addChecklist')}}" class="btnDefault btnBack" title="Voltar">
                        <img src="{{asset('storage/general_icons/back.png')}}" width="16" height="16">
                    </a>
                    
                </div>
            </div>
        </div>

        <div class="card-header">
            <form class="row">
                <div class="col-6 d-flex">
                    <div class="form-group w-75">
                        <input class="form-control" type="text" name="nameChecklist" 
                            placeholder="Digite o nome da checklist padrão"
                            value="{{$nameChecklist!=""?$nameChecklist:""}}">
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
                                <input type="hidden" 
                                    value="{{$defaultChecklist->json}}"
                                    lastIdIncrement="{{$defaultChecklist->last_id_increment}}"
                                    lastIdIncrementOption="{{$defaultChecklist->last_id_increment_option}}"
                                >
                                <input type='radio' class="defaultCheckRadio" name="defaultCheckRadio" value="{{$defaultChecklist->id}}">
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

    <div class="card">
        <div class="card-header bg-dark text-white">
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

        <div class="card-footer d-flex justify-content-center">
            <button class="btn btn-info m-1 w-25 d-none" id="btnSave">Salvar</button>
            <button class="btn btn-success m-1 w-25 d-none" id="btnFinish">Finalizar</button>
        </div>
    </div>
    
    <div class="actionsScroll">
        <button class="btn btn-success m-1 btnScrollToTop">Ir Até O Topo</button>
        <button class="btn btn-success m-1 btnScrollToBotttom">Ir Até Finalizar/Salvar</button>
    </div>

@endsection

@section('javascript')
    
    <script src="{{ asset('js/defaultChecklist.min.js') }}" defer></script>
@endsection