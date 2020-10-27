import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from '@angular/router';
import { AuthenticationComponent } from "./pages/authentication/authentication.component";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ValidateAdminRoleGuard } from './guards/ValidateAdminRole.guard';

export const appRoutes: ModuleWithProviders<any> = RouterModule.forRoot( [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'authentication', component: AuthenticationComponent },
    { path: 'NotFound', component: NotFoundComponent },
    { path: '**', redirectTo: '/NotFound' },
    // { path: 'coaches', redirectTo: '/coaches', pathMatch: 'full',canActivate: [ ValidateAdminRoleGuard ]},  
    // { path: 'tools', redirectTo: '/tools', pathMatch: 'full'},  
    // { path: 'evalutions', redirectTo: '/evalutions', pathMatch: 'full'},  
 
  ]);
  
