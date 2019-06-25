class GitAccessor {
  private pathToPrivateKey: string = '~/.ssh/id_rsa';

  public setPathToPrivateKey(path: string): void {
    this.pathToPrivateKey = path;
  }

  public getPathToPrivateKey(): string {
    return this.pathToPrivateKey;
  }
}

export default GitAccessor;
