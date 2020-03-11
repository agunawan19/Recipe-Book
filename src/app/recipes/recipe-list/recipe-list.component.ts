import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';
import { pipe } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSubscription: Subscription;

  constructor(
    public loaderService: LoaderService,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes();

    // this.recipeService.getRecipes()
    //   .subscribe(
    //     (recipes: Recipe[]) => this.recipes = recipes
    //   );
    console.log('RecipeListComponent');

    this.recipesSubscription = this.recipeService.loadRecipes()
      .subscribe(
        (recipes) => {
          console.log('Recipe List on Init.');
          this.recipes = recipes;
        });
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
