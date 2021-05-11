import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa('userCoopmego' + ':' + 'C00pMeg0*2018')
        });

        const reClone = req.clone({
            headers
        });

        return next.handle(reClone);
    }
}
