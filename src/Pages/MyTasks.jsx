import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const MyTasks = () => {

    const { user } = useContext(AuthContext)

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`https://mohite-task-minhajul9.vercel.app/tasks/${user?.email}`)
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [user]);

    const handleDelete = id => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://mohite-task-minhajul9.vercel.app/tasks/${id}`,{
                    method: "delete"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            const remaining = tasks.filter( task => task._id !== id);
                            setTasks(remaining)
                            Swal.fire(
                                'Deleted!',
                                'Task has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })


    }

    return (
        <div className="pt-20 md:mx-40">
            <div className="overflow-x-auto">
                <table className="table">

                    <tbody>

                        {
                            tasks.map(task =>
                                <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.level}</td>
                                    <td><button className="btn" onClick={() => handleDelete(task._id)}>Delete</button></td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyTasks;