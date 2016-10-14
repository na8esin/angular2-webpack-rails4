import { Component, Input, OnDestroy } from '@angular/core';
import { MissionService } from './mission.service';
import { Subscription }   from 'rxjs/Subscription';

/**
 * 子コンポーネント
 */
@Component({
  selector: 'my-astronaut',
  template: `
    <p>
      {{astronaut}}: <strong>{{mission}}</strong>
      <button
        (click)="confirm()"
        [disabled]="!announced || confirmed">
        Confirm
      </button>
    </p>
  `
})
export class AstronautComponent implements OnDestroy {

  //親からバインドされる
  @Input() astronaut: string;
  mission = '<no mission announced>';
  confirmed = false;
  announced = false;

  //Records information about subscriptions to and 
  //unsubscriptions from observable sequences.
  //後でunsubscribeしたいためだけに使用している?
  subscription: Subscription;
  
  /**
   * コンストラクタインジェクション
   */
  constructor(private missionService: MissionService) {
    //申し込む
    this.subscription = missionService.missionAnnounced$.subscribe(
      mission => {
        this.mission = mission;
        this.announced = true;
        this.confirmed = false;
    });
  }
  
  /**
   * confirmボタンを押した場合
     飛行士がアナウンスに対して承諾する
   */
  confirm() {
    this.confirmed = true;
    //承諾したことを親のコンポーネントに伝える
    this.missionService.confirmMission(this.astronaut);
  }
  
  /**
   * ライフサイクルホック
   * @オーバーライド
   */
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
