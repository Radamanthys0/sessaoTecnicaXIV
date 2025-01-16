import { CurrencyPipe } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-coin',
  imports: [CurrencyPipe],
  templateUrl: './coin.component.html',
  styleUrl: './coin.component.scss'
})
export class CoinComponent {
  // @Input() label = 'Moedinhas'
  label = input('Moedinhas');

  // @Input({required:true}) value:number = 0
  value = input.required<number>();

  currency = input.required<string>();
}
