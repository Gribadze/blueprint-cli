export type TProgrammingLanguage = 'JS' | 'TS';

export type TConfigObject = {
  [key in TProgrammingLanguage]: any;
};

export interface IProjectSettings {
  directory: string;
  name: string;
  description: string;
  language: TProgrammingLanguage;
}
