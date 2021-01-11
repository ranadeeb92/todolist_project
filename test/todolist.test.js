const { DONE_MARKER } = require('../lib/todo');
const Todo = require('../lib/todo');
const Todolist = require('../lib/todoList');

describe('ToDoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('clean room');
    todo3 = new Todo('Go to the gym');

    list = new Todolist("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });
  
  // size
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });
  // toArray
  test('calling toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });
  //first
  test('calling first returns the first todo in the list', () => {
    expect(list.first()).toEqual(todo1);
  });
   //last
   test('calling last returns the last todo in the list', () => {
    expect(list.last()).toEqual(todo3);
  });
  //shift
  test('calling shift removes the first todo item and returns it', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });
  //pop
  test('calling pop removes the last todo item and returns it', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });
  //isDone
  test("calling isDone returns true if all list's items are DONE_MARKER, otherwise returns false", () => {
    let done = list.isDone();
    if(done){
      expect(done).toBe(true);
    }else{
      expect(done).toBe(false);
    }
  });
  //add
  test('calling add rais a TypeError if we try to add none Todo object to the list', () => {
    let todo4 = "go for a walk";
    let todo5 = 5;
    let list2 = new Todolist('my second todolist');
    expect(() => {list.add(todo4)}).toThrow(TypeError);
    expect(() => {list.add(todo5)}).toThrow(TypeError);
    expect(() => {list.add(list2)}).toThrow(TypeError);
  });

  //itemAt
  test("itemAt returns item at specific index", () => {
    expect(() => {list.itemAt(7)}).toThrow(ReferenceError);
    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(2)).toEqual(todo3);
  });
  //markDoneAt
  test('markDoneAt marks item at specific index as done', () => {

    expect(() => {list.markDoneAt(5)}).toThrow(ReferenceError);
    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });
  //markUndoneAt
  test("markUndoneAt marks item of specific index as undone", () => {
    expect(() => {list.markUndoneAt(6)}).toThrow(ReferenceError);
    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);
    list.markUndoneAt(2);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });
  // markAllDone
  test('markAllDone marks all list item as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  //removeAt
  test("removeAt remove an item spicified with index and returns it", () => {
    expect(() => {list.removeAt(5)}).toThrow(ReferenceError);
    expect(list.removeAt(1)).toEqual(todo2);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });
  //toString
  
});

