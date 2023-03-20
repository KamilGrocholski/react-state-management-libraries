import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'
import { State, Todo } from '../utils'

const todosSlice = createSlice({
    name: 'todos',
    initialState: { todos: [] } as State,
    reducers: {
        add(state, action: PayloadAction<Todo>) {
            state.todos.push(action.payload)
        },
        remove(state, action: PayloadAction<Todo['id']>) {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload
            )
        },
        update(
            state,
            action: PayloadAction<{ id: Todo['id']; updatedTodo: Todo }>
        ) {
            state.todos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        ...action.payload.updatedTodo,
                    }
                }

                return todo
            })
        },
    },
})

export const store = configureStore({
    reducer: {
        todos: todosSlice.reducer,
    },
})

export const { add, remove, update } = todosSlice.actions
export default todosSlice.reducer
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
