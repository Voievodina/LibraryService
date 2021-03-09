import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { GenresComponent } from './genres/genres.component';
import { AuthorEditComponent } from "./authors/author-edit/author-edit.component";
import { AuthorDetailsComponent } from "./authors/author-details/author-details.component";
import { GenresEditComponent } from './genres/genres-edit/genres-edit.component';


const routes: Routes = [
  { path: "", redirectTo: "authors", pathMatch: "full" },
  { path: "authors", component: AuthorsComponent },
  { path: "authors/edit/:author", component: AuthorEditComponent },
  { path: "authors/add", component: AuthorEditComponent },
  { path: "authors/:author", component: AuthorDetailsComponent },
  { path: "genres", component: GenresComponent },
  { path: "genres/edit/:genre", component: GenresEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
