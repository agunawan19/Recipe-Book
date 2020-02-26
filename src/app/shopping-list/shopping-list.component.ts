import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { StringService } from '../shared/string.service';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientIndex = -1;

  private unselectedIngredientIndex = -1;
  private ingredientsSubscription: Subscription;
  private ingredientNameSubscription: Subscription;
  private ingredientAmountSubscription: Subscription;
  private ingredientIndexSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    // this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.getIngredients()
      .subscribe(
        (ingredients: Ingredient[]) => this.ingredients = ingredients
      );

    this.ingredientsSubscription = this.shoppingListService.ingredients$
      .subscribe(
        (ingredients: Ingredient[]) => this.ingredients = ingredients
      );

    this.ingredientNameSubscription = this.shoppingListService.ingredientName$
      .subscribe(
        (name: string) => {
          if (this.ingredientIndex === this.unselectedIngredientIndex) {
            return;
          }

          console.log(name);
          this.ingredients[this.ingredientIndex].name = name;
        }
      );


    this.ingredientAmountSubscription = this.shoppingListService.ingredientAmount$
      .subscribe(
        (amount: number) => {
          if (this.ingredientIndex === this.unselectedIngredientIndex) {
            return;
          }

          console.log(name);
          this.ingredients[this.ingredientIndex].amount = amount;
        }
      );

    this.ingredientIndexSubscription = this.shoppingListService.ingredientIndex$
      .subscribe(
        (ingredientIndex: number) => {
          this.ingredientIndex = ingredientIndex;
          console.log(`index: ${ingredientIndex}`);
        }
      );
  }

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe();
    this.ingredientNameSubscription.unsubscribe();
    this.ingredientAmountSubscription.unsubscribe();
    this.ingredientIndexSubscription.unsubscribe();
  }

  onIngredientClick(ingredient: Ingredient) {
    const ingredientIndex = this.ingredients.findIndex(i => i.name === ingredient.name);
    this.shoppingListService.editIngredient(ingredientIndex);
  }

  trackByIndex(index: number, ingredient: Ingredient): number {
    console.log('trackByIndex', index, ingredient);
    return index;
  }
}
