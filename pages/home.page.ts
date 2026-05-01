import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "./headerFragment";
import { Category } from '../enums/category.enum';

export class HomePage {
    page: Page;
    header: HeaderFragment;
    productLink: Locator;
    products: Locator;


    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productLink = this.page.getByText('Combination Pliers');
        this.products = this.page.getByTestId('product-name');
    }

    categoryCheckbox(category: Category, subCategory: string) {
     return this.page
    .locator('label')
    .filter({ hasText: subCategory });
}
}
