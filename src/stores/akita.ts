import { Query, Store, StoreConfig } from '@datorama/akita'
import { type Todo, type Actions, type State } from '../utils'
import { useObservableState } from 'observable-hooks'

export function createInitialState(): State {
    return {
        todos: [],
    }
}

export class TodosStore extends Store<State> {
    constructor() {
        super(createInitialState())
    }
}

export class TodosService implements Actions {
    constructor(private todosStore: TodosStore) {}

    add(todo: Todo): void {
        this.todosStore.update((state) => ({
            todos: [...state.todos, todo],
        }))
    }

    remove(id: Todo['id']): void {
        this.todosStore.update((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        }))
    }

    update(id: Todo['id'], updatedTodo: Todo): void {
        this.todosStore.update((state) => ({
            todos: state.todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, ...updatedTodo }
                }

                return todo
            }),
        }))
    }
}

export class TodosQuery extends Query<State> {
    todos$ = this.select((state) => state.todos)

    constructor(protected store: TodosStore) {
        super(store)
    }
}

const todosStore = new TodosStore()
const todosQuery = new TodosQuery(todosStore)

export const todosService = new TodosService(todosStore)
export const useTodos = () => useObservableState(todosQuery.todos$, [])
