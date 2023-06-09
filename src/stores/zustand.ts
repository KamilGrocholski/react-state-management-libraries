import { create } from 'zustand'
import { type Actions, type State } from '../utils'

const store = create<State & Actions>((set) => ({
    todos: [],

    add(todo) {
        set((state) => ({
            ...state,
            todos: [...state.todos, todo],
        }))
    },
    update(id, updatedTodo) {
        set((state) => ({
            ...state,
            todos: state.todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, ...updatedTodo }
                }

                return todo
            }),
        }))
    },
    remove(id) {
        set((state) => ({
            ...state,
            todos: state.todos.filter((todo) => todo.id !== id),
        }))
    },
}))

export default store
