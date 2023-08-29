import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const AddATask = () => {

    const {user} = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = data => {

        const {title, description, level} = data;

        const task = {title, description, level, creator: user?.email}
        console.log(task)

        fetch('http://localhost:5000/tasks', {
            method: "POST",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Task added successfully.',
                  })
            }
        })
    }

    return (
        <div className="w-11/12 md:w-1/2 mx-auto min-h-screen pt-20">
            <div className="flex-col mt-12">
                <h1 className='text-3xl font-bold text-center my-8'>Add a task</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="card flex-shrink-0 w-full md:p-8 shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" {...register('title', { required: true })} placeholder="Title" className="input input-bordered p-2" />
                            {errors.title && <span className="text-red-600">Please, Add a title.</span>}
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Difficulty Level</span>
                            </label>
                            <select defaultValue='Easy' {...register('level', {required:true})} className="select select-ghost w-full max-w-xs input-bordered ">
                                <option value='Easy'>Easy</option>
                                <option value='Medium'>Medium</option>
                                <option value='Hard'>Hard</option>
                            </select>
                            {errors.level && <span className="text-red-600">Please, Select difficulty level.</span>}

                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea className="input input-bordered h-32 p-2" {...register('description', {required: true})} placeholder='Description'  cols="50" rows="30"></textarea>
                            {errors.description && <span className="text-red-600">Please, Write description.</span>}

                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Add Task" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddATask;