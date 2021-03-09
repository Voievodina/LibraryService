import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Author } from "src/app/shared/author";
import { AuthorsService } from "../../shared/authors.service";
import { BooksService } from "../../shared/books.service";
import { Book } from "src/app/shared/book";
import { GenresService } from "src/app/shared/genres.service";
import { Genre } from "src/app/shared/genre";

@Component({
    selector: "author-edit",
    templateUrl: "author-edit.component.html",
    styleUrls: ["author-edit.component.scss"]
})

export class AuthorEditComponent implements OnInit {
    author: Author;
    errorMessage: string;
    authorForm: FormGroup;
    collections: Book[];
    genres: Genre[];
    booksForm: FormArray;

    constructor(private AuthorsService: AuthorsService, private ActivatedRoute: ActivatedRoute, private Router: Router, private BooksService: BooksService, private fb: FormBuilder, private GenresSevice: GenresService) { }


    ngOnInit() {
        this.buildForm();
        this.getAuthorFromRoute();
        this.getBooksFromRoute();
    }

    checkError(element: string, errorType: string) {
        return this.authorForm.get(element).hasError(errorType) &&
            this.authorForm.get(element).touched
    }

    private getAuthorFromRoute() {
        let id = this.ActivatedRoute.snapshot.params['id'];
        if (id) {

            this.AuthorsService.getAuthor(id).subscribe(result => {
                this.author = result;
                this.authorForm.patchValue(this.author);
            },
                error => this.errorMessage = error
            );
        }
        else {
            this.author = new Author(null, null, null, null, null, null);
        }
    }

    private getBooksFromRoute() {
        let id = this.ActivatedRoute.snapshot.params['id'];
        this.GenresSevice.getGenres().subscribe(r => this.genres = r);
        if (id) {
            this.BooksService.getBooks(id).subscribe(result => {
                this.collections = result;
                this.collections.forEach(b => {
                    let bookForm = this.newBookForm();
                    bookForm.patchValue(b);
                    (this.authorForm.get("books") as FormArray).push(bookForm);
                })
            },
                error => this.errorMessage = error
            );
        }
        else {
            this.collections = [];
            this.collections.push(new Book(null, null, null, null))
                ;
            let bookForm = this.newBookForm();
            (this.authorForm.get("books") as FormArray).push(bookForm);
        }
    }


    private buildForm() {
        this.authorForm = this.fb.group({
            id: ["", Validators.required],
            surname: ["", Validators.required],
            name: ["", Validators.required],
            birth: ["", Validators.required],
            patronymic: [""],
            books: this.fb.array([]),
        })
    }

    get books(): FormArray {
        return this.authorForm.get("books") as FormArray;
    }

    private newBookForm(): FormGroup {
        return this.fb.group({
            id: ["", Validators.required],
            title: ["", Validators.required],
            pages: ["", Validators.required],
            genre: ["", Validators.required],
        })
    }

    onSubmit(authorForm: FormGroup) {
        this.author.id = authorForm.value.surname;
        this.author.surname = authorForm.value.surname;
        this.author.name = authorForm.value.name;
        this.author.birth = authorForm.value.birth;
        this.author.patronymic = authorForm.value.patronymic;
        this.author.books = authorForm.value.books;

        if (this.author.id) {
            this.AuthorsService.putAuthor(this.author)
                .subscribe(() => this.goBack(),
                    error => this.errorMessage = error
                );
        } else {
            this.AuthorsService.postAuthor(this.author)
                .subscribe(
                    () => this.goBack(),
                    error => this.errorMessage = error
                );
        }
    }

    addBook() {
        this.books.push(this.newBookForm());
    }

    deleteBook(i: number) {
        this.books.removeAt(i);
    }

    goBack() {
        this.Router.navigate(["/"]);
    }
}
