import { combineReducers} from 'redux' 
import todosReducer from './todos/todosSlice'

const rootReducer = combineReducers({
    todos:todosReducer
})

export default rootReducer