const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here
  test('list has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('todo has been added', () => {
    expect(() => list.add({})).toThrow(TypeError);
  });

  test('a new todos list', () => {
    expect(list.toArray()).toEqual(list.todos);
  });

  test('get first todo in todos list', () => {
    expect(list.first()).toEqual(list.todos[0]);
  });

  test('get last todo in todos list', () => {
    expect(list.last()).toEqual(list.todos[list.todos.length - 1]);
  });

  test('removes and returns the first item in the todos list', () => {
    let todo = list.shift();
    expect(todo).toBe(todo1);
    expect(list.toArray()).toEqual(list.todos);
  });

  test('removes and returns the last todo in a todos list', () => {
    let todo = list.pop();
    expect(todo).toBe(todo3);
    expect(list.toArray()).toEqual(list.todos);
  });

  test("returns true when all todos in the list are done", () => {
    expect(list.isDone()).not.toBeTruthy();
  });

  test("returns a reference error if index has no todo", () => {
    expect(() => list.itemAt(100)).toThrow(ReferenceError);
    expect(list.itemAt(0)).toEqual(todo1);
  });

  test("raise a referencer error if index has no element or element is marked done", () => {
    expect(() => list.markDoneAt(100)).toThrow(ReferenceError);
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
  });

  test("maise a reference error if index has no todo or todo is marked undone", () => {
    expect(() => list.markUndoneAt(100)).toThrow(ReferenceError);

    list.markUndoneAt(0);
    expect(!todo1.isDone()).toBe(true);
  })

  test('marks all todos done', () => {
    list.markAllDone();
    // console.log(list.toArray().every(todo => todo.done));
    expect(list.toArray().every(todo => todo.done)).toBeTruthy();
  });

  test('removes todo at index or raises an error if index does not have item', () => {
    expect(() => list.removeAt(100)).toThrow(ReferenceError);
    list.removeAt(0);
    expect(list.toArray()).toEqual(list.todos);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('toString returns string of the list with all todo marked', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(string);
  });
  
  test("forEach iterates through todos", () => {
    let array = []
    list.forEach((todo) => array.push(todo));
    expect(array).toEqual(list.toArray());
  });

  test("filters for done todos", () => {
    let doneToDos = list.filter((todo) => todo.isDone()).toArray();
    expect(doneToDos).toEqual([]);
  })
});

