import { Injectable } from '@angular/core';
import {  HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './authentication.service';
import { ModalService } from './modal.service';
import { Messages } from '../utils/Constants/Messages';
import { TypesModal } from '../utils/Constants/TypesModal';
import { environment } from '../../environments/environment';
import { ResponseModel } from '../models/ResponseModel';
import { TranslateService } from '@ngx-translate/core';
 
@Injectable({
  providedIn: 'root'
})
export class ErrorService {


  constructor ( 
    private router:Router,
    private modalService: ModalService,
    private spinner: NgxSpinnerService,
    public sesionService: AuthenticationService,
    private translateService:TranslateService
    ) { 

}
 


  show(err: any)
  {
  
  this.spinner.hide();

  let errorControlated = false;

  if (err instanceof HttpErrorResponse) {

    if(err.error){
      if(err.error.error){
        this.modalService.customAlert(err.error.error.msgError,TypesModal.ERROR);
        errorControlated = true;
      }
    }

    if(!errorControlated)
    if (err.status === 401) {
      // show sesion message
      this.modalService.customAlert(Messages.SESSION_EXPIRED,TypesModal.ERROR);
      //clear sesion data
      this.sesionService.closeSession();
      //navigate to login
      this.router.navigate([environment.ModAuth]);

    }else if (err.status === 400 || err.status === 404){
      if (!err.error)
        this.modalService.errorMsg(500);
      else if (typeof(err.error.error) != 'undefined')
        this.modalService.errorMsg(err.error.error.codError);
      else
        this.modalService.errorMsg(err.error.codError);
    }else {
      this.modalService.customAlert(Messages.CONNECTION_PROBLEM,TypesModal.ERROR);
    }
  }
 
  }
 
 

}



 