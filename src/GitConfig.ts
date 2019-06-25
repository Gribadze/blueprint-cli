interface IRemoteData {
  name: string;
  url: string;
}

interface IUserData {
  name: string;
  email: string;
}

class GitConfig {
  private userData: IUserData | undefined;
  private remotes: {
    [name: string]: IRemoteData;
  } = {};

  public getUserData(): IUserData | undefined {
    return this.userData;
  }

  public setUserData(name: string, email: string): void {
    this.userData = { name, email };
  }

  public addRemote(name: string, url: string): void {
    this.remotes[name] = {
      name,
      url,
    };
  }

  public getRemote(name: string): IRemoteData {
    return this.remotes[name];
  }
}

export default GitConfig;
