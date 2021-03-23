import { authErrorPath } from '../utils/constants';

export default class LangService {
  langUrl = 'https://rslang-app.herokuapp.com/';

  async getWordList(listProps: { page: number; group: number }) {
    const { page, group } = listProps;
    const res = await fetch(
      `${this.langUrl}words?page=${page}&group=${group}`,
      {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await res.json();
    return data;
  }

  async createUser(user: { email: string; name: string; password: string }) {
    const rawResponse = await fetch(`${this.langUrl}users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (rawResponse.status === 417) {
      const data = {
        error: {
          errors: [
            {
              path: authErrorPath.email,
              message: 'почта уже зарегистрирована',
            },
          ],
        },
      };
      return data;
    }
    const content = await rawResponse.json();
    return content;
  }

  async loginUser(user: { email: string; password: string }) {
    const rawResponse = await fetch(`${this.langUrl}signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (rawResponse.status === 404) {
      return { error: { message: 'Пользователь не найден', path: 'email' } };
    }

    if (rawResponse.status === 403) {
      return { error: { message: 'Пароль не верный', path: 'password' } };
    }

    const content = await rawResponse.json();
    return content;
  }
}
