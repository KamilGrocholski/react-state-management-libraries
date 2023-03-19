import { RootState, AppDispatch, add, remove, update } from '../../stores/redux'
import Template from '../Template'
import { useDispatch, useSelector } from 'react-redux'

const Redux = () => {
    const dispatch = useDispatch<AppDispatch>()

    const todos = useSelector((state: RootState) => state.todos.todos)

    return (
        <Template
            name='Redux'
            version='8.0.5'
            state={{
                todos: [...todos],
            }}
            actions={{
                add(todo) {
                    dispatch(add(todo))
                },
                remove(id) {
                    dispatch(remove(id))
                },
                update(id, updatedTodo) {
                    dispatch(update({ id, updatedTodo }))
                },
            }}
        />
    )
}

export default Redux
