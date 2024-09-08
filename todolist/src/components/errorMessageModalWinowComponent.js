import style from "../App.module.css";

export const ModalWindow = ({ errorMessage, setErrorMessage }) => {
    return (
        <>
            {errorMessage !== "" && (
                <div className={style["errorWindow"]}>
                    <h2>{errorMessage}</h2>
                    <button
                        onClick={() => setErrorMessage("")}
                        className={style["closeErrorWindow"]}
                    >
                        OK
                    </button>
                </div>
            )}
        </>
    );
};
