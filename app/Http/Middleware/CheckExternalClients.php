<?php

namespace App\Http\Middleware;

use App\Util\CheckClientsRegister;
use Closure;
use Illuminate\Http\Request;

class CheckExternalClients
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {   
      
        $checkExternalClient=new CheckClientsRegister();
        $checkExternalClient->verifyClientsExternal();
       
        return $next($request);
    }
}
