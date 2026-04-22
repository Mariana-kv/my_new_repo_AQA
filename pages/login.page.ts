import { Locator, Page } from "@playwright/test";

export class LoginPage {
    page: Page;
    emailField: Locator;
    passwordField: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = this.page.getByTestId('email');
        this.passwordField = this.page.getByTestId('password');
        this.loginButton = this.page.getByTestId('login-submit');
    }

    async performLogin(email: string, password: string): Promise<void> {
     await this.emailField.fill(email);
     await this.passwordField.fill(password);
     await this.loginButton.click();
}
}