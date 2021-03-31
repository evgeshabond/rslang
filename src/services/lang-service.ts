import { mainPath } from '../utils/constants';

export default class LangService {
  langUrl: string;

  constructor() {
    this.langUrl = mainPath.langUrl;
  }

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
}
