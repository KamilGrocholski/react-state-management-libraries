import { observer } from 'mobx-react'
import { type StoreType } from '../../stores/mobx'
import store from '../../stores/mobx'
import Template from '../Template'

const MobxCore = ({ store }: { store: StoreType }) => {
    return (
        <Template
            name='Mobx'
            version='6.8.0'
            state={{
                todos: [...store.todos],
            }}
            actions={{
                add(todo) {
                    store.add(todo)
                },
                remove(id) {
                    store.remove(id)
                },
                update(id, updatedTodo) {
                    store.update(id, updatedTodo)
                },
            }}
        />
    )
}

const Observer = observer(MobxCore)

const Mobx = () => {
    return <Observer store={store} />
}

export default Mobx
