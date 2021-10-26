@extends('dashboard.base')

@section('content')
    <div class="card bg-white">
        <div class="card-header bg-white">
            <div class="row">
                <div class="col-6">
                    <h4>Adicionar Cliente</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
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
            <form method="POST" action="{{route('addClient')}}">
                @csrf
                <div class="row">
                    <div class="col-6">
                        <div class="card">
                            <div class="card-header bg-white">
                                <h5>Informações Cliente</h5>
                            </div>

                            <div class="card-body">
                                <div class="form-group">
                                    <label for="name">Nome Cliente*</label>
                                    <input class="form-control" type="text" name="name" 
                                        placeholder="Digite o nome do cliente" value="{{old('name')}}">
                                </div>

                                <div class="form-group">
                                    <label for="cnpj">Cnpj Cliente*</label>
                                    <input class="form-control" type="text" name="cnpj" 
                                        placeholder="Digite o cnpj do cliente"  value="{{old('cnpj')}}" 
                                        onkeyup="mascara('##.###.###/####-##',this,event,true)" maxlength="18">
                                </div>

                                <div class="form-group">
                                    <label for="responsible_general_name">Nome Responsável Geral*</label>
                                    <input class="form-control" type="text" name="responsible_general_name" 
                                        placeholder="Digite o nome do responsável geral" value="{{old('responsible_general_name')}}">
                                </div>

                                <div class="form-group">
                                    <label for="responsible_general_phone">Telefone Responsável Geral*</label>
                                    <input class="form-control" type="text" name="responsible_general_phone" 
                                        placeholder="Digite o telefone do responsável geral" value="{{old('responsible_general_phone')}}"
                                        onkeyup="mascara('(##)#####-####',this,event,true)" maxlength="14">
                                </div>

                                <div class="form-group">
                                    <label for="technical_manager_name">Nome Responsável Técnico*</label>
                                    <input class="form-control" type="text" name="technical_manager_name" 
                                        placeholder="Digite o nome do responsável Técnico" value="{{old('technical_manager_name')}}">
                                </div>

                                <div class="form-group">
                                    <label for="technical_manager_phone">Telefone Responsável Técnico*</label>
                                    <input class="form-control" type="text" name="technical_manager_phone" 
                                        placeholder="Digite o telefone do responsável técnico" value="{{old('technical_manager_phone')}}"
                                        onkeyup="mascara('(##)#####-####',this,event,true)" maxlength="14">
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
                                    <input class="form-control" id="cepInput" type="text" name="cep" placeholder="Digite o cep do cliente"
                                        onkeyup="mascara('#####-###',this,event,true)" maxlength="9" value="{{old('cep')}}" >
                                </div>

                                <div class="form-group">
                                    <label for="street">Rua</label>
                                    <input class="form-control" type="text" name="street" placeholder="Digite a rua do cliente" value="{{old('street')}}" >
                                </div>

                                <div class="form-group">
                                    <label for="number">Numero</label>
                                    <input class="form-control" type="number" name="number" placeholder="Digite o numero do cliente" value="{{old('number')}}" >
                                </div>

                                <div class="form-group">
                                    <label for="neighboorhood">Bairro</label>
                                    <input class="form-control" type="text" name="neighboorhood" placeholder="Digite o bairro do cliente" value="{{old('neighboorhood')}}">
                                </div>

                                <div class="form-group">
                                    <label for="state">Cidade</label>
                                    <input class="form-control" type="text" name="state" placeholder="Digite o estado do cliente" value="{{old('state')}}">
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
                                    <label for="financial_officer_name">Nome Responsável Financeiro*</label>
                                    <input class="form-control" type="text" name="financial_officer_name" 
                                        placeholder="Digite o nome do responsável financeiro" value="{{old('financial_officer_name')}}">
                                </div>
                                
                                <div class="form-group">
                                    <label for="financial_officer_phone">Telefone Responsável Financeiro*</label>
                                    <input class="form-control" type="text" name="financial_officer_phone" 
                                        placeholder="Digite o telefone do responsável financeiro" value="{{old('financial_officer_phone')}}"
                                        onkeyup="mascara('(##)#####-####',this,event,true)" maxlength="14">
                                </div>

                                <div class="form-group">
                                    <label for="financial_officer_name">Nome Responsável Monitoramento*</label>
                                    <input class="form-control" type="text" name="contact_monitoring_name" 
                                        placeholder="Digite o nome do responsável monitoramento"
                                        value="{{old('contact_monitoring_name')}}">
                                </div>
                                <div class="form-group">
                                    <label for="financial_officer_name">Telefone Responsável Monitoramento*</label>
                                    <input class="form-control" type="text" name="contact_monitoring_phone" 
                                        placeholder="Digite o telefone do responsável monitoramento"
                                        onkeyup="mascara('(##)#####-####',this,event,true)" maxlength="14"
                                        value="{{old('contact_monitoring_phone')}}">
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
                <center><input class="btn btn-success w-25" type="submit" value="Adicionar"></center>
            </div>
        </form>
    </div>
@endsection

@section('javascript')
    <script src="{{ asset('js/client.min.js') }}" defer></script>
@endsection