import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Swal from 'sweetalert2'


const Navbar = () => {

    const { user, setUser, googleSignIn, logOut, githubSignIn } = useContext(AuthContext)

    const navItem = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/myTasks'>My Tasks</NavLink></li>
        <li><NavLink to='/addATask'>Add A Task</NavLink></li>
        <li><NavLink to='/allTask'>All Task</NavLink></li>

    </>;

    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                const createUser = {
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photo: user.photoURL,
                    done: [],
                    doing: []
                }

                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(createUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            setUser(createUser)
                        }
                        else {
                            setUser(data)
                        }
                    })
                console.log(user);
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login Failed! Try again.',
                })
            })
    }

    const handleGithub = () => {
        githubSignIn()
            .then(result => {
                const user = result.user;
                const createUser = {
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photo: user.photoURL,
                    done: [],
                    doing: []
                }

                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(createUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            setUser(createUser)
                        }
                        else {
                            setUser(data)
                        }
                    })
                console.log(user);
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login Failed! Try again.',
                })
            })
    }

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    return (
        <div className="navbar bg-black bg-opacity-20  fixed md:px-24">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItem}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Task</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItem}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <img src={user.photo} className='w-10 h-10 rounded-full mx-4' alt="" />
                        <button onClick={handleLogOut} className='btn btn-sm text-sm'>Log Out</button>
                    </> :
                        <div className='space-x-9 flex items-center'>
                            <FcGoogle onClick={handleGoogle} className='text-3xl' />
                            <FaGithub onClick={handleGithub} className='text-3xl' />
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;