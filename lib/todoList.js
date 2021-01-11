const Todo = require("./todo");

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if(todo instanceof Todo) {
      this.todos.push(todo);
    }else {
      throw new TypeError ('Can only add todo objects');
    }
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  _validateIndex(index) {
    if(!(index in this.todos)) {
      throw new ReferenceError(`Invalid index : ${index}`);
    }
  }

  itemAt(index) {
   this._validateIndex(index);
   return this.todos[index];
  }

  markDoneAt(index) {
   this.itemAt(index).markDone();
  }

   markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(item => item.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1)[0];

  }

  toString() {
    let title = `---${this.title}---`;
    let list = this.todos.map(item => item.toString()).join('\n');
    return `${title}\n${list}`;
  }

  forEach(callback){
    for(let index = 0; index < this.size(); index++) {
      callback(this.todos[index]);
    }
  }

  filter(callback) {
    let newObject = new TodoList(this.title);
    for(let index = 0; index < this.size(); index++) {
      if(callback(this.todos[index])) {
       newObject.add(this.todos[index]);
      }
    }
    return newObject;
  }

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !(todo.isDone()));
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if(todo) {
      todo.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
   return this.todos.slice();
  }
}

module.exports = TodoList;