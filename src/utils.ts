import { z } from 'zod'

export type Todo = z.output<typeof todoSchema>

export const STATUS = {
    DONE: 'done',
    IN_PROGRESS: 'in progress',
    TO_DO: 'to do',
    HOLD: 'hold',
} as const

export type State = {
    todos: Todo[]
}

export type Actions = {
    add(todo: Todo): void
    update(id: Todo['id'], todo: Todo): void
    remove(id: Todo['id']): void
}

export const todoSchema = z.object({
    id: z.number(),
    name: z.string(),
    progress: z.number().min(0).max(100),
    status: z
        .literal(STATUS['DONE'])
        .or(z.literal(STATUS['HOLD']))
        .or(z.literal(STATUS['IN_PROGRESS']))
        .or(z.literal(STATUS['TO_DO'])),
    terminDate: z.date(),
    startDate: z.date(),
    completeDate: z.date().optional(),
})

export function generateUniqueTodoId(): number {
    const uniqueId = Date.now()

    return uniqueId
}
