export default class LangService {
  getLangs() {
    console.log(this);
    return [
      { id: 1, word: 'Play' },
      { id: 2, word: 'Go' },
      { id: 3, word: 'Sleep' },
    ];
  }
}
