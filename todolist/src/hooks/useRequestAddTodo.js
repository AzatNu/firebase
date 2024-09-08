import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";

export const useRequestAddTodoModule = (
    TODOLIST,
    setTODOLIST,
    setErrorMessage
) => {
    const [isAdding, setIsAdding] = useState(false);
    const requestAddTodo = (value) => {
        const trimmedValue = value.trim();
        if (trimmedValue === "") {
            setErrorMessage("Название задачи не может быть пустым");
            return;
        }
        if (
            Object.values(TODOLIST).some(
                (item) =>
                    item.title.trim().toLowerCase() ===
                    trimmedValue.toLowerCase()
            )
        ) {
            setErrorMessage("Задача с таким названием уже существует");
            return;
        }
        if (trimmedValue.length < 3) {
            setErrorMessage(
                "Название задачи должно содержать минимум 3 символа"
            );
            return;
        }
        if (trimmedValue.length > 50) {
            setErrorMessage(
                "Название задачи не может быть длиннее 50 символов"
            );
            return;
        }
        setIsAdding(true);
        const produtcsDbRef = ref(db, "todos");
        push(produtcsDbRef, { title: value })
            .then((snapshot) => {
                const newTodo = { id: snapshot.key, title: value };
                setTODOLIST((lastState) => ({
                    ...lastState,
                    [snapshot.key]: newTodo,
                }));
            })
            .finally(() => {
                setIsAdding(false);
            });
    };

    return {
        requestAddTodo,
        isAdding,
    };
};
