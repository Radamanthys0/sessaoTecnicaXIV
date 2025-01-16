import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource, takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, of, switchMap, tap } from 'rxjs';

export interface Currency {
  symbol: string,
  name: string
  symbol_native: string,
  decimal_digits: number,
  rounding: number,
  code: string,
  name_plural: string,
  type: string
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private apiUrl = 'https://api.freecurrencyapi.com/v1/'
  private http = inject(HttpClient)

  // using toSignal
  // getCurrencies$ = this.http.get<Currency[]>(`${this.apiUrl}/currencies`).pipe(map((response: any) => response?.data ? Object.values(response.data) : []))
  // currencies = toSignal(this.getCurrencies$);


  // using rxResource
  currenciesResource = rxResource({
    loader: () => this.http.get<Currency[]>(`${this.apiUrl}/currencies`).pipe(map((response: any) => (response?.data ? Object.values(response.data) : []) as Currency[]))
  })
  currencies = computed<Currency[]>(() => this.currenciesResource.value() ?? [] as Currency[]);


  currencySelected = signal<Currency | undefined>(undefined);
  quantity = signal(0);
  private valueBasedOnBRL = signal(0.165985818);

  total = computed(() => this.quantity() * (this.valueBasedOnBRL() ?? 0));

  constructor() {
    toObservable(this.currencySelected).pipe(
      switchMap(currency => this.getLatestExchangeRate(currency?.code)),
      tap((valueBasedOnBRL) => {
        this.valueBasedOnBRL.set(valueBasedOnBRL ?? 1)
      }),
      takeUntilDestroyed(),
    ).subscribe()

    effect(() => {
      if (this.total() > 5) {
        console.log("Se eu não comprar nada o desconto é maior");
        alert("Se eu não comprar nada o desconto é maior")
      }
    })
  }

  getLatestExchangeRate(currency: string = 'BRL'): Observable<number> {
    let params: HttpParams = new HttpParams();
    params = params.append('base_currency', 'BRL')
    params = params.append('currencies', currency)
    return this.http.get<number>(`${this.apiUrl}/latest`, { params }).pipe(map((response: any) => (response?.data ? Object.values(response.data)[0] : 1) as number))
  }

}
