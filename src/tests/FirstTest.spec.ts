import { User } from '../models/compModel';

test('ok', () => {
  const user = new User();
  user.name = 'Tiago';
  expect(user.name).toEqual('Tiago');
});
