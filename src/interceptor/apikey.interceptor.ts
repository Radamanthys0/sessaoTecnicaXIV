import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const apikeyInterceptor: HttpInterceptorFn = (req, next) => {

  // https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_tDAX3cd70LpcTQGHqqb18TD0BA3IxG6HEFC9qRLP&currencies=EUR%2CUSD%2CCAD

  let copyReq = req.clone({
    setParams: {
      apikey: environment.key
    }
  })


  return next(copyReq);
};
