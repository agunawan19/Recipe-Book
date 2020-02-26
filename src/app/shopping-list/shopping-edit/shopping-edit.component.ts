import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { StringService } from 'src/app/shared/string.service';
import { Subscription, Observable } from 'rxjs';
import { promise } from 'protractor';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput', { static: true }) private nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) private amountInputRef: ElementRef;
  private unselectedIngredientIndex = -1;
  private ingredientIndexSubscription: Subscription;
  private ingredients: Ingredient[];

  ingredientIndex = this.unselectedIngredientIndex;
  clearItemAfterAdd = false;
  ingredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
              private stringService: StringService) {
  }

  ngOnInit() {
    this.ingredientIndexSubscription = this.shoppingListService.ingredientIndex$
      .subscribe(
        ingredient => {
          this.ingredientIndex = ingredient;

          // this.ingredients = this.shoppingListService.getIngredients();
          this.shoppingListService.getIngredients()
            .subscribe(
              (ingredients: Ingredient[]) => this.ingredients = ingredients
            );

          const promises: Promise<any>[] = [];
          promises.push(this.shoppingListService.getIngredients().toPromise());

          // this.ingredient = this.ingredients[this.ingredientIndex];
          Promise.all(promises).then(
            responses => {
              console.log('Promise: ', responses);
              this.ingredient = responses[0][this.ingredientIndex];
            });
        });
  }

  ngOnDestroy(): void {
    this.ingredientIndexSubscription.unsubscribe();
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

  onDeleteItem(): void {
    this.shoppingListService.deleteIngredient(this.ingredientIndex);
  }

  onClearItem(): void {
    this.clearItem();
  }

  private clearItem() {
    this.ingredient = null;
    this.ingredientIndex = this.unselectedIngredientIndex;
    this.shoppingListService.selectedIngredientChange(this.ingredientIndex);
  }

  onIngredientNameChange(name: string): void {
    if (this.ingredientIndex === this.unselectedIngredientIndex) {
      return;
    }

    this.shoppingListService.ingredientNameChange(name);
  }

  onIngredientAmountChange(amount: number): void {
    if (this.ingredientIndex === this.unselectedIngredientIndex) {
      return;
    }

    this.shoppingListService.ingredientAmountChange(amount);
  }
}
