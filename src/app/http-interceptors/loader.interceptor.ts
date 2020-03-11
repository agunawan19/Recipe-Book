import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { LoaderService } from '../shared/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.warn('LoaderInterceptors');

    const loaderService = this.injector.get(LoaderService);

    loaderService.show();

    return next.handle(request).pipe(
      delay(1000),
      finalize(() => loaderService.hide())
    );
  }
}
