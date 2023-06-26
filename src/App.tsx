import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from 'hooks/useAuth';
import AppRoute from 'AppRoute';

function App() {
	return (
		<AuthContextProvider>
			<ToastContainer position="top-center" />
			<AppRoute />
		</AuthContextProvider>
	);
}

export default App;
