const BASE_URL = `https://opentdb.com/api.php?`
const AMOUNT = `amount=20`
const CATEGORY = `category=11`
const DIFFICULTY = `difficulty=medium`

class Adapter {

  static getQuestions(){
     return fetch(`${BASE_URL}${AMOUNT}&${CATEGORY}&${DIFFICULTY}`).then(resp => resp.json())
  }


}
