const Question = ( () => {

const questionStore = []
let ZINDEX = 0

return class Question {
  constructor ({question, correct_answer, incorrect_answers}){
    this.question = question
    this.correctAnswer = correct_answer
    this.incorrectAnswers = incorrect_answers
    this.answers = [...incorrect_answers, correct_answer]
    questionStore.push(this)
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }


  render() {
    let el = document.createElement("div")
    el.setAttribute("class", "question-box")
    el.setAttribute("z-index", ZINDEX++)

    //
    let questionList = this.shuffle(this.answers)
    let correctIndex = questionList.indexOf(this.correctAnswer)
    el.setAttribute("data-correct", correctIndex)
    el.setAttribute("data-action", "answer")
    el.setAttribute("data-action", "answer")
    el.style.top = `${(Math.floor(Math.random() * 500))}px`
    el.style.left = `${(Math.floor(Math.random() * 1215))}px`
    el.innerHTML = `<h2>${this.question} </h2> <ul>
          <li data-id="0">${questionList[0]}</li>
          <li data-id="1">${questionList[1]}</li>
          <li data-id="2">${questionList[2]}</li>
          <li data-id="3">${questionList[3]}</li>
        </ul>`
    return el
  }

  static store() {
    return questionStore
  }

}
})()
