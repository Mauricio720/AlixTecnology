
    
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
            <a class="c-sidebar-nav-link" href="">
                <i class="c-sidebar-nav-icon h-100">
                    <img width="16" src="{{asset('storage/general_icons/user.png')}}">
                </i>
                <span class="c-sidebar-nav-icon"></span>Meu Perfil
            </a>
        </li>

        <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="">
                <i class="c-sidebar-nav-icon h-100">
                    <img width="16" src="{{asset('storage/general_icons/users.png')}}">
                </i>
                <span class="c-sidebar-nav-icon"></span>Todos os usuários
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

