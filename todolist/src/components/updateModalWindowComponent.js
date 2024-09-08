import style from "../App.module.css";
export const UpdateModalWindow = ({
    updateInputValue,
    setUpdateInputValue,
    requestUpdateTodo,
    Id,
    setUpdateButtonClick,
    refreshPage,
    setRefreshPage,
    updateButtonClicked,
}) => {
    return (
        <>
            {updateButtonClicked && (
                <div className={style["modal"]}>
                    <div className={style["modal-content"]}>
                        <h2>Введите новый текст для задачи</h2>
                        <input
                            placeholder="Новый текст для задачи"
                            className={style["modal-input"]}
                            type="text"
                            value={updateInputValue}
                            onChange={(e) =>
                                setUpdateInputValue(e.target.value)
                            }
                        />
                        <button
                            onClick={() => {
                                requestUpdateTodo(updateInputValue, Id);
                                setUpdateButtonClick(false);
                                setUpdateInputValue("");
                            }}
                            className={style["modal-button"]}
                        >
                            &#x2714; Обновить
                        </button>
                        <button
                            onClick={() => {
                                setUpdateButtonClick(false);
                            }}
                            className={style["modal-button"]}
                        >
                            &#x2716; Закрыть
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
