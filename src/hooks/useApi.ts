import axios from 'axios';
import { useAuth } from '.';
import { useMemo } from 'react';

const useApi = () => {
	const auth = useAuth();
	return useMemo(() => {
		const axiosConfig = {
			baseURL: process.env.REACT_APP_API_BASE_URL,
			headers: { Authorization: auth?.info.isLogged ? `Bearer ${auth.info.jwt}` : undefined },
		};
		return axios.create(axiosConfig);
		/*
            instance.interceptors.response.use((response) => response,
                (error) => {
                    if (error.response.status === 401) {
                        auth?.dispatch({ type: 'logout'} );
                    }
                    return Promise.reject(error);
                }
            );
            return instance;*/
	}, [auth]);
};

export default useApi;
