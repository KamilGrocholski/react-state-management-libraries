import { makeAutoObservable } from 'mobx'
import { type Actions, type State, type Todo } from '../utils'

class Store implements Actions, State {
    todos: Todo[] = []

    constructor() {
        makeAutoObservable(this)
    }

    add(todo: Todo): void {
        this.todos = [...this.todos, todo]
    }

    remove(id: Todo['id']): void {
        this.todos = this.todos.filter((todo) => todo.id !== id)
    }

    update(id: Todo['id'], updatedTodo: Todo): void {
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
