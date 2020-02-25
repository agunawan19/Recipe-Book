import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { StringService } from '../shared/string.service';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  private ingredientsSubscription: Subscription;
  private ingredientNameSubscription: Subscription;
  private ingredientIndexSubscription: Subscription;
  private ingredientName = '';
  ingredientIndex = -1;

  constructor(
    private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsSubscription = this.shoppingListService.ingredients$
      .subscribe(
        (ingredients: Ingredient[]) => this.ingredients = ingredients
      );

    this.ingredientNameSubscription = this.shoppingListService.ingredientName$
      .subscribe(
        (name: string) => {
          if (this.ingredientIndex === -1) {
            return;
          }

          console.log(name);
          this.ingredientName = name;
          this.ingredients[this.ingredientIndex].name = this.ingredientName;
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
    this.ingredientIndexSubscription.unsubscribe();
  }

  onIngredientClick(ingredient: Ingredient) {
    const ingredientIndex = this.ingredients.findIndex(i => i.name === ingredient.name);
    this.shoppingListService.editIngredient(ingredientIndex);
  }

  trackByIndex(index: number, ingredient: Ingredient): number {
    return index;
  }
}
