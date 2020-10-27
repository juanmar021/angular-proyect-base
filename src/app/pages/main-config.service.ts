import { Inject, Injectable, InjectionToken } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject } from 'rxjs';

import * as _ from 'lodash';
import { environment } from '../../environments/environment';

// Create the injection token for the custom config
export const FUSE_CONFIG = new InjectionToken('fuseCustomConfig');

@Injectable()
export class MainConfigService
{
    config: any;
    
    onConfigChanged: BehaviorSubject<any>;

    lang = environment.defaultLang;

  
    constructor(
        public platform: Platform,
    )
    {

        // Set the config from the default config
        this.config = {
            footer:true,
            header:true
        }
    
        // Create the behavior subject
        this.onConfigChanged = new BehaviorSubject(this.config);
    }

    /**
     * Set the new config from given object
     *
     * @param config
     */
    setConfig(config): void
    {
        // Merge the config
        this.config = config;

        // Trigger the event
        this.onConfigChanged.next(this.config);
    }

    setLang(lang:string){
        this.lang = lang;
    }
}

