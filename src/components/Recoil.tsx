import todosAtom from '../stores/recoil'
import { useRecoilState } from 'recoil'
import Template from './Template'
import { composeTodo } from '../utils'

const Recoil = () => {
    const [todos, setTodos] = useRecoilState(todosAtom)

    return (
        <Template
            name='Recoil'
            version='2'
            state={{
                todos: [...todos],
            }}
            actions={{
                add(todo) {
                    const newTodo = composeTodo(todo)
                    setTodos([...todos, newTodo])
                },
                remove(id) {
                    setTodos(todos.filter((todo) => todo.id !== id))
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

export default Recoil
