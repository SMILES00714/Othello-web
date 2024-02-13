const Dashboard = () => {
    const usersString = localStorage.getItem('users');
    let users;
    if (usersString)
        users = JSON.parse(usersString);

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="side">User Info</div>
            </div>
            <div className="main">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user: any, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;