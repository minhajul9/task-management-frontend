import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router-dom';
import { AttentionSeeker } from "react-awesome-reveal";
import Swal from 'sweetalert2';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    // console.log(user);


    if (loading) {
        return <div className='h-screen flex items-center justify-center'>
            <AttentionSeeker effect="wobble" >
                <p className='text-4xl font-bold'>Loading</p>
            </AttentionSeeker>
        </div>
    }

    if (user) {
        // console.log("user from private:", user);
        return children;
    }

    if (!user) {
        Swal.fire({
            icon: 'error',
            title: 'Please, login first.',
        })
        return (
            <Navigate to='/'></Navigate>
        );
    }
};

export default PrivateRoute;