import {useState, useEffect} from "react";
import NavBar from "../components/NavBar/NavBar";
import {useUser} from "../context/userContext";
import {useGetClients} from "../hooks/queries/useGetClients";
import {useLogOut} from "../hooks/mutations/useLogOut";
import {Button} from "react-bootstrap";

const DashboardPage = () => {
    const [userData, setUserData] = useState(null);
    const { logOutUser } = useLogOut()
    // const {clientList = []} = useGetClients();
    // console.log('clientList', clientList)
    const userContext = useUser();

    const logOut = () => {
        logOutUser()
    }

    useEffect(() => {
        // Make a GET request to the /api/v1/userdata endpoint on your server
        // fetch('https://localhost:4000/api/v1/github/user', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     credentials: 'include', // Include credentials (cookies) for sessions
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         setUserData(data.user);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching user data:', error);
        //     });

        // fetch('https://localhost:4000/api/v1/google/user', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     credentials: 'include', // Include credentials (cookies) for sessions
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log('data', data)
        //         userContext.updateUser(data);
        //         setUserData(data.user.user);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching user data:', error);
        //     });
    }, []);


    return (
        <div>
            <NavBar />
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <Button onClick={logOut}>LogOut</Button>
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