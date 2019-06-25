import Question from './Question';

class Questionnaire {
  private questions: Question[] = [];
  private currentIndex: number = 0;

  public addQuestion(body: string) {
    this.questions.push(new Question(body));
  }

  public nextQuestion(): string {
    const question = this.questions[this.currentIndex];
    this.currentIndex += 1;
    return question && question.getBody();
  }

  public reset() {
    this.currentIndex = 0;
  }

  get length() {
    return this.questions.length;
  }
}

export default Questionnaire;
