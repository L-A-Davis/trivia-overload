const User = ( () => {

const userStore = []

return class User {
  constructor ({id, name}){
    this.id = id
    this.name = name
    userStore.push(this)
  }

 // not in use currently
  static store() {
    return userStore
  }

}
})()
