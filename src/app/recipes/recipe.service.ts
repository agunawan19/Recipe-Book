import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test',
      'https://diethood.com/wp-content/uploads/2018/06/Grilled-Chicken-Thighs-Recipe.jpg'),
    new Recipe('Another Test Recipe', 'This is simply a test',
      'https://diethood.com/wp-content/uploads/2018/06/Grilled-Chicken-Thighs-Recipe.jpg'),
    new Recipe('Another Test Recipe 2', 'This is simply a test',
      'https://diethood.com/wp-content/uploads/2018/06/Grilled-Chicken-Thighs-Recipe.jpg')
  ];

  constructor() { }

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }
}
