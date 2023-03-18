import { useState } from 'react'
import {
    type State,
    type Actions,
    type Todo,
    STATUS,
    todoSchema,
    generateUniqueTodoId,
} from '../utils'
import Modal from './Modal'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
                onValid={(validTodo, e) => {
                    e?.preventDefault()
                    actions.add(validTodo)
                }}
                onError={(invalidTodo, e) => {
                    e?.preventDefault()
                    console.log(invalidTodo)
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
                    onValid={(validTodo, e) => {
                        e?.preventDefault()
                        update(validTodo.id, validTodo)
                        setIsEditing(false)
                    }}
                    onError={(invalidTodo, e) => {
                        e?.preventDefault()
                        console.log(invalidTodo)
                    }}
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
    onValid: SubmitHandler<Todo>
    onError: SubmitErrorHandler<Todo>
    initialState: Todo
}> = ({ onValid, onError, initialState }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<Todo>({
        defaultValues: {
            ...initialState,
        },
        resolver: zodResolver(todoSchema),
    })

    return (
        <form onSubmit={handleSubmit(onValid, onError)}>
            <label htmlFor={'name'}>Name</label>
            <input id='name' {...register('name')} type='text' />
            <p>{errors.name?.message}</p>

            <label htmlFor={'progress'}>Progress</label>
            <input
                id='progress'
                {...register('progress', { valueAsNumber: true })}
                type='number'
            />
            <p>{errors.progress?.message}</p>

            <label htmlFor={'startDate'}>Start date</label>
            <input
                id='startDate'
                {...register('startDate', { valueAsDate: true })}
                type='datetime-local'
            />
            <p>{errors.startDate?.message}</p>

            <label htmlFor={'status'}>Status</label>
            <select id='status' {...register('status')}>
                {Object.values(STATUS).map((status) => (
                    <option key={status}>{status}</option>
                ))}
            </select>
            <p>{errors.status?.message}</p>

            <label htmlFor={'terminDate'}>Termin date</label>
            <input
                id='terminDate'
                {...register('terminDate', { valueAsDate: true })}
                type='datetime-local'
            />
            <p>{errors.terminDate?.message}</p>

            <button>Update</button>
        </form>
    )
}

const CreateTodoForm: React.FC<{
    onValid: SubmitHandler<Todo>
    onError: SubmitErrorHandler<Todo>
    initialState?: Todo
}> = ({ onValid, onError, initialState }) => {
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<Todo>({
        defaultValues: {
            ...initialState,
            id: generateUniqueTodoId(),
        },
        resolver: zodResolver(todoSchema),
    })

    function handleReset() {
        reset({
            id: generateUniqueTodoId(),
            ...initialState,
        })
    }

    return (
        <form onSubmit={handleSubmit(onValid, onError)}>
            <label htmlFor={'name'}>Name</label>
            <input id='name' {...register('name')} type='text' />
            <p>{errors.name?.message}</p>

            <label htmlFor={'progress'}>Progress</label>
            <input
                id='progress'
                {...register('progress', { valueAsNumber: true })}
                type='number'
            />
            <p>{errors.progress?.message}</p>

            <label htmlFor={'startDate'}>Start date</label>
            <input
                id='startDate'
                {...register('startDate', { valueAsDate: true })}
                type='datetime-local'
            />
            <p>{errors.progress?.message}</p>

            <label htmlFor={'status'}>Status</label>
            <select id='status' {...register('status')}>
                {Object.values(STATUS).map((status) => (
                    <option key={status}>{status}</option>
                ))}
            </select>
            <p>{errors.status?.message}</p>

            <label htmlFor={'terminDate'}>Termin date</label>
            <input
                id='terminDate'
                {...register('terminDate', { valueAsDate: true })}
                type='datetime-local'
            />
            <p>{errors.terminDate?.message}</p>

            <button onClick={handleReset}>Add</button>
        </form>
    )
}

function formatDate(date: number | Date | string): string {
    const dateObject = new Date(date)

    return dateObject.toLocaleString()
}

export default Template
