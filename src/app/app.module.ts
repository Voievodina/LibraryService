import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsComponent } from './authors/authors.component';
import { GenresComponent } from './genres/genres.component';
import {BackendService} from "./shared/backend.service";
import { AuthorsService } from './shared/authors.service';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { BooksService } from './shared/books.service';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { GenresService } from './shared/genres.service';
import { GenresEditComponent } from './genres/genres-edit/genres-edit.component';



@NgModule({
  declarations: [
    AppComponent, AuthorsComponent, GenresComponent,AuthorEditComponent, AuthorDetailsComponent,GenresEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(BackendService)
  ],
  providers: [AuthorsService, BooksService, GenresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
