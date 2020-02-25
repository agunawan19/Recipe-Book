import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { StringService } from 'src/app/shared/string.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput', { static: true }) private nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) private amountInputRef: ElementRef;
  private ingredientIndexSubscription: Subscription;
  private ingredients: Ingredient[];

  ingredientIndex = -1;
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
        this.ingredients = this.shoppingListService.getIngredients();
        this.ingredient = this.ingredients[this.ingredientIndex];
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
    this.ingredientIndex = -1;
    this.shoppingListService.selectedIngredientChange(this.ingredientIndex);
  }

  onIngredientNameChange(name: string): void {
    if (this.ingredientIndex > -1) {
      this.shoppingListService.ingredientNameChange(name);
    }
  }
}
