import { zodResolver } from '@hookform/resolvers/zod'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { BsTrash } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'
import useScrollToBottom from '../hooks/useScrollToBottom'
import {
    STATUS,
    generateUniqueTodoId,
    todoSchema,
    type Actions,
    type State,
    type Todo,
} from '../utils'
import Modal from './Modal'

const Template: React.FC<{
    state: State
    actions: Actions
    name: string
    version: string
}> = ({ state, actions, name, version }) => {
    const [isAdding, setIsAdding] = useState(false)
    const [willBeAdded, setWillBeAdded] = useState(false)
    const todoListRef = useRef<HTMLDivElement | null>(null)
    const scrollToBottomOfTodoList = useScrollToBottom(todoListRef)

    useEffect(() => {
        if (willBeAdded) {
            scrollToBottomOfTodoList()
            setWillBeAdded(false)
        }
    }, [state.todos])

    return (
        <div className='template-container'>
            <h1>{name}</h1>
            <h2>{version}</h2>
            <Modal isOpen={isAdding} handleClose={() => setIsAdding(false)}>
                <CreateTodoForm
                    onValid={(validTodo, e) => {
                        e?.preventDefault()
                        setWillBeAdded(true)
                        actions.add(validTodo)
                        setIsAdding(false)
                    }}
                    onError={(invalidTodo, e) => {
                        e?.preventDefault()
                        console.log(invalidTodo)
                    }}
                />
            </Modal>
            <div className='todos-list'>
                <button
                    className='todo-add-btn'
                    onClick={() => setIsAdding(true)}
                >
                    Add
                </button>
                {state.todos.map((todo) => (
                    <TodoComponent
                        ref={todoListRef}
                        key={todo.id}
                        todo={todo}
                        update={actions.update}
                        remove={actions.remove}
                    />
                ))}
            </div>
        </div>
    )
}

type TodoComponentProps = {
    todo: Todo
    update: Actions['update']
    remove: Actions['remove']
}

const TodoComponent = forwardRef<HTMLDivElement, TodoComponentProps>(
    ({ todo, update, remove }, ref) => {
        const [isEditing, setIsEditing] = useState(false)

        return (
            <div className='todo-component-container' ref={ref}>
                <Modal
                    isOpen={isEditing}
                    handleClose={() => setIsEditing(false)}
                >
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
                <span className='todo-name'>{todo.name}</span>
                <span className='todo-progress'>{todo.progress}%</span>
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
                <span className='todo-start-date'>
                    {formatDate(todo.startDate)}
                </span>
                <div className='todo-actions-container'>
                    <button
                        className='btn-edit'
                        onClick={() => setIsEditing((prev) => !prev)}
                    >
                        <FaRegEdit />
                    </button>
                    <button
                        className='btn-remove'
                        onClick={() => remove(todo.id)}
                    >
                        <BsTrash />
                    </button>
                </div>
            </div>
        )
    }
)

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
            <div className='form-field'>
                <label htmlFor={'name'}>Name</label>
                <input id='name' {...register('name')} type='text' />
                <p>{errors.name?.message}</p>
            </div>

            <div className='form-field'>
                <label htmlFor={'progress'}>Progress</label>
                <input
                    id='progress'
                    {...register('progress', { valueAsNumber: true })}
                    type='number'
                />
                <p>{errors.progress?.message}</p>
            </div>

            <div className='form-field'>
                <label htmlFor={'startDate'}>Start date</label>
                <input
                    id='startDate'
                    {...register('startDate', { valueAsDate: true })}
                    type='datetime-local'
                />
                <p>{errors.startDate?.message}</p>
            </div>

            <div className='form-field'>
                <label htmlFor={'status'}>Status</label>
                <select id='status' {...register('status')}>
                    {Object.values(STATUS).map((status) => (
                        <option key={status}>{status}</option>
                    ))}
                </select>
                <p>{errors.status?.message}</p>
            </div>

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
            progress: 0,
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
            <div className='form-field'>
                <label htmlFor={'name'}>Name</label>
                <input id='name' {...register('name')} type='text' />
                <p>{errors.name?.message}</p>
            </div>

            <div className='form-field'>
                <label htmlFor={'progress'}>Progress</label>
                <input
                    id='progress'
                    {...register('progress', { valueAsNumber: true })}
                    type='number'
                />
                <p>{errors.progress?.message}</p>
            </div>

            <div className='form-field'>
                <label htmlFor={'startDate'}>Start date</label>
                <input
                    id='startDate'
                    {...register('startDate', { valueAsDate: true })}
                    type='datetime-local'
                />
                <p>{errors.startDate?.message}</p>
            </div>

            <div className='form-field'>
                <label htmlFor={'status'}>Status</label>
                <select id='status' {...register('status')}>
                    {Object.values(STATUS).map((status) => (
                        <option key={status}>{status}</option>
                    ))}
                </select>
                <p>{errors.status?.message}</p>
            </div>

            <button onClick={handleReset}>Add</button>
        </form>
    )
}

function formatDate(date?: Date): string {
    if (date === undefined) {
        return '---'
    }
    const dateObject = new Date(date)

    return dateObject.toLocaleString()
}

export default Template
