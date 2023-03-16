import store, { actions } from '../stores/valtio'
import Template from './Template'
import { useSnapshot } from 'valtio'

const Valtio = () => {
    const snap = useSnapshot(store)

    return (
        <Template
            name='Valtio'
            version='2'
            state={{
                todos: [...snap.todos],
            }}
            actions={{
                add: actions.add,
                remove: actions.remove,
                update: actions.update,
            }}
        />
    )
}

export default Valtio
