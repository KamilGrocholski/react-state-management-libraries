import { proxy } from 'valtio'
import { Actions, State } from '../utils'

const store = proxy<State>({
    todos: [],
})

export const actions: Actions = {
    add(todo) {
        store.todos.push(todo)
    },
    remove(id) {
        store.todos = store.todos.filter((todo) => todo.id !== id)
    },
    update(id, updatedTodo) {
        store.todos = store.todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    ...updatedTodo,
                }
            }

            return todo
        })
    },
}

export default store
