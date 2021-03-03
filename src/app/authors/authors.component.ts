import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { from } from "rxjs";
import {Author} from "../shared/author";
import {AuthorsService} from "../shared/authors.service";
import {BooksService} from "../shared/books.service";
import {Book} from "../shared/book"



@Component({
    selector:"authors",
    templateUrl:"authors.component.html",
    styleUrls:["authors.component.scss"]
})
export class AuthorsComponent implements OnInit {

    authors: Author[];
    errorMessage: string;
    bookTitle:string;
    visibility:boolean=true;
    visible:boolean=false;
    vis:boolean=true;
    collecton:Array<any>;
    book:Book;

     constructor(private AuthorsService:AuthorsService, private Router:Router, private BooksService:BooksService){}

     ngOnInit(){
        this.getAuthors();
     }

     private getAuthors() {
      this.AuthorsService.getAuthors().subscribe(
          result => {this.authors = result,
          error => this.errorMessage = error}
      );
   }

     edit(selected:Author){
      this.Router.navigate(["authors/edit", selected.id, {id: selected.id}] )
     }

     delete(selected:Author){
        this.authors=this.authors.filter(a=>a!==selected);
        this.AuthorsService.deleteAuthor(selected).subscribe();
     }

     details(selected:Author){
      this.Router.navigate(["authors", selected.id, {id: selected.id}])
     }

     addAuthor(){
      this.Router.navigate(["authors/add"]);
     }

     show(){
         this.visibility=!this.visibility;
         this.visible=!this.visible;
         this.vis=!this.vis;
     }

     createArr(key){
        this.getAuthors();
        this.collecton=[];
        this.authors.forEach(author=>{
        let index=Object.getOwnPropertyNames(author).indexOf(key); 
        this.collecton.push(Object.values(author)[index])
        } );
        return this.collecton;
        
     }

     sort(key){
        this.authors=this.authors.sort(function (a, b){
            if(key=="books"){
                let valueA=a[key].length;
                let valueB=b[key].length;{
                    if (valueA > valueB) {
                        return -1;
                    } else if (valueA < valueB) {
                        return 1;
                    } else {
                        return 0;
                    }
                }

            }
            else{
                    if (a[key] < b[key]) {
                    return -1;
                } else if (a[key] > b[key]) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
     }

     searhBook(){
        this.getAuthors();
        this.show();
        this.vis=!this.vis;
        this.createArr("books");
        this.collecton.forEach(bookArr=>{ 
            bookArr.forEach(book=>{
                 if(book.title==this.bookTitle){
                    this.book=book;
                }})
                 })
    }


}