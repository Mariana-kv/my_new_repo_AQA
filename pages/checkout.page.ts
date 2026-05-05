import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
    page: Page;
    productQuantity: Locator;
    productTitle: Locator;
    proceedCheckoutBtn: Locator;
    productCheckoutPrice: Locator;
    productCheckoutTotalPrice: Locator;
    productCheckoutSuccessBtn: Locator;
    countryCheckoutPage: Locator;
    postalCodeCheckoutPage: Locator;
    houseNumberCheckoutPage: Locator;
    addressCheckoutPageProceedBtn: Locator;
    cardCheckoutPage: Locator;
    cardNumberCheckoutPage: Locator;
    expirationDateCheckoutPage: Locator;
    cvvCheckoutPage: Locator;
    cardNameCheckoutPage: Locator;
    confirmBtnCheckoutPage: Locator;
    successCheckoutPage: Locator;




    constructor(page: Page) {
        this.page = page;
        this.productQuantity = this.page.getByTestId('product-quantity');
        this.productTitle = this.page.getByTestId('product-title');
        this.proceedCheckoutBtn = this.page.getByTestId('proceed-1');
        this.productCheckoutPrice = this.page.getByTestId('product-price');
        this.productCheckoutTotalPrice = this.page.getByTestId('line-price');
        this.productCheckoutSuccessBtn = this.page.getByTestId('proceed-2');
        this.countryCheckoutPage = this.page.getByTestId('country');
        this.postalCodeCheckoutPage = this.page.getByTestId('postal_code');
        this.houseNumberCheckoutPage = this.page.getByTestId('house_number');
        this.addressCheckoutPageProceedBtn = this.page.getByTestId('proceed-3');
        this.cardCheckoutPage = this.page.getByTestId('payment-method');
        this.cardNumberCheckoutPage = this.page.getByTestId('credit_card_number');
        this.expirationDateCheckoutPage = this.page.getByTestId('expiration_date')
        this.cvvCheckoutPage = this.page.getByTestId('cvv');
        this.cardNameCheckoutPage = this.page.getByTestId('card_holder_name');
        this.confirmBtnCheckoutPage = this.page.getByTestId('finish');
        this.successCheckoutPage = this.page.getByTestId('payment-success-message');

    }
}
