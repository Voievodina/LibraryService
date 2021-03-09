import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Genre } from "src/app/shared/genre";
import { GenresService } from "src/app/shared/genres.service";

@Component({
    selector: "genres-edit",
    templateUrl: "genres-edit.component.html"
})

export class GenresEditComponent implements OnInit {
    genre: Genre;

    constructor(private ActivatedRoute: ActivatedRoute, private GenresService: GenresService, private Router: Router) { }

    ngOnInit() {
        this.getGenreFromRoute();
    }

    getGenreFromRoute() {
        let id = this.ActivatedRoute.snapshot.params['id'];
        this.GenresService.getGenre(id).subscribe(res => { this.genre = res });
    }

    addGenre(genre) {
        this.GenresService.putGenre(genre).subscribe();
        this.goBack();
    }

    goBack() {
        this.Router.navigate(["/genres"]);
    }
}