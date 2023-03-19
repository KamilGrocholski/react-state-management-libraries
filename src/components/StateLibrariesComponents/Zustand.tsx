import store from '../../stores/zustand'
import Template from '../Template'

const Zustand = () => {
    const todos = store((state) => state.todos)
    const remove = store((state) => state.remove)
    const update = store((state) => state.update)
    const add = store((state) => state.add)

    return (
        <Template
            name='Zustand'
            version='4.3.6'
            state={{
                todos: [...todos],
            }}
            actions={{
                add,
                remove,
                update,
            }}
        />
    )
}

export default Zustand
