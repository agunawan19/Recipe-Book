import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitOnlyDirective } from './digit-only.directive';
import { DropDownDirective } from './drop-down.directive';

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
export class SharedModule { }
