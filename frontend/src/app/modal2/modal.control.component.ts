import { Component }          from '@angular/core';
import { ModalService }     from './modal.service';

/**
 * 親
 */
@Component({
  selector: 'modal-control',
  template: `
    <h2>modal2</h2>
    <button (click)="announce()">modal open</button>
    <modal></modal>
    <h3>History</h3>
    <ul>
      <li *ngFor="let event of history">{{event}}</li>
    </ul>
  `,
  providers: [ModalService]
})
export class ModalControlComponent {

  history: string[] = [];
  
  isOpen = false;

  /**
   * コンストラクタが呼ばれるタイミングっていつだろうね
   */
  constructor(private modalService: ModalService) {
    modalService.missionConfirmed$.subscribe(
      astronaut => {
        this.history.push(`${astronaut} confirmed the mission`);
      });
  }
  
  /**
   * modal部分を表示させるようなcssに切り替える
   */
  announce() {
    
    //[class.active]をtrueにするための変数
    this.isOpen = true;
    
    //子にミッションを伝える
    this.modalService.announceMission(this.isOpen);
    
    this.history.push(`Mission "${this.isOpen}" announced`);
    
    
  }
}
