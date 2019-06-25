class ProjectConfig {
  private name: string = 'awesome-project';
  private description: string = 'awesome description';
  private repository: string | undefined;

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getRepository(): string | undefined {
    return this.repository;
  }

  public setRepository(repositoryUrl: string) {
    this.repository = repositoryUrl;
  }
}

export default ProjectConfig;
