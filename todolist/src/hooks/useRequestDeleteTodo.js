import { ref, remove } from "firebase/database";
import { db } from "../firebase";
export const useRequestDeleteTodoModule = (setTODOLIST) => {
    const requestDeleteTodo = (id) => {
        remove(ref(db, `todos/${id}`));
        setTODOLIST((lastState) => {
            const newState = { ...lastState };
            delete newState[id];
            return newState;
        });
    };

    return {
        requestDeleteTodo,
    };
};
