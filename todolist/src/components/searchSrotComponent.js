import style from "../App.module.css";
export const SearchSort = ({
    addInputValue,
    setAddInputValue,
    serchInTODOLIST,
    setRefreshPage,
    refreshPage,
    setSortButtonClick,
    sortButtonClicked,
    isAdding,
    requestAddTodo,
}) => {
    return (
        <>
            <div className={style["serch-sort-module"]}>
                <input
                    className={style["search-input"]}
                    placeholder="Найти задачу или добавить её"
                    type="text"
                    value={addInputValue}
                    onChange={(e) => setAddInputValue(e.target.value)}
                />
                <button
                    onClick={() => {
                        serchInTODOLIST();
                        setAddInputValue("");
                    }}
                    className={style["serch-button"]}
                >
                    Найти
                </button>
                <button
                    onClick={() => {
                        setRefreshPage(!refreshPage);
                        setAddInputValue("");
                    }}
                    className={style["serch-button"]}
                >
                    Сбросить
                </button>
                <button
                    onClick={() => setSortButtonClick(!sortButtonClicked)}
                    className={style["serch-button"]}
                >
                    {sortButtonClicked ? "A — я" : "я — A"}
                </button>
                <button
                    onMouseOver={(e) =>
                        (e.currentTarget.title = "Добавить задачу")
                    }
                    onMouseOut={(e) => (e.currentTarget.title = "")}
                    disabled={isAdding}
                    onClick={() => {
                        requestAddTodo(addInputValue);
                        setAddInputValue("");
                    }}
                    className={style["add"]}
                >
                    +
                </button>
            </div>
        </>
    );
};
