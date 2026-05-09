import { AccountPage } from "./account.page";
import { BasePage } from "./base.page";
import { CheckoutPage } from "./checkout.page";
import { HomePage } from "./home.page";
import { LoginPage } from "./login.page";
import { Page } from '@playwright/test';
import { ProductPage } from "./product.page";

export class AllPages {
    loginPage: LoginPage;
    accountPage: AccountPage;
    basePage: BasePage;
    checkoutPage: CheckoutPage;
    homePage: HomePage;
    productPage: ProductPage;
    constructor(page: Page){
        this.loginPage = new LoginPage(page);
        this.accountPage = new AccountPage(page);
        this.basePage = new BasePage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.homePage = new HomePage(page);
        this.productPage = new ProductPage(page);
    }
}
