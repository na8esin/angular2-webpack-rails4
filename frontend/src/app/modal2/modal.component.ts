import { Component, Input, OnDestroy } from '@angular/core';
import { ModalService } from './modal.service';
import { Subscription }   from 'rxjs/Subscription';

/**
 * 子
 */
@Component({
  selector: 'modal',
  styles: [`
  
    /* モーダルのオーバーレイの部分 */
    .bg {
      display: none;
    }
    .bg.active {
      display: block;
      background-color: rgba(0, 0, 0, 0.2);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 100px 0 0 0;
      z-index: 1;
      width: 100%;
      height: 100%;
    }
    
    /* モーダルのダイアログの部分 */
    .modal-content {
      display: none;
    }
    .modal-content.active {
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 100px 0 0 0;
      width: 400px;
      height: 400px;
      margin: 0 auto;
      background-color: white;
      z-index: 2;
    }
  `],
  template: `
    <div class="bg" [class.active]="mission" (click)="confirm()">
    </div>
    <div class="modal-content" [class.active]="mission">
      <button (click)="confirm()">Close</button>
    </div>

  `
})
export class ModalComponent implements OnDestroy {
  @Input() astronaut: string;
  mission = false;
  confirmed = false;
  announced = false;
  subscription: Subscription;
  
  /**
   *
   */
  constructor(private modalService: ModalService) {
    this.subscription = modalService.missionAnnounced$.subscribe(
      mission => {
        this.mission = mission;
//        this.announced = true;
//        this.confirmed = false;
    });
  }
  
  /**
   * モーダルをクローズする
   * cssを切り替える
   */
  confirm() {
    //this.confirmed = true;
    this.mission = false;
    this.modalService.confirmMission(this.astronaut);
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
