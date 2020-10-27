import { Component, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MainConfigService } from 'src/app/pages/main-config.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  lang: string = environment.defaultLang;

  
  constructor(
    private mainConfigService: MainConfigService,
    private translateService: TranslateService,

      ) {

    //this.translateService.use(this.model.lang);
    this.translateService.use(mainConfigService.lang);

  }

  toogleLanguage(lang: string) {
    this.lang = lang;
    this.translateService.use(lang);
    this.mainConfigService.setLang(lang);
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.mainConfigService.setConfig({
      toolbar:true,
      header:true
    });

  }

}
