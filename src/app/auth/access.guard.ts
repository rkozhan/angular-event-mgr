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

export const canActivateEditorView = () => {
    if (inject(AuthService).isEditor) return true

    return inject(Router).createUrlTree(['/403'])
}

export const canActivateAdminView = () => {
    if (inject(AuthService).isAdmin) return true

    return inject(Router).createUrlTree(['/403'])
}

export const canActivateLogin = () => {

    if(!inject(AuthService).isAuth) return true
    
    return inject(Router).createUrlTree([''])
}