export class ProductComment {
    constructor(data) {
        this.id = data.id;
        this.createdDate = data.createdDate;
        this.user = data.user;
        this.product = data.product;
        this.rating = data.rating;
        this.comment = data.comment;
        this.imagePath = data.imagePath;
    }

    id;
    createdDate;
    user;
    product;
    rating;
    comment;
    imagePath;

    static fromJsons(jsons) {
        return jsons.map(
            productComment => new ProductComment(productComment)
        );
    }
}