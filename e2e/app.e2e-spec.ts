import { CommonsPage } from './app.po';

describe('commons App', function() {
  let page: CommonsPage;

  beforeEach(() => {
    page = new CommonsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
