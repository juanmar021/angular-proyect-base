import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { SesionModel } from '../models/SesionModel';
import { environment } from '../../environments/environment.prod';

 
@Injectable()
export class ValidateAthenticationGuard implements CanActivate {


  constructor(private router: Router,
    private authenticationService:AuthenticationService) { 
    }

  canActivate() {

     if(this.authenticationService.recoverySesion().IsLoged ){
      return true;
     }

    // this.modalService.customAlert(Messages.SESSION_EXPIRED,TypesModal.ERROR);
    this.router.navigate([environment.ModAuth]);
    return false;
  }
}