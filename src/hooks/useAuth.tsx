import { User } from 'data.type';
import jwtDecode from 'jwt-decode';
import React, { useContext, useReducer } from 'react';
import { createContext } from 'react';

type AuthInfo = {
	jwt?: string;
	user?: User;
	isLogged: boolean;
};

const initialState: AuthInfo = {
	isLogged: false,
};

type Action = {
	type: 'login' | 'logout';
	payload: { jwt?: string; onLogin?: () => void };
};

const reducer = (state: AuthInfo, action: Action) => {
	switch (action.type) {
	case 'login': {
		if (!action.payload?.jwt) return state;
		const jwt = action.payload.jwt;
		localStorage.setItem('token', jwt);
		const user = jwtDecode<User>(jwt);
		if (action.payload?.onLogin) action.payload?.onLogin();
		return { jwt, user, isLogged: true };
	}
	case 'logout':
		localStorage.clear();
		return initialState;
	default:
		throw new Error('Unknow action type request on \'Auth Reducer\'');
	}
};

const initializer = () => {
	const jwt = localStorage.getItem('token');
	if (!jwt) return initialState;
	const user = jwtDecode<User>(jwt);
	return { jwt, user, isLogged: true };
};

const AuthContext = createContext<{ info: AuthInfo; dispatch: React.Dispatch<Action> } | undefined>(
	undefined
);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [info, dispatch] = useReducer(reducer, initializer());
	return <AuthContext.Provider value={{ info, dispatch }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
	return useContext(AuthContext);
};

export default useAuth;
