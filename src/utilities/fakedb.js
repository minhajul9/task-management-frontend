// use local storage to manage cart data
const addToDb = id => {
    let completedTask = getcompletedTask();
    completedTask.push(id)
    localStorage.setItem('completed-task', JSON.stringify(completedTask));
}

const removeFromDb = id => {
    const completedTask = getcompletedTask();
    if (id in completedTask) {
        delete completedTask[id];
        localStorage.setItem('completed-task', JSON.stringify(completedTask));
    }
}

const getcompletedTask = () => {
    let completedTask = [];

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('completed-task');
    if (storedCart) {
        completedTask = JSON.parse(storedCart);
    }
    return completedTask;
}

const deletecompletedTask = () => {
    localStorage.removeItem('completed-task');
}

export {
    addToDb,
    removeFromDb,
    getcompletedTask,
    deletecompletedTask
}
