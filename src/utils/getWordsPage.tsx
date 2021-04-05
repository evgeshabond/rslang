import LangService from "../services/lang-service"

const langService = new LangService()

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
    const wordsPage = await langService.getWordList({page, group})
    return wordsPage
  }
  catch(e) {
    console.log(e)
  }
  return []
}

export default getWordsPage