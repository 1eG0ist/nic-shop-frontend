export class OrderCell {
    constructor(product, count = 1) {
        this.product = product;
        this.count = count;
    }

    product;
    count;

    plus1() {
        this.count += 1;
    }

    minus1() {
        this.count -= 1;
    }
}