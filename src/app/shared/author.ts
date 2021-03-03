export class Author{
    constructor(
        public id: string,
        public surname: string,
        public name: string,
        public birth: Date,
        public patronymic?:string,
        public books?: Array<Object>,
    ){}
}