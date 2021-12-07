    @extends('layouts.modal')
    @extends('layouts.formUser')

    <div class="c-sidebar-brand">
        <img class="c-sidebar-brand-full" src="{{ asset('storage/general_icons/Vttor.png') }}" width="118"  alt="Logo">
        <img class="c-sidebar-brand-minimized" src="{{ asset('storage/general_icons/Vttor.png')}}" width="118" alt="Logo">
    </div>
    <ul class="c-sidebar-nav">
        <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="">
                <i class="c-sidebar-nav-icon h-100">
                    <img width="16" src="{{asset('storage/general_icons/home.png')}}">
                </i>
                <span class="c-sidebar-nav-icon"></span>Inicio
            </a>
        </li>

        <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="{{route('allChecklists')}}">
                <i class="c-sidebar-nav-icon h-100">
                    <img width="16" src="{{asset('storage/general_icons/checklist.png')}}">
                </i>
                <span class="c-sidebar-nav-icon"></span>Checklist
            </a>
        </li>

        <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="{{route('defaultChecklist')}}">
                <i class="c-sidebar-nav-icon h-100">
                    <img width="16" src="{{asset('storage/general_icons/checklist_default.png')}}">
                </i>
                <span class="c-sidebar-nav-icon"></span>Checklist Padrão
            </a>
        </li>

        <li class="c-sidebar-nav-item myProfileBtn" style="cursor: pointer" 
            data-toggle="modal" data-target="#modalActions" 
            id="{{Auth::user()->id}}" data-toggle="tooltip">
            
            <div class="c-sidebar-nav-link">
                <i class="c-sidebar-nav-icon h-100">
                    <img width="16" src="{{asset('storage/general_icons/user.png')}}">
                </i>
                <span class="c-sidebar-nav-icon"></span>Meu Perfil
            </div>
        </li>

        <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="{{route('allClients')}}">
                <i class="c-sidebar-nav-icon h-100">
                    <img width="16" src="{{asset('storage/general_icons/users.png')}}">
                </i>
                <span class="c-sidebar-nav-icon"></span>Clientes
            </a>
        </li>

        <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="{{route('allUsers')}}">
                <i class="c-sidebar-nav-icon h-100">
                    <img width="16" src="{{asset('storage/general_icons/user.png')}}">
                </i>
                <span class="c-sidebar-nav-icon"></span>Usuários
            </a>
        </li>

        <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="{{route('logout')}}">
                <i class="c-sidebar-nav-icon h-100">
                    <img width="16" src="{{asset('storage/general_icons/exit.png')}}">
                </i>
                <span class="c-sidebar-nav-icon"></span>Sair
            </a>
        </li>
    </ul>
</div>

<script>
    const MY_PROFILE_URL="{{route('editUser')}}";
</script>
<script src="{{ asset('js/myProfile.min.js') }}" defer></script>
