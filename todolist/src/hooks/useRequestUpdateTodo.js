import { ref, update } from "firebase/database";
import { db } from "../firebase";
export const useRequestUpdateTodoModule = (TODOLIST, setErrorMessage) => {
    const requestUpdateTodo = (updatedValue, id) => {
        if (updatedValue.trim() === "") {
            setErrorMessage("Название задачи не может быть пустым");
            return;
        } else if (
            Object.values(TODOLIST).some(
                (item) => item.title === updatedValue.trim()
            )
        ) {
            setErrorMessage("Задача с таким названием уже существует");
            return;
        }
        update(ref(db, `todos/${id}`), { title: updatedValue.trim() });
    };

    return {
        requestUpdateTodo,
    };
};
