class App {
  static init() {
    console.log("Hey There")

    //add event listeners
    fetch("http://localhost:3000/api/v1/questions")
      .then(response => response.json())
      .then(console.log)
  }

  //static handle listeners
}

document.addEventListener("DOMContentLoaded", App.init)
