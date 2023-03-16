import type { State } from '../utils'
import { atom } from 'jotai'

const todosAtom = atom<State['todos']>([])

export default todosAtom
