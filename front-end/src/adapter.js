const BASE_URL = `https://opentdb.com/api.php?`
const AMOUNT = `amount=50`
const CATEGORY = `category=11`
const DIFFICULTY = `difficulty=medium`
const CATEGORY_API = `https://opentdb.com/api_category.php`

const DATABASE_LINK = `http://localhost:3000/api/v1/games`

class Adapter {

  static getQuestions(category){
     return fetch(`${BASE_URL}${AMOUNT}&category=${category}&type=multiple`).then(resp => resp.json())
  }

  static getCategories() {
    return fetch(`${CATEGORY_API}`).then(resp => resp.json())
  }

  static postGametoDB(game){
    return fetch(DATABASE_LINK, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
     body: JSON.stringify(game)
      }).then(resp => resp.json()).then(console.log)
    }

  }
