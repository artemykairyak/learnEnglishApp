import API from './APIService'

class WordsAPI {
    getAllWords = () => API.get('/api/words');
    getWordsForTest = () => API.get('/api/wordsForTest');
    addWord = (word) => API.post('/api/words', word);
}

export default new WordsAPI();
