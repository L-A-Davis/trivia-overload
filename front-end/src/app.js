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

    App.wrongArray = []
    App.correctArray = []


  }

static getAllCategories(resp) {
  const excludedCategories = [13,16,19,20,24,25,26,27,29,30]
  for (let el of resp) {
    if (!excludedCategories.includes(el.id)) {
      let newCat = new Category(el)
      let option = document.createElement("option")
      option.text = newCat.name
      option.value = newCat.id
      App.selectCategory.appendChild(option)
    }
  }
}

static excludeCategories() {

}

static handleCategorySelection(event) {
  let category = parseInt(event.target.value)
  Adapter.getQuestions(category).then(res => App.getAllQuestions(res.results))
}


  static getAllQuestions(resp) {
    Question.clearStore()
    for (let value of resp){
       new Question(value)
    }
   }

  static displayQuestions() {
    App.currentScore = 0
    App.wrongAnswers = 3
    App.questionsDiv.innerHTML = ""

    document.getElementById("score").innerHTML = App.currentScore
    document.getElementById("wrong-answers").innerHTML = App.wrongAnswers

    let i=0
    let delay = 1000

    let timer = setTimeout(function addQuestion() {
      document.getElementById("questions").appendChild(Question.store()[i].render())
      delay *= .95
      i += 1
      if (i < Question.store().length && App.wrongAnswers > 0) {
        timer = setTimeout(addQuestion, delay)
      } else {
        App.endGame()
      }
    }, delay)
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
        pnode.class = "wrong"
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
    el.innerHTML = `<h1>Game Over!</h1><p>Your score was: ${App.currentScore}</p>`
    App.questionsDiv.append(el)
    App.collectStatistics()
  }

  static collectStatistics() {
    //username, App.currentScore, App.correctArray, App.wrongArray
  }
}
