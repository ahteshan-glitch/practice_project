import {createSlice,nanoid} from "@reduxjs/toolkit";

const initialState={
    todos:[{id:"abc",task:"demo-task",isDone:false}]
};
export const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const newTodo={
                id:nanoid(),
                task:action.payload,
                idDone:flase
            }
            state.todos.push(newTodo)
        },
        deleteTodo:(state,action)=>{
            todos.slice((todo)=>todo.id!==action.payload);
        },
        markdone:(state,action)=>{
            todos.map((todo)=>{
                if(todo.id===action.payload){
                    isDone=true;
                }
            })
        }

    }
})
export const {addTodo,deleteTodo,markdone}=todoSlice.actions;
export default todoSlice.reducer;