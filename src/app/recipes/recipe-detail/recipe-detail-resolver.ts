import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeDetailResolver implements Resolve<Observable<Recipe>> {
  constructor(private recipeService: RecipeService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<Recipe> | Observable<Observable<Recipe>> | Promise<Observable<Recipe>> {
    console.warn('Resolver');

    const id = route.paramMap.get('id');

    const result = this.recipeService.loadRecipes().pipe(
      map(recipes => recipes[id])
    ) as Observable<Recipe>;

    return result;
  }
}
