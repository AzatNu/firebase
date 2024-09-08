import style from "./App.module.css";
import { SearchSort } from "./components/searchSrotComponent";
import { useState, useEffect } from "react";
import {
    useRequestAddTodoModule,
    useRequestDeleteTodoModule,
    useRequestUpdateTodoModule,
    useRequestGetTodoModule,
} from "./hooks";
import { ModalWindow } from "./components/errorMessageModalWinowComponent";
import { UpdateModalWindow } from "./components/updateModalWindowComponent";

export const App = () => {
    const [TODOLIST, setTODOLIST] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [addInputValue, setAddInputValue] = useState("");
    const [updateInputValue, setUpdateInputValue] = useState("");
    const [refreshPage, setRefreshPage] = useState(false);
    const [sortButtonClicked, setSortButtonClick] = useState(false);
    const [Id, setId] = useState(0);
    const [updateButtonClicked, setUpdateButtonClick] = useState(false);
    console.log(TODOLIST);
    useEffect(() => {
        sortTODOLIST();
    }, [sortButtonClicked]);
    const { isLoading } = useRequestGetTodoModule(setTODOLIST, refreshPage);
    const { requestAddTodo, isAdding } = useRequestAddTodoModule(
        TODOLIST,
        setTODOLIST,
        setErrorMessage
    );
    const { requestDeleteTodo } = useRequestDeleteTodoModule(setTODOLIST);
    const { requestUpdateTodo } = useRequestUpdateTodoModule(
        TODOLIST,
        setTODOLIST,
        setErrorMessage
    );

    const sortTODOLIST = () => {
        setTODOLIST((lastState) => {
            const newState = { ...lastState };
            const entries = Object.entries(newState);
            entries.sort((a, b) =>
                sortButtonClicked
                    ? b[1].title.localeCompare(a[1].title)
                    : a[1].title.localeCompare(b[1].title)
            );
            return Object.fromEntries(entries);
        });
    };

    const serchInTODOLIST = () => {
        if (addInputValue.trim() === "") {
            setErrorMessage("Название задачи не может быть пустым");
            return;
        } else {
            const newTODOLIST = Object.fromEntries(
                Object.entries(TODOLIST).filter(([key, value]) =>
                    value.title
                        .toLowerCase()
                        .trim()
                        .includes(addInputValue.toLowerCase().trim())
                )
            );
            setTODOLIST(newTODOLIST);
        }
    };

    return (
        <div className={style["App"]}>
            {isLoading && <div className={style["loader"]}></div>}
            <ModalWindow
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
            />
            <h1 className={style["title"]}>TODOLIST</h1>
            <div className={style["content"]}>
                <SearchSort
                    addInputValue={addInputValue}
                    setAddInputValue={setAddInputValue}
                    serchInTODOLIST={serchInTODOLIST}
                    setRefreshPage={setRefreshPage}
                    refreshPage={refreshPage}
                    setSortButtonClick={setSortButtonClick}
                    sortButtonClicked={sortButtonClicked}
                    isAdding={isAdding}
                    requestAddTodo={requestAddTodo}
                />
                {!isLoading && TODOLIST.length === 0 && (
                    <h2 className={style["empty"]}>Задачи отсутствуют</h2>
                )}
                {Object.entries(TODOLIST).map(([id, { title }]) => (
                    <div className={style["item"]} key={id}>
                        <button
                            className={style["delete"]}
                            onMouseOver={(e) =>
                                (e.currentTarget.title = "Удалить задачу")
                            }
                            onMouseOut={(e) => (e.currentTarget.title = "")}
                            onClick={() => {
                                requestDeleteTodo(id);
                                setRefreshPage(!refreshPage);
                            }}
                        >
                            X
                        </button>
                        <button
                            className={style["update"]}
                            onMouseOver={(e) =>
                                (e.currentTarget.title = "Редактировать задачу")
                            }
                            onMouseOut={(e) => (e.currentTarget.title = "")}
                            onClick={() => {
                                setId(id);

                                setUpdateButtonClick(true);
                            }}
                        >
                            &#x270E;
                        </button>
                        {TODOLIST[id].title}
                    </div>
                ))}
                <div className={style["buttons"]}>
                    <UpdateModalWindow
                        updateInputValue={updateInputValue}
                        setUpdateInputValue={setUpdateInputValue}
                        requestUpdateTodo={requestUpdateTodo}
                        Id={Id}
                        setUpdateButtonClick={setUpdateButtonClick}
                        refreshPage={refreshPage}
                        setRefreshPage={setRefreshPage}
                        updateButtonClicked={updateButtonClicked}
                    />
                </div>
            </div>
        </div>
    );
};
