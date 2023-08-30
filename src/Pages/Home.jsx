import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";


const Home = () => {
    // const [tasks, setTasks] = useState([]);
    const { user, tasks } = useContext(AuthContext);
    // console.log(tasks);
    const [done, setDone] = useState([])
    const [doing, setDoing] = useState([]);
    const [todo, setTodo] = useState([])
    console.log(user);

    useEffect(() => {
        if (user) {
            const tempDoing = tasks.filter(task => user.doing.includes(task._id));
            setDoing(tempDoing)
            const tempDone = tasks.filter(task => user.done.includes(task._id));
            setDone(tempDone)
            const tempTodo = tasks.filter(task => !user.done.includes(task._id) && !user.doing.includes(task._id));
            setTodo(tempTodo)
        }

    }, [tasks, user])



    const showDetails = task => {
        Swal.fire({
            html:
                `<b>${task.title}</b></br></br> ` +
                `<p>${task.description}</p> </br>` +
                `Added by: <strong>${task.creatorName}</strong>`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Doing',
            denyButtonText: `Done`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Status changed to DOING', '', 'info')
            } else if (result.isDenied) {
                Swal.fire('Status changed to DONE', '', 'success')
            }
        })
    }

    return (
        <div >
            {
                user ?
                    <div >
                        {doing.length > 0 &&
                            <div className="border rounded-lg m-8 bg-black bg-opacity-25 shadow-lg">
                                <h1 className="text-center mt-8 font-bold text-2xl">DOING</h1>
                                <div className="top-28 grid sm:grid-cols-2 lg:grid-cols-4 md:ms-2">
                                    {
                                        doing.map(task =>
                                            <div key={task._id} className="card bg-black bg-opacity-30 shadow-xl m-6">
                                                <div className="card-body">
                                                    <h2 className="card-title">{task.title}</h2>
                                                    <p>{task.description}</p>
                                                    <div className="card-actions justify-end">
                                                        <button className="btn btn-primary" onClick={() => showDetails(task)}>View Details</button>
                                                    </div>
                                                </div>
                                            </div>)
                                    }
                                </div>
                            </div>}
                        {todo.length > 0 && <div className="border rounded-lg m-8 bg-black bg-opacity-25 shadow-lg">
                            <h1 className="text-center mt-8 font-bold text-2xl">TODO</h1>
                            <div className="top-28 grid sm:grid-cols-2 lg:grid-cols-4 md:ms-2">
                                {
                                    todo.map(task =>
                                        <div key={task._id} className="card bg-black bg-opacity-30 shadow-xl m-6">
                                            <div className="card-body">
                                                <h2 className="card-title">{task.title}</h2>
                                                <p>{task.description.length > 40 ? task.description.slice(0, 39) + "..." : task.description}</p>
                                                <div className="card-actions justify-end">
                                                    <button className="btn btn-primary" onClick={() => showDetails(task)}>View Details</button>
                                                </div>
                                            </div>
                                        </div>)
                                }
                            </div>
                        </div>
                        }
                        {done.length > 0 &&
                            <div className="border rounded-lg m-8 bg-black bg-opacity-25 shadow-lg">
                                <h1 className="text-center mt-8 font-bold text-2xl">DONE</h1>
                                <div className="relative top-28 grid sm:grid-cols-2 lg:grid-cols-4 md:ms-2">
                                    {
                                        done.map(task =>
                                            <div key={task._id} className="card bg-black bg-opacity-30 shadow-xl m-6">
                                                <div className="card-body">
                                                    <h2 className="card-title">{task.title}</h2>
                                                    <p>{task.description}</p>
                                                    <div className="card-actions justify-end">
                                                        <button className="btn btn-primary" onClick={() => showDetails(task)}>View Details</button>
                                                    </div>
                                                </div>
                                            </div>)
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <div className="relative top-28 grid sm:grid-cols-2 lg:grid-cols-4 md:ms-2">
                        {tasks.map(task =>
                            <div key={task._id} className="card bg-black bg-opacity-30 shadow-xl m-6">
                                <div className="card-body">
                                    <h2 className="card-title">{task.title}</h2>
                                    <p>{task.description}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary" onClick={() => showDetails(task)}>View Details</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
            }
        </div>
    );
};

export default Home;