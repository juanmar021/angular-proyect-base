import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainConfigService } from './main-config.service';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { SesionModel } from '../models/SesionModel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements  OnDestroy {

  onConfigChanged: Subscription;

  config:{
    header:boolean,
    toolbar:boolean
  };



  constructor( private router: Router,
    private mainConfig: MainConfigService,
    private authenticationService:AuthenticationService,
    private translateService: TranslateService,
    ) {

      this.onConfigChanged =
        this.mainConfig.onConfigChanged
          .subscribe(
              (newSettings) => {
                  this.config = newSettings;
              }
          );

      this.translateService.use(mainConfig.lang);      
  }

 
  ngOnDestroy()
  {
      this.onConfigChanged.unsubscribe();

  }

}
