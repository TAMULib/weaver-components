import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  browser.waitForAngularEnabled(false)
    .catch(err => { console.error(err); });

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display it works component', () => {
    page.navigateTo()
      .catch(err => { console.error(err); });
    expect(page.getItWorksText())
      .toEqual('Weaver Components Work!!!')
      .catch(err => { console.error(err); });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not
      .toContain(jasmine.objectContaining({
        level: logging.Level.SEVERE
      }));
  });
});
