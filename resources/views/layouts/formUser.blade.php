<form id="formUser" class="flex-column" action="{{route('myProfile')}}" method="post" style="display:none;">
    @csrf
    <input type="hidden" name="id" id="idUser">

    <div class="form-group">
        <input class="form-control" required placeholder="Nome Usuário" type="text" name="name" id="name">
    </div>

    <div class="form-group">
        <input class="form-control" required placeholder="Email Usuário"  type="email" name="email" id="email">
    </div>

    <div class="form-group">
        <select class="form-control" name="permission" id="permission">
            <option value="">Selecione a permissão</option>
            <option value="1">Adm</option>
            <option value="2">Secundário</option>
        </select>
    </div>

    <div class="password">
        <input class="form-control" required placeholder="Senha Usuário" type="password" name="password" id="password">
    </div>
</form>