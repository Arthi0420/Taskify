import { createContext, useState } from "react";

// create a context
 export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user, setUser] = useState({
        uid:'', email:''});
    

    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
