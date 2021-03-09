import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable()
export class BackendService implements InMemoryDbService {
    constructor() { }

    createDb() {
        return {
            authors: [
                {
                    id: "Пушкин", surname: "Пушкин", name: "Александр", patronymic: "Сергеевич", birth: new Date("1799, 06,06").toLocaleDateString(), books: [
                        { id: 0, title: "Капитанская дочка", pages: 480, genre: "роман" },
                        { id: 1, title: "Дубровский", pages: 50, genre: "роман" },
                    ]
                },
                {
                    id: "Шевченко", surname: "Шевченко", name: "Тарас", patronymic: "Григорьевич", birth: new Date("1814, 03,09").toLocaleDateString(), books: [
                        { id: 0, title: "Кобзарь", pages: 115, genre: "поэзия" },
                        { id: 1, title: "Катерина", pages: 157, genre: "роман" },
                    ]
                },
                {
                    id: "Булгаков", surname: "Булгаков", name: "Михаил", patronymic: "Афанасьевич", birth: new Date("1891,05,15").toLocaleDateString(), books: [
                        { id: 0, title: "Собачье сердце", pages: 320, genre: "сатира" },
                        { id: 1, title: "Записки юного врача", pages: 384, genre: "художественный вымысел" }
                    ]
                },
            ],

            genres: [
                { id: 0, style: "роман" },
                { id: 1, style: "поэзия" },
                { id: 2, style: "сатира" },
                { id: 3, style: "художественный вымысел" }
            ]
        }
    }
}