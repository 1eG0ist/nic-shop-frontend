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

    static fromJson(json) {
        return json.map(product => new Product(product));
    }
}