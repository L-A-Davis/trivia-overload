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


  }

static getAllCategories(resp) {
  const excludedCategories = [13,16,19,20,24,25,26,29,30]
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
     for (let value of resp){
       new Question(value)
     }
   }

  static displayQuestions() {
    App.currentScore = 0
    App.wrongAnswers = 3

    document.getElementById("score").innerHTML = App.currentScore
    document.getElementById("wrong-answers").innerHTML = App.wrongAnswers

    let i=0
    let delay = 1000

    let timer = setTimeout(function addQuestion() {
      document.getElementById("questions").appendChild(Question.store()[i].render())
      delay *= .9
      i += 1
      if (i < Question.store().length) {
        timer = setTimeout(addQuestion, delay)
      }
    }, delay)
  }

  static handleAnswerSelection() {
    // checks if grandparent node has correct data-action –
    // works for <li>s because they have p-node of <ul> and g-p-node of <div>
    // doesn't work for h2 currently because <div> is parent
    if (event.target.parentNode.parentNode.dataset.action === "answer") {
      if (event.target.dataset.id === event.target.parentNode.parentNode.dataset.correct) {
        console.log("Correct!")
        event.target.parentNode.parentNode.remove()
        App.currentScore += 1
        document.getElementById("score").innerHTML = App.currentScore
      } else {
        console.log("Wrong!")
        event.target.parentNode.parentNode.dataset.action = "wrong"
        App.wrongAnswers -= 1
        document.getElementById("wrong-answers").innerHTML = App.wrongAnswers
      }
    }
  }
}
