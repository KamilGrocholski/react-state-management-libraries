import { useReducer, useState } from 'react'
import type { State, Actions, Todo, InputTodo } from '../utils'

type TodoErrorState = { [key in keyof InputTodo]?: string }

const Template: React.FC<{
    state: State
    actions: Actions
    name: string
    version: string
}> = ({ state, actions, name, version }) => {
    return (
        <div>
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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
            }}
        >
            <span>{todo.name}</span>
            <span>{todo.progress}</span>
            <span>{todo.status}</span>
            <span>{todo.startDate.toString()}</span>
            <span>{todo.terminDate?.toString()}</span>
            <span>{todo.completeDate?.toString()}</span>
            <button onClick={() => remove(todo.id)}>Remove</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
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
            prev: TodoErrorState,
            update: Partial<TodoErrorState>
        ) => TodoErrorState
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

function validateTodo(todo: Partial<InputTodo>): TodoErrorState {
    return {}
}

export default Template
