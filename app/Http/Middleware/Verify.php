<?php

namespace App\Http\Middleware;

use App\Traits\General;
use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;

class Verify
{
    use General;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (! $user = JWTAuth::parseToken()->authenticate()) {
			return  $this->returnError("user isn't found",404);
		}
        if($user->active != 1){
            return $this->returnError("you should verify your email",401);
        }

        return $next($request);
    }
}
