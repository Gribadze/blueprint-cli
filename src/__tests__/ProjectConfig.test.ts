import ProjectConfig from '../ProjectConfig';

describe('ProjectConfig test', () => {
  it('test default values', () => {
    const config = new ProjectConfig();
    expect(config.getName()).toBe('awesome-project');
    expect(config.getDescription()).toBe('awesome description');
    expect(config.getRepository()).toBeUndefined();
  });
  it('test getters', () => {
    const config = new ProjectConfig();
    const testConfig = {
      description: 'example description',
      name: 'example name',
      repository: 'example repo',
    };
    config.setName(testConfig.name);
    expect(config.getName()).toBe(testConfig.name);
    config.setDescription(testConfig.name);
    expect(config.getDescription()).toBe(testConfig.name);
    config.setRepository(testConfig.name);
    expect(config.getRepository()).toBe(testConfig.name);
  });
});
