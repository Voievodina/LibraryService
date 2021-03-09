export class Book {
    public id: number;
    public title: string;
    public pages: number;
    public genre: string;
    constructor(id, title, pages, genre) {
        this.id = id;
        this.title = title;
        this.pages = pages;
        this.genre = genre;
    }
}