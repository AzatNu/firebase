import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
export const useRequestGetTodoModule = (setTODOLIST, refreshPage) => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        const todosDbRef = ref(db, "todos");
        onValue(todosDbRef, (snapshot) => {
            const loadedData = snapshot.val() || [];
            setTODOLIST(loadedData);
            setIsLoading(false);
        });
    }, [refreshPage]);

    return { isLoading };
};
