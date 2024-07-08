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
    const roles = inject(AuthService).roles
    return roles.includes("ROLE_EDITOR")

    //if (roles.includes("ROLE_EDITOR")) return true

    //return inject(Router).createUrlTree(['/403'])
}