export class Product {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.count = data.count;
        this.imagePath = data.imagePath;
        this.sale = data.sale;
        // this.categories = data.categories;
    }

    id;
    name;
    description;
    price;
    count;
    imagePath;
    sale;

    static fromJsons(jsons) {
        return jsons.map(product => new Product(product));
    }

    static fromJson(json) {
        return new Product(json);
    }
}