import { not } from 'wdio-wait-for';
import Page from './page';

class LoginPage extends Page {
    get mainTitle () {
        return $('#root > div > div.login_logo');
    }

    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('#login-button');
    }

    get errorContainer () {
        return $('#login_button_container > div > form > div.error-message-container.error > h3');
    }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open () {
        return super.open('login');
    }
}

export default new LoginPage;
