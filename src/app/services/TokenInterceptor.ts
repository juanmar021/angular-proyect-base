import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { tap,  } from "rxjs/internal/operators";

 
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public sesionService: AuthenticationService,
              ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.sesionService.recoverySesion().token}`,
        // User: this.sesionService.recoverySesion().user
        
        //clientCode: this.sesionService.recoverySesion().clientCode
      }
    });

    // console.log(request)

    return next.handle(request).pipe(
      tap((ev: HttpEvent<any>) => {
      }) as any);
  }
}


