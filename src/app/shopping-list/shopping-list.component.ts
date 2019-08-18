import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { StringUtility } from '../shared/string-utility';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() { }

  ngOnInit() {
  }

  onIngredientAdded(ingredient: Ingredient) {
    if (!StringUtility.isNullOrWhitespace(ingredient.name)
      && ingredient.amount > 0) {
      this.ingredients.push(ingredient);
    }
  }
}
