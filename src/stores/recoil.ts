import { atom } from 'recoil'
import { type Todo } from '../utils'

const todosAtom = atom<Todo[]>({
    key: 'todos',
})

export default todosAtom
