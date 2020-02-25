import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { StringService } from 'src/app/shared/string.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  clearItemAfterAdd = false;
  subscription: Subscription;
  private ingredientIndex: number;
  private ingredients: Ingredient[];
  ingredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
              private stringService: StringService) {
    if (!this.ingredient) {
      this.ingredient = {
        name: '',
        amount: 0
      };
    }

    this.subscription = shoppingListService.ingredient$.subscribe(
      ingredient => {
        this.ingredientIndex = ingredient;
        this.ingredients = shoppingListService.getIngredients();
        this.ingredient = this.ingredients[this.ingredientIndex];
      });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddItem(clearItemAfterAdd: boolean): void {
    const ingredientName: string = this.nameInputRef.nativeElement.value;
    const ingredientAmount: number = +this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.shoppingListService.addIngredient(newIngredient);

    if (clearItemAfterAdd && !isNaN(ingredientAmount) && ingredientAmount > 0 ) {
      this.clearItem();
    }
  }

  private clearItem() {
    this.ingredient = null;
    this.ingredientIndex = -1;
    this.nameInputRef.nativeElement.value = '';
    this.amountInputRef.nativeElement.value = '';
  }

  onClearItem(): void {
    this.clearItem();
  }
}
