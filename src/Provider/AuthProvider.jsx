import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase.config";


export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    const updateTasks = newTasks => {
        setTasks(newTasks)
    }



    useEffect(() => {

        fetch('https://task-management-backend-roan.vercel.app/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))

        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log(currentUser);
            if (currentUser) {
                // console.log(currentUser);
                fetch(`https://task-management-backend-roan.vercel.app/users/${currentUser.uid}`)
                    .then(res => res.json())
                    .then(data => {
                        // console.log('data',data);
                        setUser(data)
                        setLoading(false)
                    })
                // console.log(user);
            }
            else {
                setUser(null)
                setLoading(false)
            }

        })
        return () => {
            return unsubscribe();
        }
    }, [])

    const [done, setDone] = useState([])
    const [doing, setDoing] = useState([]);
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        // console.log('user updated');
        if (user) {
            const tempDoing = tasks.filter(task => user.doing.includes(task._id));
            setDoing(tempDoing)
            const tempDone = tasks.filter(task => user.done.includes(task._id));
            setDone(tempDone)
            const tempTodo = tasks.filter(task => !user.done.includes(task._id) && !user.doing.includes(task._id));
            setTodo(tempTodo)
        }

    }, [tasks, user])


    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const githubSignIn = () => {
        return signInWithPopup(auth, githubProvider)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const authInfo = {
        user,
        setUser,
        loading,
        tasks,
        setTasks,
        setLoading,
        googleSignIn,
        githubSignIn,
        logOut,
        updateTasks,
        doing, 
        done,
        todo
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;