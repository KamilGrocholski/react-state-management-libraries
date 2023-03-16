import { proxy } from 'valtio'
import { Actions, State, composeTodo } from '../utils'

const store = proxy<State>({
    todos: [],
})

export const actions: Actions = {
    add(todo) {
        const newTodo = composeTodo(todo)
        store.todos.push(newTodo)
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
