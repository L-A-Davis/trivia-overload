const BASE_URL = `https://opentdb.com/api.php?`
const AMOUNT = `amount=50`
const CATEGORY = `category=11`
const DIFFICULTY = `difficulty=medium`
const CATEGORY_API = `https://opentdb.com/api_category.php`

class Adapter {

  static getQuestions(category){
     return fetch(`${BASE_URL}${AMOUNT}&category=${category}&type=multiple`).then(resp => resp.json())
  }

  static getCategories() {
    return fetch(`${CATEGORY_API}`).then(resp => resp.json())
  }


}
