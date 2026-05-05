import { Locator, Page } from "@playwright/test";
import { BasePage } from '../pages/base.page';

export class ProductPage extends BasePage {
    productName: Locator;
    unitPrice: Locator;
    addToCart: Locator;
    addToFav: Locator;
    productCart: Locator;


    constructor(page: Page) {
        super(page);
        this.productName = this.page.getByTestId('product-name');
        this.unitPrice = this.page.getByTestId('unit-price');
        this.addToCart = this.page.getByTestId('add-to-cart');
        this.addToFav = this.page.getByTestId('add-to-favorites');
        this.productCart = this.page.getByTestId('nav-cart');

    }
}
