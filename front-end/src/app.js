class App {
  static init() {
    console.log("Hey There")

    let startButton = document.getElementById("start-game")
    startButton.addEventListener('click', App.displayQuestions)

    Adapter.getQuestions().then(res => App.getAllQuestions(res.results))
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
