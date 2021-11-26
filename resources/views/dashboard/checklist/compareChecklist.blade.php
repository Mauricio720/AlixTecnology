@extends('dashboard.base')
@extends('layouts.defaultChecklist')
@extends('layouts.checklist')

@section('content')
    <input type="hidden" id="defaultChecklistArray" value="{{$defaultChecklistArray}}">

    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-6">
                    <h4>Comparações Checklist</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <a href="{{route('historicChecklist',['idClient'=>$client->id])}}" class="btnDefault btnBack" title="Voltar">
                        <img src="{{asset('storage/general_icons/back.png')}}" width="16" height="16">
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

            <input type="hidden" id="checklistArray1" value="{{$checklist1}}">
            <input type="hidden" id="checklistArray2" value="{{$checklist2}}">

            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h4>Checklist Base</h4>
                        </div>
                        <div class="col-6 d-flex justify-content-end"></div>
                    </div>
                </div>

                <div class="card-body checklistContent"></div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h4>Comparações</h4>
                        </div>
                        <div class="col-6 d-flex justify-content-end"></div>
                    </div>
                </div>

                <div class="card-body checklistContentCompare">
                </div>
            </div>
        </div>
    </div>

@endsection

@section('javascript')
    <script src="{{ asset('js/seeDefaultChecklist.min.js') }}"></script>
    <script src="{{ asset('js/seeChecklistCompare.min.js') }}"></script>
@endsection