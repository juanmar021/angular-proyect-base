import { Injectable, Output, EventEmitter } from '@angular/core';
import { TypesModal } from '../utils/Constants/TypesModal';
import { Messages } from '../utils/Constants/Messages';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class ModalService {

    @Output() ModalResultEvent: EventEmitter<any> = new EventEmitter();

    onClose:any;

    private modals: any[] = [];
    constructor(private translateSrv: TranslateService) { }

    add(modal: any) {
        // add modal to array of active modals
        this.modals.push(modal);
    }
 
    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }
 
    open(id: string,content:string,type:TypesModal) {
        // open modal specified by id
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.open(content,type);
    }

    confirm(id: string,title:string,content:string){
        // open modal specified by id
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.open(title,content,true);        
    }

    customConfirm( message:string,type:TypesModal,onClose?:Function){

        this.open("ModalLive", message,type);

        this.onClose=onClose;
     

    }

    modalResult(result: boolean)
    {
        this.ModalResultEvent.emit(result);   
        
        if(this.onClose)
        this.onClose(result);
    }
  
    close(id: string) {
        // close modal specified by id
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.close();
    }

    customAlert( message:string, type:TypesModal) {

        this.open("ModalLive", message,type);
    }

    errorMsg(code:number) {
        switch (code) {
            case 1:
                this.customAlert(Messages.DATA_NOT_FOUND,TypesModal.ERROR);                
            break;

            case 2:
                this.customAlert(Messages.BAD_REQUEST,TypesModal.ERROR);   
            break;
            case 3:
                this.customAlert(Messages.INVALID_DATA,TypesModal.ERROR);   
            break;
            case 4:
                this.customAlert(Messages.INVALID_DATA,TypesModal.ERROR);   
             break;

            case 404:
                
                this.customAlert(Messages.DATA_NOT_FOUND,TypesModal.ERROR);

                break;

            case 400:
                
                this.customAlert(Messages.BAD_REQUEST,TypesModal.ERROR);

                break;

        
            default:

                this.customAlert(Messages.UNKNOWN_ERROR,TypesModal.ERROR);

                break;
        }
    }
}