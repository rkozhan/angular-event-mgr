import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http"
import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const token = inject(AuthService).token
    
    console.log(req)
    console.log("t: " +token);
    
    if (!token) return next(req)

    req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    console.log(req);
    
    return next(req)
}