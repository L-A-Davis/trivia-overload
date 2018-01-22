const Question = ( () => {

const questionStore = []

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
    let questionList = this.shuffle(this.answers)
    let correctIndex = questionList.indexOf(this.correctAnswer)
    el.setAttribute("data-correct", correctIndex)
    el.innerHTML = `<h2>${this.question} </h2> <ul>
          <li data-id="0" data-action="answer">${questionList[0]}</li>
          <li data-id="1" data-action="answer">${questionList[1]}</li>
          <li data-id="2" data-action="answer">${questionList[2]}</li>
          <li data-id="3" data-action="answer">${questionList[3]}</li>
        </ul>`
    return el
  }

  static store() {
    return questionStore
  }

}
})()
