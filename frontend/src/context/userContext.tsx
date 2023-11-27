import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext<any | undefined>(undefined);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const updateUser = (newUserData) => {
        console.log('newUserData', newUserData)
        setUser(newUserData);
    };

    const contextValue = {
        user,
        updateUser,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export { UserProvider, useUser };