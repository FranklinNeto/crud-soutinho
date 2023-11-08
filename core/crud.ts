import fs from "fs"; //ES6
import { v4 as uuid } from "uuid";

//const fs = require("fs"); --> JS vanilla
const DB_FILE_PATH = "./core/db";
interface Todo {
  id: string;
  content: string;
  date: string;
  done: boolean;
}

function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    content: content,
    date: new Date().toISOString(),
    done: false,
  };

  const todos: Todo[] = [...read(), todo];

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
  //return content;

  return todo;
}

function read(): Todo[] {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");

  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    return [];
  }

  return db.todos;
}

function update(id: string, partialTodo: Partial<Todo>):Todo {
  let updatedTodo; // armazena o objeto com o id passado atualizado

  const todos = read(); // armazena o DB

  todos.forEach((currentTodo) => { //percorre o DB a procura do objeto com o id igual ao id passada
    const isToUpdate = currentTodo.id === id; //salva o boolean
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo); //método para atualizar um objeto
    }
  });

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));

  if(!updatedTodo){
    throw new Error ("ID not found!")
  }
  return updatedTodo
}

function deleteById(id:string){
  const todos = read()
  
  // filtra os objetos que possuem o id diferente do id passado, isto é, retira o objeto com o id igual ao id passado
  const todosWithoutOne = todos.filter(todo => todo.id !== id) 

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos: todosWithoutOne }, null, 2));

  
}

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

//SIMULATION
clearDB();
create("Primeira Todo");
create("Segunda Todo");

console.log(read());
