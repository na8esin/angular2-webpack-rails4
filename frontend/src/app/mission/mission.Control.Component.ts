import { Component }          from '@angular/core';
import { MissionService }     from './mission.service';

/**
 * 親コンポーネント
 */
@Component({
  selector: 'mission-control',
  template: `
    <h2>Mission Control</h2>
    
    <button (click)="announce()">Announce mission</button>
    
    <!-- 子コンポーネントのリスト -->
    <my-astronaut *ngFor="let astronaut of astronauts" [astronaut]="astronaut">
    </my-astronaut>

    <h3>History</h3>
    <ul>
      <li *ngFor="let event of history">{{event}}</li>
    </ul>
  `,
  providers: [MissionService]
})
export class MissionControlComponent {
  astronauts = ['Lovell', 'Swigert', 'Haise'];
  history: string[] = [];
  
  //ミッション配列
  missions = ['Fly to the moon!',
              'Fly to mars!',
              'Fly to Vegas!'];
  //ミッションカウンタ
  nextMission = 0;

  /**
   * コンストラクタインジェクション
   */
  constructor(private missionService: MissionService) {
    
    //subscribe(申し込む)
    missionService.missionConfirmed$.subscribe(
      astronaut => {
        this.history.push(`${astronaut} confirmed the mission`);
      });
  }
  
  /**
   * announceボタンを押したとき
     子のミッションが書き換わり、
     historyに追加される
   */
  announce() {
    //ミッションカウンタを一つアップして、ミッション配列から、
    //現在のミッションを取得する
    let mission = this.missions[this.nextMission++];
    
    //アナウンスする
    this.missionService.announceMission(mission);
    
    //履歴配列に文字列を追加する
    this.history.push(`Mission "${mission}" announced`);
    
    //カウンタが配列のサイズ以上になったらカウンタリセット
    if (this.nextMission >= this.missions.length) { this.nextMission = 0; }
  }
}
