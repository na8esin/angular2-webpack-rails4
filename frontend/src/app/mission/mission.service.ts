import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

/**
 * このサービスは複数のAstronautComponentを
   MissionControlComponentにつなぐ。
 *
 * このクラスはmodule.tsで読み込めないらしい
 * Injectableが原因ではない
 */
@Injectable()
export class MissionService {

  // Observable string sources
  // SubjectはObservable と Observerの両方を兼ね備えたオブジェクト
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();
  
  // Observable string streams
  // streamsというのはイベントの配列
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  
  // Service message commands
  announceMission(mission: string) {
    //nextしてる！
    this.missionAnnouncedSource.next(mission);
  }
  
  confirmMission(astronaut: string) {
    //nextしてる！
    this.missionConfirmedSource.next(astronaut);
  }
}
