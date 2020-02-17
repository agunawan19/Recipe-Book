import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { StringService } from '../shared/string.service';
import { ArrayService } from '../shared/array.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor(private stringService: StringService,
              private arrayService: ArrayService) { }

  getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }

  addIngredient(ingredient: Ingredient): void {
    if (!this.stringService.isNullOrWhitespace(ingredient.name)
      && ingredient.amount > 0) {
      this.ingredients.push(ingredient);
      this.ingredients = this.arrayService.sumByKey(this.ingredients, 'name', 'amount');
    }
    this.ingredientChanged.emit([...this.ingredients]);
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredients = this.arrayService.sumByKey(this.ingredients, 'name', 'amount');
    this.ingredientChanged.emit([...ingredients]);
  }
}
