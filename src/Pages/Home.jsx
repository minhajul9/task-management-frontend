import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";


const Home = () => {
    const [tasks, setTasks] = useState([]);
    const {user} = useContext(AuthContext);
    console.log(user);

    useEffect(() => {
        fetch(`https://mohite-task-minhajul9.vercel.app/task`)
            .then(res => res.json())
            .then(data => setTasks(data))
    }, []);

    const showDetails = task => {
        Swal.fire({
            title: task.title,
            text: task.description,
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
        <div className="relative top-28 grid sm:grid-cols-2 lg:grid-cols-4 md:ms-2">
            {
                tasks.map(task =>
                    <div key={task._id} className="card bg-black bg-opacity-30 shadow-xl m-6">
                        <div className="card-body">
                            <h2 className="card-title">{task.title}</h2>
                            <p>{task.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={() =>showDetails(task)}>View Details</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Home;