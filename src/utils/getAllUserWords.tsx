import UserWordsService from '../services/user-words-service';

const userWordsService = new UserWordsService();

//  fetch all userwords from backend
const getAllUserWords = async (user: any) => {
  try {
    const words = await userWordsService.getWordsList({
      userId: user.userId,
      token: user.token,
    });
    return words;
  } catch (e) {
    console.log(e);
  }
  return [];
};

export default getAllUserWords;
