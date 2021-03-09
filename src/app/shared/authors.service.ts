import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Author } from "./author";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Injectable()
export class AuthorsService {

    constructor(private http: HttpClient) { }

    getAuthors(): Observable<Author[]> {
        return this.http.get(environment.apiUrl + "authors").pipe(
            map(response => {
                let value = response as Author[];
                let result: Author[] = [];
                value.forEach(element => {
                    result.push(new Author(element.id, element.surname, element.name, element.birth, element.patronymic, element.books,));
                });
                return result;
            })
        );
    }

    getAuthor(author): Observable<Author> {
        return this.http.get(`${environment.apiUrl + "authors"}/${author}`).pipe(
            map(response => {
                let value = response as Author;
                return new Author(value.id, value.surname, value.name, value.birth, value.patronymic, value.books)
            }))
    }

    putAuthor(author): Observable<Object> {
        return this.http.put(`${environment.apiUrl + "authors"}/${author.id}`, author);
    }

    deleteAuthor(author): Observable<Object> {
        return this.http.delete(`${environment.apiUrl + "authors"}/${author.id}`)
    }


    postAuthor(author) {
        return this.http.post(environment.apiUrl + "authors", author)
    }
}