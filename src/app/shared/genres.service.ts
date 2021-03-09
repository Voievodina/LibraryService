import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Genre } from "../shared/genre";

@Injectable()
export class GenresService {

    constructor(private http: HttpClient) { }

    getGenres(): Observable<Genre[]> {
        return this.http.get(environment.apiUrl + "genres").pipe(
            map(response => {
                let value = response as Genre[];
                let result:Genre[] = [];
                value.forEach(element =>
                    result.push(new Genre(element.id, element.style)));
                return result;
            }))
    }

    getGenre(genre): Observable<Genre> {
        return this.http.get(`${environment.apiUrl + "genres"}/${genre}`).pipe(
            map(response => {
                let value = response as Genre;
                return new Genre(value.id, value.style);
            }))
    }

    postGenre(genre) {
        return this.http.post(environment.apiUrl + "genres", genre);
    }

    putGenre(genre) {
        return this.http.put(`${environment.apiUrl + "genres"}/${genre.id}`, genre);
    }

    deleteGenre(genre) {
        return this.http.delete(`${environment.apiUrl + "genres"}/${genre.id}`);
    }
}