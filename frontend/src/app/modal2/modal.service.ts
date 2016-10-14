import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

/**
 * このクラスはmodule.tsで読み込めないらしい
 * Injectableが原因ではない
 */
@Injectable()
export class ModalService {

  // Observable string sources
  private missionAnnouncedSource = new Subject<boolean>();
  private missionConfirmedSource = new Subject<string>();
  
  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  
  // Service message commands
  announceMission(mission: boolean) {
    this.missionAnnouncedSource.next(mission);
  }
  
  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }
}
