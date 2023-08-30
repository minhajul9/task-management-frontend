import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const MyTasks = () => {

    const { user } = useContext(AuthContext)

    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/tasks/${user?.uid}`)
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
                fetch(`http://localhost:5000/task/${id}`, {
                    method: "delete"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            const remaining = tasks.filter(task => task._id !== id);
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
    const editTask = (task) =>{
        navigate('/editTask', {state: task})

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
                                    <td>
                                        <button className="btn btn-warning mx-2" onClick={() => editTask(task)}><FaPencilAlt/></button>
                                        <button className="btn btn-error" onClick={() => handleDelete(task._id)}><FaTrashAlt></FaTrashAlt></button>
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyTasks;