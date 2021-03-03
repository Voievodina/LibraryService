import {Component, OnInit} from "@angular/core";
import {GenresService} from "../shared/genres.service";
import {Genre} from "../shared/genre";
import {Router} from "@angular/router";

@Component({
    selector:"genres",
    templateUrl:"genres.component.html",
    styleUrls:["genres.component.scss"]
})

export class GenresComponent implements OnInit{
    genres;
    genre:Genre;
    visibility: boolean = true;
    vis:boolean=false;
    visable:boolean=true;

    constructor(private GenresService:GenresService, private Router:Router){}
    ngOnInit(){
        this.getGenres();
     }

     private getGenres(){
          this.GenresService.getGenres().subscribe(res=>this.genres=res);
     }

     addGenre(style){
        let newGenre=new Genre(this.genres.lenght+1,style)
        this.GenresService.postGenre(newGenre).subscribe();
        this.getGenres();
        this.visable=!this.visable;
        this.vis=!this.vis;
        this.visibility=!this.visibility
     }

     goBack(){
        this.Router.navigate(["/"]);
    }

    visible(){
        this.visable=!this.visable;
        this.vis=!this.vis;
        this.visibility=!this.visibility
    }

    editGenre(g){
        this.Router.navigate(["genres/edit", g.id, {id: g.id}]);
    }
    deleteGenre(g){
        this.genres=this.genres.filter(style=>style!==g);
        this.GenresService.deleteGenre(g).subscribe();
    }

    sort(){
        this.genres=this.genres.sort((a, b)=>a.style > b.style? 1 : -1);
    }
}