class App {
  static init() {
    console.log("Hey There")

    let startButton = document.getElementById("start-game")
    startButton.addEventListener('click', function (){
      console.log("start")
    })

    Adapter.getQuestions().then(res => App.getAllQuestions(res.results))
  }

  static getAllQuestions(resp) {
     for (let value of resp){
       new Question(value)
       // console.log(value)
     }
   }

  //static handle listeners
}
