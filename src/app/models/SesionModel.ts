import { SubjectModel } from './SubjectModel';
import { MenuModel } from './MenuModel';
 
export class SesionModel{
  
    token:string;
    IsLoged:boolean;
    user : SubjectModel;
    menu:MenuModel[];
  
      constructor()
      {
       this.IsLoged=false;
       this.user = new SubjectModel();
       this.menu = new Array<MenuModel>();
       this.token = "";
      } 
      
}