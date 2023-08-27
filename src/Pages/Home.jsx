import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(https://img.freepik.com/premium-vector/developing-programming-coding-technologies-engineering-development-programmer-developer-create-code-laptop-screen-with-codes-developer-work-with-task-coding-software-using-pc_458444-1153.jpg?w=2000)` }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md text-white">
                    <h1 className="mb-5 text-5xl font-bold">Hello Programmers</h1>
                    <p className="mb-5">Practice makes a man perfect. In Programming, Practice is must. Here are some Programming task you can complete.</p>
                    <Link to='/allTask'><button className="btn btn-primary">Get Started</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;