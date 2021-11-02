@extends('dashboard.base')

@section('content')
    <div class="card bg-white">
        <div class="card-header bg-white">
            <div class="row">
                <div class="col-6">
                    <h4>Editar Cliente</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <a href="{{route('editClientView',['id'=>$client->id])}}" class="btnDefault btnEdit" 
                        title="Editar Cliente" id="{{$client->id}}" >
                        <img src="{{asset('storage/general_icons/pencil.png')}}" width="16" height="16">
                    </a>

                    <a href="{{route('allClients')}}" class="btnDefault btnBack" title="Voltar">
                        <img src="{{asset('storage/general_icons/back.png')}}" width="16" height="16">
                    </a>
                </div>
            </div>
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
            <form method="POST" action="{{route('editClient')}}">
                @csrf
                <input type="hidden" name="id" value="{{$client->id}}">
                <div class="row">
                    <div class="col-6">
                        <div class="card">
                            <div class="card-header bg-white">
                                <h5>Informações Cliente</h5>
                            </div>

                            <div class="card-body">
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

                        <div class="card">
                            <div class="card-header bg-white">
                                <h5>Endereço</h5>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="street">Cep</label>
                                    <div class="form-control">
                                        {{$client->cep}}
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="street">Rua</label>
                                    <div class="form-control">
                                        {{$client->street}}
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="number">Numero</label>
                                    <div class="form-control">
                                        {{$client->number}}
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="neighboorhood">Bairro</label>
                                    <div class="form-control">
                                        {{$client->neighboorhood}}
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="state">Cidade</label>
                                    <div class="form-control">
                                        {{$client->state}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-6">
                        <div class="card">
                            <div class="card-header bg-white">
                                <h5>Informações Cliente</h5>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="financial_officer_name">Nome Responsável Financeiro</label>
                                    <div class="form-control">{{$client->financial_officer_name}}</div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="financial_officer_phone">Telefone Responsável Financeiro</label>
                                    <div class="form-control">
                                        {{$client->financial_officer_phone}}
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="financial_officer_name">Nome Responsável Monitoramento</label>
                                    <div class="form-control">
                                        {{$client->contact_monitoring_name}}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="financial_officer_name">Telefone Responsável Monitoramento</label>
                                    <div class="form-control">
                                        {{$client->contact_monitoring_phone}}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" type="text" disabled style="opacity: 0;">
                                </div>
                                <div class="form-group">
                                    <input class="form-control" type="text" disabled style="opacity: 0;">
                                </div>
                                <div class="form-group">
                                    <input class="form-control" type="text" disabled style="opacity: 0;">
                                </div>
                            </div>
                        </div>
                      </div>
                </div>
            </div>
            <div class="card-footer">
                <center><input class="btn btn-success w-25" type="submit" value="Salvar"></center>
            </div>
        </form>
    </div>
@endsection

@section('javascript')
    <script src="{{ asset('js/client.min.js') }}" defer></script>
@endsection