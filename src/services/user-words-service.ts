// import { serverUrlLocal } from '../utils/constants';
import { serverUrl } from '../utils/constants';

export default class UserWordsService {
  checkErr = (status: number) => {
    if (status === 417) {
      throw new Error('слово уже добавлено в словарь');
    }
    if (status === 404) {
      throw new Error('сервер не доступен');
    }
    if (status === 401) {
      throw new Error('пожалуйста авторизуйтесь');
    }
    if (status === 400) {
      throw new Error('некорректный запрос');
    }
  };

  addWord = async (params: {
    userId: string;
    wordId: string;
    token: string;
    body: {
      difficulty: string;
      optional: {
        learning?: boolean;
      };
    };
  }) => {
    const res = await fetch(
      `${serverUrl}users/${params.userId}/words/${params.wordId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params.body),
      }
    );
    this.checkErr(res.status);
    const data = await res.json();
    return data;
  };

  getWord = async (params: {
    userId: string;
    wordId: string;
    token: string;
  }) => {
    const res = await fetch(
      `${serverUrl}users/${params.userId}/words/${params.wordId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    this.checkErr(res.status);
    const data = await res.json();
    return data;
  };

  updateWord = async (
    params: {
      userId: string;
      wordId: string;
      token: string;
    },
    body: {
      difficulty?: string;
      optional?: {
        learning?: boolean;
      };
    }
  ) => {
    const res = await fetch(
      `${serverUrl}users/${params.userId}/words/${params.wordId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    this.checkErr(res.status);
    const data = await res.json();
    return data;
  };

  removeWord = async (params: {
    userId: string;
    wordId: string;
    token: string;
  }) => {
    const res = await fetch(
      `${serverUrl}users/${params.userId}/words/${params.wordId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    this.checkErr(res.status);

    return null;
  };

  getWordsList = async (params: { userId: string; token: string }) => {
    const res = await fetch(`${serverUrl}users/${params.userId}/words`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${params.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    this.checkErr(res.status);

    const data = await res.json();

    return data;
  };
}
