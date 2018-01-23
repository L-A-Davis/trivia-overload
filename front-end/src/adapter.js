const BASE_URL = `https://opentdb.com/api.php?`
const AMOUNT = `amount=50`
const CATEGORY = `category=11`
const DIFFICULTY = `difficulty=medium`
const CATEGORY_API = `https://opentdb.com/api_category.php`

const DATABASE_LINK = `http://localhost:3000/api/v1/games`
const QUESTIONS_LINK = `http://localhost:3000/api/v1/questions`
const USER_LINK = `http://localhost:3000/api/v1/users`

class Adapter {

  static getQuestions(category){
     return fetch(`${BASE_URL}${AMOUNT}&category=${category}&type=multiple`).then(resp => resp.json())
  }

  static getCategories() {
    return fetch(`${CATEGORY_API}`).then(resp => resp.json())
  }

  static postQuestionToDB(question) {
    return Adapter.postToDB(question, QUESTIONS_LINK)
  }

  static postGameToDB(game) {
    return Adapter.postToDB(game, DATABASE_LINK)
  }

  static getQuestionsFromDB() {
    return fetch(QUESTIONS_LINK).then(resp => resp.json())
  }

  static postUserToDB(user) {
    return Adapter.postToDB(user, USER_LINK)
  }

  static getUsers(){
     return fetch(USER_LINK).then(resp => resp.json())
  }


  static postToDB(data, link){
    return fetch(link, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
     body: JSON.stringify(data)
      }).then(resp => resp.json())
    }

    static patchToDB(id, correct){
      return fetch(`${QUESTIONS_LINK}/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
       body: JSON.stringify({correct: correct})
        }).then(resp => resp.json())
      }




  }
