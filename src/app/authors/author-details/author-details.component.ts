import { Component, OnInit } from "@angular/core";
import { Author } from "src/app/shared/author";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorsService } from "../../shared/authors.service";
import { BooksService } from "../../shared/books.service";
import { Book } from "../../shared/book";


@Component({
    selector: "author-details",
    templateUrl: "author-details.component.html",
    styleUrls: ["author-details.component.scss"]
})

export class AuthorDetailsComponent implements OnInit {

    author: Author;
    surname: string;
    books: Book[];
    constructor(private ActivatedRoute: ActivatedRoute, private AuthorsService: AuthorsService, private BooksService: BooksService, private Router: Router) { }

    ngOnInit() {
        this.getAuthor();
        this.getBooks();
    }

    private getAuthor() {
        let id = this.ActivatedRoute.snapshot.params['id'];
        this.AuthorsService.getAuthor(id).subscribe(result => this.author = result);
    }
    
    private getBooks() {
        let id = this.ActivatedRoute.snapshot.params['id'];
        this.BooksService.getBooks(id).subscribe(result => this.books = result);
    }

    goBack() {
        this.Router.navigate(["../"]);
    }
}