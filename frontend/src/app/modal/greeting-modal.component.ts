import { Component , Input } from "@angular/core";
import { ModalContext } from "./modal";

@Component({
  selector: "greeting",
  template: `
    <div>
      <section>
        <input [(ngModel)]="message" placeholder="Message">
      </section>
      <footer>
        <button (click)="onClickOk()">OK</button>
        <button (click)="onClickCancel()">Cancel</button>
      </footer>
    </div>
  `,
})
export class GreetingModalComponent {
  private message: string;

  constructor(
    private modalCtx: ModalContext
  ) {
  }

  onClickOk() {
    this.modalCtx.resolve(this.message);
  }

  onClickCancel() {
    this.modalCtx.reject();
  }
}