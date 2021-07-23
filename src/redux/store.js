import { createStore } from 'redux'
import { reduces } from './reducers'

export const store = createStore(reduces)