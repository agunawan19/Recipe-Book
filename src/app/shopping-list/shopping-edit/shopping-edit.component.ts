import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { StringService } from 'src/app/shared/string-service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  clearItemAfterAdd = false;

  constructor(private shoppingListService: ShoppingListService,
              private stringService: StringService) { }

  ngOnInit() {
  }

  onAddItem(clearItemAfterAdd: boolean): void {
    const ingredientName: string = this.nameInputRef.nativeElement.value;
    const ingredientAmount: number = parseInt(this.amountInputRef.nativeElement.value, 10);
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.shoppingListService.addIngredient(newIngredient);

    if (clearItemAfterAdd && !isNaN(ingredientAmount) && ingredientAmount > 0 ) {
      this.clearItem();
    }
  }

  private clearItem() {
    this.nameInputRef.nativeElement.value = '';
    this.amountInputRef.nativeElement.value = '';
  }

  onClearItem(): void {
    this.clearItem();
  }
}
