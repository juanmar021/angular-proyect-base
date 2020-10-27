import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MainConfigService } from 'src/app/pages/main-config.service';
import { SesionModel } from '../../models/SesionModel';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { Messages } from '../../utils/Constants/Messages';
import { TypesModal } from 'src/app/utils/Constants/TypesModal';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit ,OnDestroy{

  lang: string = environment.defaultLang;
  sesion:SesionModel;
  onSesionChanged: Subscription;
  onRouterChanged: Subscription;

  routerSelect:string;


  constructor(
    private mainConfigService: MainConfigService,
    private translateService: TranslateService,
    private authenticationService:AuthenticationService,
    private modalService:ModalService,
    private router:Router,
     private route: ActivatedRoute,

  ) {
    this.sesion = this.authenticationService.recoverySesion();
    this.routerSelect = this.authenticationService.getRouterSelected();
    console.log(this.routerSelect);
  }

  toogleLanguage(lang: string) {
    this.lang = lang;
    this.translateService.use(lang);
    this.mainConfigService.setLang(lang);
  }

  ngOnInit() {
      
    this.onSesionChanged =
      this.authenticationService.onSesionChanged
        .subscribe(
            (newSesion) => {
                this.sesion = newSesion;              
            }
        );  

    this.onRouterChanged =
      this.authenticationService.onRouterChaged
        .subscribe(
            (newRouter) => {
              if(newRouter!='')
                this.routerSelect = newRouter;  
            }
        );  
    
  }


  logout()
  {
  this.modalService.customConfirm(Messages.QUESTION_LOGOUT,TypesModal.QUESTION,(resp:boolean)=>{
    if(resp)
      this.authenticationService.closeSession()
    
  })
  }
  login()
  {
    this.router.navigate([environment.ModAuth])

  }
  ngOnDestroy()
  {
      this.onSesionChanged.unsubscribe();

  }

  navigate(router:string){
    this.router.navigate([router]);
    this.authenticationService.setRouter(router);

  }
}
