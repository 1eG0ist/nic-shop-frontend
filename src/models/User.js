export class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.surname = data.surname;
        this.email = data.email;
    }

    id;
    name;
    surname;
    email;
}