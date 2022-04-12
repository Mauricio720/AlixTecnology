@extends('dashboard.base')
@extends('layouts.defaultChecklist')
@extends('layouts.checklist')
@extends('layouts.carrousel')


@section('content')
    <input type="hidden" id="defaultChecklistArray" value="{{$defaultChecklistArray}}">

    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-6">
                    <h4>Comparações Checklist</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <div class="btnDefault btnPrint" id="btnPrint">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="react-icons" width="100%" xmlns="http://www.w3.org/2000/svg" style="color: white;">
                            <path d="M360 180h304v152H360zm492 220H172c-6.6 0-12 5.4-12 12v292h132V500h440v204h132V412c0-6.6-5.4-12-12-12zm-24 84c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-40c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v40z"></path>
                            <path d="M852 332H732V120c0-4.4-3.6-8-8-8H300c-4.4 0-8 3.6-8 8v212H172c-44.2 0-80 35.8-80 80v328c0 17.7 14.3 32 32 32h168v132c0 4.4 3.6 8 8 8h424c4.4 0 8-3.6 8-8V772h168c17.7 0 32-14.3 32-32V412c0-44.2-35.8-80-80-80zM360 180h304v152H360V180zm304 664H360V568h304v276zm200-140H732V500H292v204H160V412c0-6.6 5.4-12 12-12h680c6.6 0 12 5.4 12 12v292z"></path><path d="M820 436h-40c-4.4 0-8 3.6-8 8v40c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-40c0-4.4-3.6-8-8-8z"></path></svg>
                    </div>
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
            <input type="hidden" id="idChecklist1" value="{{$idChecklist1}}">
            <input type="hidden" id="checklistArray2" value="{{$checklist2}}">
            <input type="hidden" id="idChecklist2" value="{{$idChecklist2}}">

            <div class="card" id="card_base">
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