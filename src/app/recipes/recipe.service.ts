import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private selectedRecipeSource = new Subject<Recipe>();

  private recipesMock = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    ),
    new Recipe(
      'Another Test Recipe 2',
      'This is simply a test',
      'https://diethood.com/wp-content/uploads/2018/06/Grilled-Chicken-Thighs-Recipe.jpg',
      [
        new Ingredient('Custom 1', 1),
        new Ingredient('Custom 2', 1),
        new Ingredient('Custom 3', 1)
      ]
    )
  ];

  private recipes: Recipe[];

  selectedRecipe$ = this.selectedRecipeSource.asObservable();

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(): Observable<Recipe[]> {
    if (!this.recipes) {
      this.recipes = [...this.recipesMock];
      return of([...this.recipes]).pipe(delay(2000));
    } else {
      return of([...this.recipes]);
    }
  }

  getRecipe(index: number): Observable<Recipe> {
    return of(this.recipes[index]);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }
}
