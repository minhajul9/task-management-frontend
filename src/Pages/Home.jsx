import { useContext} from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";


const Home = () => {
    // const [tasks, setTasks] = useState([]);
    const { user, tasks, loading, doing, done, todo } = useContext(AuthContext);
    // console.log(tasks);


    const showDetails = task => {
        const newDone = user.done;
        const newDoing = user.doing;
        Swal.fire({
            html:
                `<b>${task.title}</b></br></br> ` +
                `<p>${task.description}</p> </br>` +
                `<p>Difficulty Level: ${task.level}</p> </br>` +
                `Added by: <strong>${task.creatorName}</strong>`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Doing',
            denyButtonText: `Done`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                if (newDoing.includes(task._id)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Already doing!',
                    })
                }
                else {
                    newDoing.push(task._id)
                    if (newDone.includes(task._id)) {
                        const index = newDone.indexOf(task._id);
                        newDone.splice(index, 1)
                    }
                    Swal.fire('Status changed to DOING', '', 'info')
                }
            }
            else if (result.isDenied) {
                if (newDone.includes(task._id)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Already Done!',
                    })
                }
                else {
                    newDone.push(task._id)
                    if (newDoing.includes(task._id)) {
                        const index = newDoing.indexOf(task._id);
                        newDoing.splice(index, 1)
                    }
                    Swal.fire('Status changed to DONE', '', 'success')
                }

            }
            user.doing = newDoing;
            user.done = newDone;
            const updatedUser = user;
            fetch(`https://task-management-backend-roan.vercel.app/user/${user?._id}`, {
                method: "PUT",
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(updatedUser)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.modifiedCount) {
                        window.location.reload()
                    }
                })
        })
    }

    if (loading) {
        return <div className="flex justify-center py-8">
            <span className="loading loading-spinner text-primary"></span>
            <span className="loading loading-spinner text-secondary"></span>
            <span className="loading loading-spinner text-accent"></span>
            <span className="loading loading-spinner text-neutral"></span>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            
        </div>
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
                                                    <p>{task.description.length > 40 ? task.description.slice(0, 39) + "..." : task.description}</p>
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
                                <div className="top-28 grid sm:grid-cols-2 lg:grid-cols-4 md:ms-2">
                                    {
                                        done.map(task =>
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
                    </div>
                    :
                    <div className="top-28 grid sm:grid-cols-2 lg:grid-cols-4 md:ms-2">
                        {tasks.map(task =>
                            <div key={task._id} className="card bg-black bg-opacity-30 shadow-xl m-6">
                                <div className="card-body">
                                    <h2 className="card-title">{task.title}</h2>
                                    <p>{task.description.length > 40 ? task.description.slice(0, 39) + "..." : task.description}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary" onClick={() => showDetails(task)}>View Details</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
            }
        </div>
    )
};

export default Home;