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
}
