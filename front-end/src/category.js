const Category = ( () => {

const categoryStore = []

return class Category {
  constructor ({id, name}){
    this.id = id
    this.name = name
    categoryStore.push(this)
  }

 // not in use currently
  static store() {
    return categoryStore
  }

}
})()
