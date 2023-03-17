export const STATUS = {
    DONE: 'done',
    IN_PROGRESS: 'in progress',
    TO_DO: 'to do',
    HOLD: 'hold',
} as const

export type Todo = {
    id: string
    status: typeof STATUS[keyof typeof STATUS]
    name: string
    progress: number
    startDate: number
    completeDate?: number
    terminDate?: number
}

export type InputTodo = Pick<
    Todo,
    'status' | 'progress' | 'terminDate' | 'name'
>

export type State = {
    todos: Todo[]
}

export type Actions = {
    add(todo: InputTodo): void
    update(id: Todo['id'], updatedTodo: InputTodo): void
    remove(id: Todo['id']): void
}

export const composeTodo = (inputTodo: InputTodo): Todo => {
    const createdAt = Date.now()

    return {
        ...inputTodo,
        startDate: createdAt,
        id: createdAt.toString(),
    }
}
