import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitOnlyDirective } from './digit-only.directive';
import { DropDownDirective } from './drop-down.directive';
import { ArrayService } from './array.service';
import { StringService } from './string.service';

@NgModule({
  declarations: [
    DigitOnlyDirective,
    DropDownDirective
  ],
  exports: [
    DigitOnlyDirective,
    DropDownDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        ArrayService,
        StringService
      ]
    };
  }
}
