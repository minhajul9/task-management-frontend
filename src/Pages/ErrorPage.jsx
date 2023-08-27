import { Link } from 'react-router-dom';
import {FaArrowLeft} from "react-icons/fa"


const ErrorPage = () => {
    return (
        <div className='text-center w-full my-12'>
            <img className='mx-auto' src="https://i.ibb.co/hK1tC8h/pngegg.png" alt="" />
            <Link to='/'><button className="btn btn-active btn-secondary font-bold text-2xl my-4"> <FaArrowLeft className='mx-2' /> Back to Home</button>
</Link>
        </div>
    );
};

export default ErrorPage;