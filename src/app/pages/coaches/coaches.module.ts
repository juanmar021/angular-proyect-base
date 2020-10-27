import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../material.module';
import { ListCoachesComponent } from './list-coaches/list-coaches.component';
import { TranslateModule } from '@ngx-translate/core';
import { ValidateAdminRoleGuard } from 'src/app/guards/ValidateAdminRole.guard';
import { ValidateAthenticationGuard } from '../../guards/ValidateAuthentication.guard';
const routes = [
    {
        path     : 'coaches/list',
        component: ListCoachesComponent,
        canActivate: [ ValidateAthenticationGuard ]
    },

];
 

 @NgModule({
    declarations: [
        ListCoachesComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        BrowserModule,
        FormsModule ,
        MaterialModule,
        ReactiveFormsModule ,
        TranslateModule                      
     ],
    exports     : [
        ListCoachesComponent
     ],
    entryComponents:[
    ],
    providers:[ValidateAdminRoleGuard,ValidateAthenticationGuard]
    
})
export class CoachesModule
{
}
