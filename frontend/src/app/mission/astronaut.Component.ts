import { Component, Input, OnDestroy } from '@angular/core';
import { MissionService } from './mission.service';
import { Subscription }   from 'rxjs/Subscription';

/**
 * �q�R���|�[�l���g
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

  //�e����o�C���h�����
  @Input() astronaut: string;
  mission = '<no mission announced>';
  confirmed = false;
  announced = false;

  //Records information about subscriptions to and 
  //unsubscriptions from observable sequences.
  //���unsubscribe���������߂����Ɏg�p���Ă���?
  subscription: Subscription;
  
  /**
   * �R���X�g���N�^�C���W�F�N�V����
   */
  constructor(private missionService: MissionService) {
    //�\������
    this.subscription = missionService.missionAnnounced$.subscribe(
      mission => {
        this.mission = mission;
        this.announced = true;
        this.confirmed = false;
    });
  }
  
  /**
   * confirm�{�^�����������ꍇ
     ��s�m���A�i�E���X�ɑ΂��ď�������
   */
  confirm() {
    this.confirmed = true;
    //�����������Ƃ�e�̃R���|�[�l���g�ɓ`����
    this.missionService.confirmMission(this.astronaut);
  }
  
  /**
   * ���C�t�T�C�N���z�b�N
   * @�I�[�o�[���C�h
   */
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
