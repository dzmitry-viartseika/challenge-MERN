import {useState, useEffect} from "react";

const DashboardPage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Make a GET request to the /api/v1/userdata endpoint on your server
        fetch('http://localhost:4000/api/v1/github/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include credentials (cookies) for sessions
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data.user);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);


    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            {userData ? (
                <div>
                    <h2>User Profile</h2>
                    <p>Name: {userData.displayName}</p>
                    {/* Display other user data as needed */}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    )
};

export default DashboardPage;