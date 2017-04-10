import { ClubAppFEPage } from './app.po';

describe('club-app-fe App', function() {
  let page: ClubAppFEPage;

  beforeEach(() => {
    page = new ClubAppFEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
