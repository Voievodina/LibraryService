import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Author } from "./author";
import { Book } from "./book";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";



@Injectable()
export class BooksService {

    constructor(private http: HttpClient) { }


    getBooks(author): Observable<Book[]> {
        return this.http.get(`${environment.apiUrl + "authors"}/${author}`).pipe(
            map(
                response => {
                    let value = response as Author;
                    let a = new Author(value.id, value.surname, value.name, value.birth, value.patronymic, value.books);
                    let books: Book[] = [];
                    a.books.forEach(el => books.push(new Book(el.id, el.title, el.pages, el.genre)));
                    return books;
                }))
    }

    getBook(author, book): Observable<Book> {
        return this.http.get(`${environment.apiUrl + "authors"}/${author}`).pipe(
            map(response => {
                let value = response as Author;
                value.books as Book[];
                let el = value.books[book] as Book;
                return new Book(el.id, el.title, el.pages, el.genre)
            }))
    }
}