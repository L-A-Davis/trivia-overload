class App {
  static init() {
    console.log("Hey There")

    let startButton = document.getElementById("start-game")
    startButton.addEventListener('click', App.displayQuestions)

    App.selectCategory = document.getElementById('select-category')
    App.selectCategory.addEventListener('change', App.handleCategorySelection)

    App.questionsDiv = document.getElementById('questions')
    App.questionsDiv.addEventListener('click', App.handleAnswerSelection)

    Adapter.getCategories().then(res => App.getAllCategories(res.trivia_categories))
    Adapter.getUsers().then(res => App.displayAllUsers(res))

    App.gameInfo = document.getElementById("game-data")
    App.introFields = document.getElementById("intro-fields")

    App.wrongArray = []
    App.correctArray = []

    App.selectUser = document.getElementById('select-user')
    App.selectUser.addEventListener('change', App.handleUserSelection)

    App.newUserForm = document.getElementById("add_user_form")
    App.newUserForm.addEventListener("submit", App.newUser)

  }

static getAllCategories(resp) {
  const excludedCategories = [13,16,19,20,24,25,26,27,29,30]
  for (let el of resp) {
    if (!excludedCategories.includes(el.id)) {
      App.addOneCategory(el)
    }
  }
}

static addOneCategory(el) {
  let newCat = new Category(el)
  let option = document.createElement("option")
  option.text = newCat.name
  option.value = newCat.id
  App.selectCategory.appendChild(option)
}

static displayAllUsers(resp) {
  for (let el of resp)  {
       App.displayAUser(el)
    }
}

static displayAUser(el) {
  if (el.id) {
    let newUser = new User(el)
    let option = document.createElement("option")
    option.text = newUser.name
    option.value = newUser.id
    App.selectUser.appendChild(option)
    return el
  }
}


static handleCategorySelection(event) {
  let category = parseInt(event.target.value)
  Question.clearStore()
  if (category === 1) {
    App.getAllQuestions(App.redoQuestions)
  } else {
    Adapter.getQuestions(category).then(res => App.getAllQuestions(res.results))
  }
  App.category = category
}

static handleUserSelection(event) {
  let user = parseInt(event.target.value)
  App.user = user
  App.userQuestions = []
  if ($("#select-category option[value='1']")) {
    $("#select-category option[value='1']").remove()
    Question.clearStore()
    $("#select-category").val($("#select-category option:first").val());
  }
  Adapter.getQuestionsFromDB().then(res => res.filter(function(item) {
    return item.user_id === App.user
  })).then(res => App.makeQuestionArray(res)).then(App.findHighScore())
}

static makeQuestionArray(array) {
    let correctCount = 0
    App.redoQuestions = []
    for (let el of array) {
      App.userQuestions.push(el)
      if (el.correct) {
         correctCount += 1
      } else {
        App.redoQuestions.push(el)
      }
    }

    if (App.redoQuestions.length > 20) {
      App.addOneCategory({name: "Redo Questions", id: 1})
    }

    let correctPercentage = Math.round(correctCount/App.userQuestions.length * 100) * 100 / 100
    if (correctPercentage) {
    let percentageDiv = document.getElementById("percentageDiv")
        percentageDiv.innerHTML = `<p>Correct Percentage: ${correctPercentage}%</p>`
    }  else {
      let percentageDiv = document.getElementById("percentageDiv")
      percentageDiv.innerHTML = `<p> Play More Games! </p>`
    }
}

  static findHighScore() {
    Adapter.getGames().then(res => res.filter(function(item) {
      return item.user_id === App.user
    })).then(res => App.displayHighScore(res))
  }

  static displayHighScore(arr) {
    let highScore = arr.reduce((max, p) => p.correct_questions > max ? p.correct_questions : max, arr[0].correct_questions)
    let highScoreDiv = document.getElementById("high-score-div")
    if (highScore) {
      highScoreDiv.innerHTML = `<p>High Score: ${highScore}</p>`
    } else {
      highScoreDiv.innerHTML = `<p>No high score!</p>`
    }

  }



static newUser(event){
  event.preventDefault()
  let newUserInfo = {}
  let input =  document.getElementById("user_input")
  let value = input.value
  newUserInfo.name = value
  if (value) {
    Adapter.postUserToDB(newUserInfo).then(resp => App.displayAUser(resp))
    .then(resp => App.setUserInfo(resp))
    input.value = ""
  }
}

  static setUserInfo(info) {
    if (info) {
      App.selectUser.value = info.id
      App.user = parseInt(info.id)
    } else {
      alert("Name Taken")
    }
  }


  static getAllQuestions(resp) {
    // Question.clearStore()
    for (let value of resp){
       new Question(value)
    }
   }

  static displayQuestions() {
    if (App.user && App.category) {
      App.currentScore = 0
      App.wrongAnswers = 3
      App.questionsDiv.innerHTML = ""
      App.gameInfo.style.display = "block"
      App.introFields.style.display = "none"

      document.getElementById("score").innerHTML = App.currentScore
      document.getElementById("wrong-answers").innerHTML = App.wrongAnswers

      let i=0
      let delay = 1000

      let timer = setTimeout(function addQuestion() {
        document.getElementById("questions").appendChild(Question.store()[i].render())
        delay *= 1
        i += 1
        if (i < Question.store().length && App.wrongAnswers > 0) {
          timer = setTimeout(addQuestion, delay)
        } else {
          App.endGame()
        }
      }, delay)
    }
  }

  static handleAnswerSelection() {
    // checks if grandparent node has correct data-action –
    // works for <li>s because they have p-node of <ul> and g-p-node of <div>
    // doesn't work for h2 currently because <div> is parent
    let pnode = event.target.parentNode.parentNode

    if (pnode.dataset.action === "answer") {
      if (event.target.dataset.id === pnode.dataset.correct) {
        console.log("Correct!", pnode)
        pnode.remove()
        App.currentScore += 1
        document.getElementById("score").innerHTML = App.currentScore
        App.correctArray.push(Question.store().find(question => question.id == pnode.dataset.id))
      } else {
        console.log("Wrong!", pnode)
        pnode.dataset.action = "wrong"
        pnode.className = "question-box wrong"
        App.wrongAnswers -= 1
        document.getElementById("wrong-answers").innerHTML = App.wrongAnswers
        App.wrongArray.push(Question.store().find(question => question.id == pnode.dataset.id))
      }
    }
  }

  static endGame() {
    Question.resetZIndex()
    let el = document.createElement("div")
    el.className = "game-over"
    let elTwo = document.createElement("div")
    elTwo.id = "game-over-text"
    if (App.currentScore < 50) {
      elTwo.innerHTML = `<h1>Game Over!</h1><hr><p>Your score was: ${App.currentScore}</p>`
    } else {
      elTwo.innerHTML = `<h1>Trivia Legend!</h1><hr><p>You got every question right!</p>`
    }
    el.append(elTwo)
    App.questionsDiv.append(el)
    let qBoxes = document.getElementsByClassName('question-box')
    for(const el of qBoxes) {
      el.dataset.action = "complete"
    }
    App.collectStatistics()
    App.introFields.style.display = "block"
    App.gameInfo.style.display = "none"
  }

  static collectStatistics() {
     let gameStats = {}
     gameStats.correct_questions = App.currentScore
     gameStats.user_id = App.user
     Adapter.postGameToDB(gameStats).then(App.postArray(App.wrongArray, false)).then(App.postArray(App.correctArray, true))

   }



   static postArray(arr, correct) {
     let usedQuestions = App.userQuestions.map(function (e) {return e.question})
     for(const q of arr) {
       if (usedQuestions.indexOf(q.question) === -1) {
       Adapter.postQuestionToDB({user_id: App.user, correct: correct, ...q})
     }
       else {
         let existingID = App.userQuestions.find(function (item) {return item.question === q.question}).id

      Adapter.patchToDB(existingID, correct)
       }
   }
  }

}
