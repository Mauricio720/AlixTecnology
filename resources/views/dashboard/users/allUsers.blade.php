@extends('dashboard.base')
@extends('layouts.modal')

@section('content')
   <div class="card bg-white">
        <div class="card-header bg-white">
            <div class="row">
                <div class="col-6">
                    <h4>Todos usuários</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <div class="btnDefault btnAdd" id="btnAddUser" title="Adicionar Usuário" 
                        data-toggle="modal" data-target="#modalActions" data-toggle="tooltip">
                        +
                    </div>
                </div>
            </div>
            
        </div>
        <div class="card-header bg-white">
            <div class="row">
                <div class="col-4">
                    <form method="get">
                        <div class="form-group">
                            <input class="form-control" type="text" name="name" 
                                placeholder="Nome do usuário" value="{{$name!=""?$name:''}}">
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="email" name="email" 
                                placeholder="Email do usuário" value="{{$email!=""?$email:''}}">
                        </div>
                        <div class="form-group">
                            <select class="form-control" name="permission">
                                <option value="0">Selecione a permissão</option>
                                <option {{$permission=="1" ? 'selected':''}} value="1">Adm</option>
                                <option {{$permission=="2" ? 'selected':''}} value="2">Limitado</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input class="btn btn-success w-50" type="submit" value="Filtrar">
                        </div>
                    </form>
                </div>
                <div class="col-8"></div>
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
            <table class="table table-bordered">
                <thead>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Permissão</th>
                    <th>Criado</th>
                    <th>Atualizado</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    @foreach($allUsers as $user)
                        <tr>
                            <td>{{$user->name}}</td>
                            <td>{{$user->email}}</td>
                            <td>{{$permissionChoose[$user->permission]}}</td>
                            <td>
                                {{$user->created_at->format('d/m/Y H:i:s')}}
                            </td>
                            <td>{{$user->updated_at->format('d/m/Y H:i:s')}}</td>
                            <td class="d-flex">
                                <div class="btnDefault btnDefault--sm btnEdit" title="Deletar Usuário" id="{{$user->id}}" 
                                    data-toggle="modal" data-target="#modalActions" data-toggle="tooltip">
                                    <img src="{{asset('storage/general_icons/pencil.png')}}" width="16" height="16">
                                </div>

                                <a href="{{route('deleteUser',['id'=>$user->id])}}" class="btnDefault btnDefault--sm btnDelete" title="Deletar Usuário" 
                                    msg="Tem certeza que deseja excluir esse usuário!">
                                    <img src="{{asset('storage/general_icons/delete.png')}}" width="16" height="16">
                                </a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div class="card-footer">
            {{$allUsers->links()}}
        </div>
    </div>
   
@endsection



@section('javascript')
    <script>
        const ADD_USER_URL="{{route('addUser')}}";
        const EDIT_USER_URL="{{route('editUser')}}";
    </script>
    <script src="{{ asset('js/user.min.js') }}" defer></script>
@endsection