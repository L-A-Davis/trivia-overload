const Question = ( () => {

let questionStore = []
let ZINDEX = 0
let questionId = 0
let XSTYLE = 1415 - 350//box width
let YSTYLE = 600 - 200//box width

return class Question {
  constructor ({question, correct_answer, incorrect_answers, incorrect_answers_1, incorrect_answers_2, incorrect_answers_3}){
    this.id = questionId++
    this.question = question
    this.correct_answer = correct_answer
    if (incorrect_answers) {
      this.incorrect_answers_1 = incorrect_answers[0]
      this.incorrect_answers_2 = incorrect_answers[1]
      this.incorrect_answers_3 = incorrect_answers[2]
    } else {
      this.incorrect_answers_1 = incorrect_answers_1
      this.incorrect_answers_2 = incorrect_answers_2
      this.incorrect_answers_3 = incorrect_answers_3
    }
    this.answers = [this.incorrect_answers_1, this.incorrect_answers_2, this.incorrect_answers_3, this.correct_answer]
    questionStore.push(this)
  }

  static shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }


  render() {
    let el = document.createElement("div")
    el.setAttribute("class", "question-box bounce-enter-active")
    el.setAttribute("z-index", ZINDEX++)
    el.setAttribute("data-id", this.id)
    let questionList = Question.shuffle(this.answers)
    let correctIndex = questionList.indexOf(this.correct_answer)
    el.setAttribute("data-correct", correctIndex)
    el.setAttribute("data-action", "answer")
    el.setAttribute("data-action", "answer")
    el.style.top = `${(Math.floor(Math.random() * YSTYLE))}px`
    el.style.left = `${(Math.floor(Math.random() * XSTYLE))}px`
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

  static resetZIndex() {
    ZINDEX = 0
  }

  static clearStore() {
    questionStore = []
  }

}
})()
