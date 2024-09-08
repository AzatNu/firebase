export const sortModule = () => {
    const sortTODOLIST = (TODOLIST, sortButtonClicked) => {
        if (!sortButtonClicked) {
            TODOLIST.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            TODOLIST.sort((a, b) => b.title.localeCompare(a.title));
        }
    };
};
