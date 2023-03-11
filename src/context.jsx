import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [profile, setProfile] = useState(null)

    const updateProfile = (profileData) => setProfile(profileData)

    return (
        <UserContext.Provider value={{ profile, updateProfile }}>
            {children}
        </UserContext.Provider>
    )
}
