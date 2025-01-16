import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  counter = signal(0)
  setValue() {
    this.counter.set(10)
  }

}
