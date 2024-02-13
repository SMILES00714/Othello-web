import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    let navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const logOut = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className='header'>
            <div>
                <Link to="/">Home</Link>
            </div>
            {token ? (
                <div>
                    <button onClick={logOut}>Logout</button>
                </div>
            ) : (
                <>
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Header;