import { TypesModal } from '../utils/Constants/TypesModal';
export class ModalModel{  
    title: string;
    content: string;
    modalResult: boolean; 
    type:string;

    constructor()
    {
     this.title="Pafys Unicor";
     this.content="..";  
     this.type=TypesModal.SUCCESS;   
    }
  }