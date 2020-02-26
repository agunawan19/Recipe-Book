import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { StringService } from '../shared/string.service';
import { ArrayService } from '../shared/array.service';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredientsMock = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  private ingredients: Ingredient[];
  private ingredientsSource = new Subject<Ingredient[]>();
  private ingredientIndexSource = new Subject<number>();
  private ingredientNameSource = new BehaviorSubject<string>('');
  private ingredientAmountSource = new BehaviorSubject<number>(0);
  private unselectedIngredientIndex = -1;

  ingredientIndex$ = this.ingredientIndexSource.asObservable();
  ingredients$ = this.ingredientsSource.asObservable();
  ingredientName$ = this.ingredientNameSource.asObservable();
  ingredientAmount$ = this.ingredientAmountSource.asObservable();

  constructor(private stringService: StringService,
              private arrayService: ArrayService) {
    this.getIngredients();
  }

  getIngredients(): Observable<Ingredient[]> {
    if (!this.ingredients) {
      this.ingredients = [...this.ingredientsMock];
      return of([...this.ingredients]).pipe(delay(2000));
    } else {
      return of([...this.ingredients]);
    }
  }

  addIngredient(ingredient: Ingredient): void {
    if (this.stringService.isNullOrWhitespace(ingredient.name)
      || ingredient.amount === 0) {
      return;
    }

    this.ingredients.push(ingredient);
    this.ingredients = this.arrayService.sumByKey(this.ingredients, 'name', 'amount');
    const ingredientIndex = this.ingredients.findIndex(
      (i: Ingredient) => i.name === ingredient.name
    );
    this.ingredientIndexSource.next(ingredientIndex);
    this.ingredientsSource.next([...this.ingredients]);
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredients = this.arrayService.sumByKey(this.ingredients, 'name', 'amount');
    this.ingredientsSource.next([...this.ingredients]);
  }

  deleteIngredient(ingredientIndex: number): void {
    if (ingredientIndex === this.unselectedIngredientIndex) {
      return;
    }

    this.ingredients.splice(ingredientIndex, 1);
    this.ingredientIndexSource.next(this.unselectedIngredientIndex);
    this.ingredientsSource.next([...this.ingredients]);
  }

  editIngredient(ingredientIndex: number): void {
    this.ingredientIndexSource.next(ingredientIndex);
  }

  ingredientNameChange(name: string) {
    this.ingredientNameSource.next(name);
  }

  ingredientAmountChange(amount: number) {
    this.ingredientAmountSource.next(amount);
  }

  selectedIngredientChange(ingredientIndex: number) {
    this.ingredientIndexSource.next(ingredientIndex);
  }
}
