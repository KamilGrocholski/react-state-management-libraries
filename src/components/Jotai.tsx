import Template from './Template'
import todosAtom from '../stores/jotai'
import { useAtom } from 'jotai'
import { composeTodo } from '../utils'

const Jotai = () => {
    const [todos, setTodos] = useAtom(todosAtom)

    return (
        <Template
            name='Jotai'
            version='2'
            state={{
                todos,
            }}
            actions={{
                add(todo) {
                    const newTodo = composeTodo(todo)
                    setTodos([...todos, newTodo])
                },
                remove(id) {
                    const newTodos = todos.filter((todo) => todo.id !== id)
                    setTodos(newTodos)
                },
                update(id, updatedTodo) {
                    const newTodos = todos.map((todo) => {
                        if (todo.id === id) {
                            return {
                                ...todo,
                                ...updatedTodo,
                            }
                        }

                        return todo
                    })

                    setTodos(newTodos)
                },
            }}
        />
    )
}

export default Jotai
