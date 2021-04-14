import { serverUrl } from './constants';

const getWordList = async (listProps: { page: number; group: number }) => {
  const { page, group } = listProps;
  const res = await fetch(`${serverUrl}words?page=${page}&group=${group}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  });
  const data = await res.json();
  return data;
};

type GetWordsPageProps = {
  page: number;
  group: number;
};

const getWordsPage = async ({ page, group }: GetWordsPageProps) => {
  try {
    const wordsPage = await getWordList({ page, group });
<<<<<<< HEAD

    return wordsPage;
  } catch (e) {
    console.error(e);
=======
    return wordsPage;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
>>>>>>> 4d7a7a5eadc9d60288f736ee02a8bb1ec685f471
  }
  return [];
};

export default getWordsPage;
