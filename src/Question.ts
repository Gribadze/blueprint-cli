class Question {
  private readonly body: string;

  constructor(body: string) {
    this.body = body;
  }

  public getBody(): string {
    return this.body;
  }
}

export default Question;
