import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderInterceptor } from './header.interceptor';
import { LoaderInterceptor } from './loader.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
];
