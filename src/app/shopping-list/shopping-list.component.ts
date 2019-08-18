import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { StringService } from '../shared/string-service';

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

  constructor(private stringService: StringService) { }

  ngOnInit() {
  }

  onIngredientAdded(ingredient: Ingredient) {
    if (!this.stringService.isNullOrWhitespace(ingredient.name)
      && ingredient.amount > 0) {
      this.ingredients.push(ingredient);
    }
  }
}
