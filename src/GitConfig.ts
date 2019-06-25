interface IUserInfo {
  name: string;
  email: string;
}

class GitConfig {
  private readonly userName: string;
  private readonly userEmail: string;

  constructor(userInfo: IUserInfo) {
    this.userEmail = userInfo.email;
    this.userName = userInfo.name;
  }

  get Name() {
    return this.userName;
  }

  get Email() {
    return this.userEmail;
  }
}

export default GitConfig;
