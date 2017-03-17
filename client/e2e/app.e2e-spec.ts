import { HeringsfishLogClientPage } from './app.po';

describe('heringsfish-log-client App', () => {
  let page: HeringsfishLogClientPage;

  beforeEach(() => {
    page = new HeringsfishLogClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
