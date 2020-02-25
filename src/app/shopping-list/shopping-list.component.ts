import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { StringService } from '../shared/string.service';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(
    private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientChanged
      .subscribe(
        (ingredients: Ingredient[]) => this.ingredients = ingredients
      );
  }

  onIngredientClick(ingredient: Ingredient) {
    const ingredientIndex = this.ingredients.findIndex(i => i.name === ingredient.name);
    this.shoppingListService.editIngredient(ingredientIndex);
  }

  trackByIndex(index: number, ingredient: Ingredient): number {
    return index;
  }
}
