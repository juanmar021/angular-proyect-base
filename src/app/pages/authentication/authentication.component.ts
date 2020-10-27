import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MainConfigService } from '../../pages/main-config.service';
import { AuthenticationModel } from 'src/app/models/AuthenticationModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../../services/authentication.service';
import { SesionModel } from 'src/app/models/SesionModel';
import { ResponseModel } from '../../models/ResponseModel';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../../services/error.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../../services/modal.service';
import { Messages } from '../../utils/Constants/Messages';
import { TypesModal } from 'src/app/utils/Constants/TypesModal';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  form: FormGroup;
 
  
  constructor( 
    private fb: FormBuilder, 
    private mainConfigService: MainConfigService,
    private spinner: NgxSpinnerService,
    private authenticationService:AuthenticationService,
    private router: Router,
    private errorService:ErrorService,
    private translateService: TranslateService,
    private modalService:ModalService


    ) {
      
      if (this.authenticationService.recoverySesion().IsLoged) {
        this.router.navigate([environment.defaultRoute]);
      }

    this.form = this.fb.group({
      cc: ['', [Validators.required]],
      pass: ['', [Validators.required]]
   });

   this.mainConfigService.setConfig({
     toolbar:true,
     header:false
   });

   this.translateService.use(this.mainConfigService.lang);

  }

  ngOnInit() {}

  onSubmit() { 
    if(this.form.valid){

      let authentication = new AuthenticationModel(this.form.get('cc').value);
      authentication.pass = this.form.get('pass').value;       

      this.spinner.show();

      this.authenticationService.authenticate(authentication).then((resp:ResponseModel)=>{

        this.spinner.hide();        
        let sesion=new SesionModel();
        sesion.IsLoged=true;
        sesion.user = resp.data;
        sesion.token=resp.data.token;
        sesion.menu = resp.data.menu; 

     

        if(sesion){
          if(sesion.menu.length > 0){
            this.authenticationService.setSesion(sesion)
            this.authenticationService.setRouter(sesion.menu[0].route);
            this.router.navigate([sesion.menu[0].route]);
          }else{
            this.modalService.customAlert(Messages.MENU_NOT_OBTAINED,TypesModal.ERROR);
          }
        }

      }).catch(error=>{

        this.errorService.show(error);

      });
    }
  }

  
  ngOnDestroy()
  {
     this.mainConfigService.setConfig({
      toolbar:true,
      header:true
    });
  }

}
