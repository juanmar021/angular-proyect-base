import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalModel } from '../../models/ModalModel';
import { ModalService } from 'src/app/services/modal.service';
import { TypesModal } from 'src/app/utils/Constants/TypesModal';
 
  
@Component({
  selector: '[app-alerts-modal]',
  templateUrl: './alerts-modal.component.html',
  styleUrls: ['./alerts-modal.component.scss']
})


export class AlertModalComponent implements OnInit {

  element: any;
  model = new ModalModel();
  @Input() id: string;


  constructor(private modalService: ModalService,
    private el: ElementRef,
    // private translateService: TranslateService
    )
  {
    this.element = el.nativeElement;  
    // this.translateService.use(mainConfigService.lang);
    // this.translateService.onLangChange.subscribe(p=>{
    //   console.log("object");
    // })

  }


  ngOnInit() {
    let modal = this;
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'ModalLive') {
        modal.close();
      }
    });

     // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
    
  }

  open( content: string,  type:string=TypesModal.SUCCESS) {
    // this.model.title = title;
    this.model.content = content;
    this.element.style.display = 'block';
    this.model.type=type;
  }

  result(resul: boolean) {
    this.modalService.modalResult(resul);
    this.close();
  }
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }
}
