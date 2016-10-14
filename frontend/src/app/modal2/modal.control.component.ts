import { Component }          from '@angular/core';
import { ModalService }     from './modal.service';

/**
 * �e
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
   * �R���X�g���N�^���Ă΂��^�C�~���O���Ă����낤��
   */
  constructor(private modalService: ModalService) {
    modalService.missionConfirmed$.subscribe(
      astronaut => {
        this.history.push(`${astronaut} confirmed the mission`);
      });
  }
  
  /**
   * modal������\��������悤��css�ɐ؂�ւ���
   */
  announce() {
    
    //[class.active]��true�ɂ��邽�߂̕ϐ�
    this.isOpen = true;
    
    //�q�Ƀ~�b�V������`����
    this.modalService.announceMission(this.isOpen);
    
    this.history.push(`Mission "${this.isOpen}" announced`);
    
    
  }
}
