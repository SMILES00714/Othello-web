import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container>
            <div>
                <Link to="/signup">
                    Sign Up
                </Link>
                <Link to="/login">
                    Log In
                </Link>
            </div>
        </Container>
    );
}

export default Home;