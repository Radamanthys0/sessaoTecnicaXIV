import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoinComponent } from './coin/coin.component';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  imports: [CoinComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  currencyService = inject(CurrencyService)

  quantity = this.currencyService.quantity;
  currencies = this.currencyService.currencies;
  currencySelected = this.currencyService.currencySelected;
  total = this.currencyService.total;

  decrease() {
    this.quantity.update(c => c > 0 ? --c : 0)
  }

  increase() {
    this.quantity.update(c => ++c)
  }

}
