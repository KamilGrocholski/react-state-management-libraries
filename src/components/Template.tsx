import { useReducer, useState } from 'react'
import { State, Actions, Todo, InputTodo, STATUS } from '../utils'
import Modal from './Modal'

type InputTodoErrorState = { [key in keyof InputTodo]?: string }
type TodoErrorState = { [key in keyof Todo]?: string }

const Template: React.FC<{
    state: State
    actions: Actions
    name: string
    version: string
}> = ({ state, actions, name, version }) => {
    return (
        <div className='template-container'>
            <h1>{name}</h1>
            <h2>{version}</h2>

            <CreateTodoForm
                onValid={(todo) => actions.add(todo)}
                onError={console.log}
                initialState={{
                    name: 'Name',
                    progress: 0,
                    status: 'in progress',
                }}
            />
            {state.todos.map((todo) => (
                <TodoComponent
                    key={todo.id}
                    todo={todo}
                    update={actions.update}
                    remove={actions.remove}
                />
            ))}
        </div>
    )
}

const TodoComponent: React.FC<{
    todo: Todo
    update: Actions['update']
    remove: Actions['remove']
}> = ({ todo, update, remove }) => {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className='todo-component-container'>
            <Modal isOpen={isEditing} handleClose={() => setIsEditing(false)}>
                <UpdateTodoForm
                    onValid={(validTodo) => update(validTodo.id, validTodo)}
                    onError={console.log}
                    initialState={{ ...todo }}
                />
            </Modal>
            <span>{todo.name}</span>
            <span>{todo.progress}</span>
            <span
                className={`todo-status ${
                    todo.status === 'done'
                        ? 'todo-status-done'
                        : todo.status === 'hold'
                        ? 'todo-status-hold'
                        : todo.status === 'in progress'
                        ? 'todo-status-inprogress'
                        : 'todo-status-todo'
                }`}
            >
                {todo.status}
            </span>
            <span>{formatDate(todo.startDate)}</span>
            <span>{formatDate(todo.terminDate ?? '')}</span>
            <span>{formatDate(todo.completeDate ?? '')}</span>
            <button onClick={() => setIsEditing((prev) => !prev)}>Edit</button>
            <button onClick={() => remove(todo.id)}>Remove</button>
        </div>
    )
}

const UpdateTodoForm: React.FC<{
    onValid(todo: Todo): void
    onError(todo: Partial<Todo>): void
    initialState: Todo
}> = ({ onValid, onError, initialState }) => {
    const [todo, setTodo] = useReducer<
        (prev: Todo, update: Partial<Todo>) => Todo
    >((prev, update) => ({ ...prev, ...update }), initialState)

    const [errorState, setErrorState] = useReducer<
        (
            prev: TodoErrorState,
            update: Partial<TodoErrorState>
        ) => TodoErrorState
    >((prev, update) => ({ ...prev, ...update }), {})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        setErrorState(validateInputTodo(todo))

        if (Object.keys(errorState).length === 0) {
            onValid(todo)
            return
        }

        onError(todo)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={'name'}></label>
            <input
                id='name'
                value={todo.name ?? ''}
                onChange={(e) => setTodo({ name: e.target.value })}
            />
            <p>{errorState.name}</p>

            <label htmlFor={'status'}></label>
            <select
                id='status'
                value={todo.status}
                onChange={(e) =>
                    setTodo({ status: e.target.value as Todo['status'] })
                }
            >
                {Object.entries(STATUS).map(([key, value]) => (
                    <option>{value}</option>
                ))}
            </select>
            <p>{errorState.status}</p>

            <button>Add</button>
        </form>
    )
}

const CreateTodoForm: React.FC<{
    onValid(todo: InputTodo): void
    onError(todo: Partial<InputTodo>): void
    initialState: InputTodo
}> = ({ onValid, onError, initialState }) => {
    const [todo, setTodo] = useReducer<
        (prev: InputTodo, update: Partial<InputTodo>) => InputTodo
    >((prev, update) => ({ ...prev, ...update }), initialState)

    const [errorState, setErrorState] = useReducer<
        (
            prev: InputTodoErrorState,
            update: Partial<InputTodoErrorState>
        ) => InputTodoErrorState
    >((prev, update) => ({ ...prev, ...update }), {})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        setErrorState(validateTodo(todo))

        if (Object.keys(errorState).length === 0) {
            onValid(todo)
            return
        }

        onError(todo)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={'name'}></label>
            <input
                id='name'
                value={todo.name ?? ''}
                onChange={(e) => setTodo({ name: e.target.value })}
            />
            <p>{errorState.name}</p>

            <button>Add</button>
        </form>
    )
}

function validateInputTodo(todo: Partial<InputTodo>): InputTodoErrorState {
    return {}
}

function validateTodo(todo: Partial<Todo>): TodoErrorState {
    return {}
}

function formatDate(date: number | Date | string): string {
    const dateObject = new Date(date)

    return dateObject.toLocaleString()
}

export default Template
