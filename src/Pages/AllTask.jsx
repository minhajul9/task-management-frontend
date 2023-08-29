import { useLoaderData } from "react-router-dom";
import { addToDb, getcompletedTask } from "../utilities/fakedb";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const AllTask = () => {

    const {tasks} = useContext(AuthContext)

    const [completedTask, setCompletedTask] = useState(getcompletedTask());
    // console.log(completedTask);

    const handleAddToDb = (id) => {
        addToDb(id);
        setCompletedTask([...completedTask, id])
    }

    // console.log(tasks)

    return (
        <div className="pt-20 md:mx-40">
            <div className="overflow-x-auto">
                <table className="table">

                    <tbody>

                        {
                            tasks.map(task =>
                                <tr key={task._id}>
                                    <td className="font-bold text-xl">{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.level}</td>
                                    <td>{
                                        completedTask.includes(task._id) ?
                                            <p className="text-info">Completed</p>
                                            :
                                            <button onClick={() => handleAddToDb(task._id)} className="btn">Mark as Complete</button>
                                    }</td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default AllTask;