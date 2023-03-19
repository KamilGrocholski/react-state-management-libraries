import { useRecoilState } from 'recoil'
import todosAtom from '../../stores/recoil'
import Template from '../Template'

const Recoil = () => {
    const [todos, setTodos] = useRecoilState(todosAtom)

    return (
        <Template
            name='Recoil'
            version='0.7.7'
            state={{
                todos: [...todos],
            }}
            actions={{
                add(todo) {
                    setTodos([...todos, todo])
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
