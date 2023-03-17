import { makeAutoObservable } from 'mobx'
import {
    InputTodo,
    type Actions,
    type State,
    type Todo,
    composeTodo,
} from '../utils'

class Store implements Actions, State {
    todos: Todo[] = []

    constructor() {
        makeAutoObservable(this)
    }

    add(todo: InputTodo): void {
        const newTodo = composeTodo(todo)
        this.todos = [...this.todos, newTodo]
    }

    remove(id: string): void {
        this.todos = this.todos.filter((todo) => todo.id !== id)
    }

    update(id: string, updatedTodo: InputTodo): void {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    ...updatedTodo,
                }
            }

            return todo
        })
    }
}

const store = new Store()

export default store
export type StoreType = InstanceType<typeof Store>
