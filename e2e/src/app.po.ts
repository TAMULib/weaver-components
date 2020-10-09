import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<any> {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  async getItWorksText(): Promise<string> {
    return element(by.css('wvre-it-works'))
      .getText() as Promise<string>;
  }
}
