import React, { useState } from 'react';
import accounts from '../../storage/account.json';

interface AuthAPI {
    user?: {
        name: string,
        favouriteFruit: string,
        favouriteMovie: string,
        favouriteNumber: string,
    };
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = React.createContext<AuthAPI>({
    login(){
        return Promise.resolve();
    },
    logout(){}
})

const AuthProvider: React.FC = ({children}) => {

    const [user, setUser] = useState();

    const login = (username: string, password: string) => {
        if ((accounts as any)[username] && (accounts as any)[username].password === password) {
          setUser((accounts as any)[username]);
          return Promise.resolve();
        } else {
          return Promise.reject("INVALID USER");
        }
    }

    const logout = () => {
        setUser(undefined);
    }

    const api = {
        user,
        logout,
        login
    }

    return (
        <AuthContext.Provider value={api}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};
