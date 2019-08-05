import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test',
      'https://diethood.com/wp-content/uploads/2018/06/Grilled-Chicken-Thighs-Recipe.jpg'),
    new Recipe('Another Test Recipe', 'This is simply a test',
    'https://diethood.com/wp-content/uploads/2018/06/Grilled-Chicken-Thighs-Recipe.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
