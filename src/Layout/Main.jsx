import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Main = () => {
    return (
        <div className='bg-blue-950 min-h-screen'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;