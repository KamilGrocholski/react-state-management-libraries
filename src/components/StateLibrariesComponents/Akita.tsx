import Template from '../Template'
import { todosService, useTodos } from '../../stores/akita'

const Akita = () => {
    const todos = useTodos()

    return (
        <Template
            name='Akita'
            version=''
            state={{ todos }}
            actions={{
                add(todo) {
                    todosService.add(todo)
                },
                remove(id) {
                    todosService.remove(id)
                },
                update(id, todo) {
                    todosService.update(id, todo)
                },
            }}
        />
    )
}

export default Akita
