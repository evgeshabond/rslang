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
  page: number,
  group: number
}
//  get words Page
const getWordsPage = async ({
  page,
  group
}: GetWordsPageProps) => {
  try {
    const wordsPage = await getWordList({page, group})
    console.log('insied getWordsPage. returned words are ', wordsPage)
    return wordsPage
  }
  catch(e) {
    console.log(e)
  }
  return []
}

export default getWordsPage

