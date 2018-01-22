class App {
  static init() {
    console.log("Hey There")

    let startButton = document.getElementById("start-game")
    startButton.addEventListener('click', App.displayQuestions)

    App.selectCategory = document.getElementById('select-category')
    App.selectCategory.addEventListener('change', App.handleCategorySelection)

    Adapter.getCategories().then(res => App.getAllCategories(res.trivia_categories))


  }

static getAllCategories(resp) {
  for (let el of resp) {
    let newCat = new Category(el)
    let option = document.createElement("option")
    option.text = newCat.name
    option.value = newCat.id
    App.selectCategory.appendChild(option)
  }
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
    let i=0
    // let timer = setInterval(() =>
    //   document.getElementById("questions").appendChild(Question.store()[i++].render()),
    //   1000 * i)
    let delay = 4000

    let timer = setTimeout(function addQuestion() {
      document.getElementById("questions").appendChild(Question.store()[i].render())
      delay *= .9
      i += 1
      timer = setTimeout(addQuestion, delay)
    }, delay)
  }
}
