import {createSlice} from'@reduxjs/toolkit'

const initialState = {docIdUser:""}


const todosSlice = createSlice({
    name:'todos',
    initialState,
    reducers:{

        updateTodo(state,action){
            console.log(`updateTodo activated payload = ${action.payload}`);
            //state.state
        },
    }
})

console.log(todosSlice);
const {actions,reducer} = todosSlice
export const {updateTodo} = actions
export default reducer