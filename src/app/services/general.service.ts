import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GeneralModel } from '../models/GeneralModel';
import { environment } from '../../environments/environment';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  protected url : string = environment.apiURL + '/api';

  constructor ( private http: HttpClient ) { }

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  add(general: GeneralModel)
  {
       return this.http.post<ResponseModel>(this.url + '/General/Save',general,this.options);
  }
  
  update(general: GeneralModel)
  {
       return this.http.put<ResponseModel>(this.url + '/General/Update',general,this.options);
  }

  delete(id:number)
  {
    const params = new HttpParams()
    .set("id",String(id))
 
       return this.http.delete<ResponseModel>(this.url + '/General/Delete',{params});
  }

  getGeneralModels(groupId:number)
  {
    const params = new HttpParams()
    .set("group",String(groupId))
    
       return this.http.get<ResponseModel>(this.url + '/General/GetAll',{params});
  }
 
  
 

}
