import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase.config";


export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log(currentUser);
            if (currentUser) {
                // console.log(currentUser);
                fetch(`http://localhost:5000/users/${currentUser.uid}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log('data',data);
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

    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [])

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
        setLoading,
        googleSignIn,
        githubSignIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;