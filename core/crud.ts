import fs from "fs"; //ES6
import { v4 as uuid } from "uuid";

//const fs = require("fs"); --> JS vanilla
const DB_FILE_PATH = "./core/db";
interface Todo {
  content: string;
  date: string;
  done: boolean;
}

function create(content: string) {
  const todo: Todo = {
    content: content,
    date: new Date().toISOString(),
    done: false,
  };

  const todos: Todo[] = [...read(), todo];

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));

  //return content;
}

function read(): Todo[] {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");

  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    return [];
  }

  return db.todos;
}

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

//SIMULATION
clearDB();
create("Primeira Todo");
create("Segunda Todo");
console.log(read());
