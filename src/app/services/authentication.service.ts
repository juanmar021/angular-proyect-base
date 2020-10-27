import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SesionModel } from '../models/SesionModel';
import { SubjectModel } from '../models/SubjectModel';
import { AuthenticationModel } from '../models/AuthenticationModel';
import { ResponseModel } from '../models/ResponseModel';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  protected url : string = environment.apiURL+'/api';
  onSesionChanged: BehaviorSubject<SesionModel>;
  onRouterChaged: BehaviorSubject<string>;

  protected _currentSesion:SesionModel;
  protected _currentRouter:string;


  constructor ( private http: HttpClient , private router:Router) { 
    this._currentSesion=new SesionModel();
    this._currentSesion.IsLoged=false;
    this._currentSesion.token="";
    this.onSesionChanged = new BehaviorSubject(this.recoverySesion());
    this.onRouterChaged = new BehaviorSubject("");
}

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  authenticate(model: AuthenticationModel):Promise<ResponseModel>
  {
  
   return this.http.post<ResponseModel>(this.url+'/Authentication/Login', model,this.options)
    .toPromise()
    .then(res => res)
    .catch(err => {
      return Promise.reject(err);
     });
  }

 
  setSesion(Sesion:SesionModel)
  {

    console.log("nueva sesion");
       this._currentSesion=Sesion;           
       window.sessionStorage.setItem("sesion",JSON.stringify(this._currentSesion));
       this.onSesionChanged.next(this._currentSesion);

  }

  setRouter(router:string){
    this._currentRouter = router;
    this.onRouterChaged.next(this._currentRouter);

  }

  getRouterSelected()
  {
    if(!this._currentRouter){
      let sesion = this.recoverySesion();
        if(sesion){
          if(sesion.menu[0])
          return sesion.menu[0].route;
        }
    }
    return this._currentRouter;
  }

  
  recoverySesion()
  {
     
      if(window.sessionStorage.getItem("sesion"))
      {
        this._currentSesion=JSON.parse(window.sessionStorage.getItem("sesion"));         
      }
      
      return this._currentSesion;

       
  }

  closeSession()
  {
     window.sessionStorage.removeItem("sesion");
     this._currentSesion = new SesionModel();
     this.onSesionChanged.next(this._currentSesion);
     this.router.navigate([environment.ModAuth])
     return this._currentSesion;
  }

}
