import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { Router, UrlTree } from "@angular/router"

export const canActivateAuth = () => {
    const isLoggedIn = inject(AuthService).isAuth

    console.log("canActivate: isLoggedIn: " +isLoggedIn);
    

    if (isLoggedIn) {
        return true
    }

    return inject(Router).createUrlTree(['/login'])
}