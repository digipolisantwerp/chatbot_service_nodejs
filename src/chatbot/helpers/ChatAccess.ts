import getToken from './getToken';

export default class ChatAccess{
  private static instance: ChatAccess;
  // Assign "new Singleton()" here to avoid lazy initialisation
  constructor(username: string, password: string, url: string) {
    if (ChatAccess.instance) {
      return ChatAccess.instance;
    }

    function getAccessToken(username: string, password: string, url: string) {
      return getToken(username, password, url).then(({ id }) => {
        return id;
      });
    }

    this.accessToken = getAccessToken(username, password, url);

    ChatAccess.instance = this;
  }
  accessToken: Promise<string>;
}
