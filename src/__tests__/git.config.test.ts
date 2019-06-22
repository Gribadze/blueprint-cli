import GitConfig from '../git.config';

describe('GitConfig test', () => {
  it('test getters', () => {
    const config = new GitConfig({ name: 'Gribadze', email: 'fedor.dmitry@gmail.com' });
    expect(config.Name).toBe('Gribadze');
    expect(config.Email).toBe('fedor.dmitry@gmail.com');
  });
});
