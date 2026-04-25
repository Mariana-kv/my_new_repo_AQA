import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "./headerFragment";

export class HomePage {
    page: Page;
    header: HeaderFragment;
    productLink: Locator;
    productName: Locator;
    unitPrice: Locator;
    addToCart: Locator;
    addToFav: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productLink = this.page.getByText('Combination Pliers');
        this.productName = this.page.getByTestId('product-name');
        this.unitPrice = this.page.getByTestId('unit-price');
        this.addToCart = this.page.getByTestId('add-to-cart');
        this.addToFav = this.page.getByTestId('add-to-favorites');
    }
}
