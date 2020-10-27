import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { SesionModel } from '../models/SesionModel';
import { environment } from '../../environments/environment.prod';
import { TypesRoles } from '../utils/Constants/TypesRoles';
import { ModalService } from '../services/modal.service';
import { Messages } from '../utils/Constants/Messages';
import { TypesModal } from '../utils/Constants/TypesModal';
 
@Injectable()
export class ValidateAdminRoleGuard implements CanActivate {

  private sesion:SesionModel;

  constructor(private router: Router,
    private authenticationService:AuthenticationService,
    private modalService:ModalService) { 
      this.sesion = this.authenticationService.recoverySesion();
    }

  canActivate() {

     if(this.sesion.user.role ===  TypesRoles.ADMIN ){
      return true;
     }

    this.modalService.customAlert(Messages.NOT_AUTHORIZED_MODULE,TypesModal.ERROR);
    this.router.navigate([environment.ModAuth]);
    return false;
  }
}