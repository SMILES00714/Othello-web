// import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './SideBar';
import UserBoard from '../pages/UserBoard';
import ClientBoard from '../pages/ClientBoard';

const MainArea = () => {

    return (
        <>
            <Sidebar />
            <Routes>
                <Route path='/' element={<UserBoard />}></Route>
                <Route path='/users' element={<UserBoard />}></Route>
                <Route path='/clients' element={<ClientBoard />}></Route>
            </Routes>
        </>
    );
};

export default MainArea;