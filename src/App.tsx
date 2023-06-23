import React from 'react';
import './App.css';
import Login from 'pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from 'hooks/useAuth';

function App() {
	return (
		<AuthContextProvider>
			<Login />
			<ToastContainer position="top-center" />
		</AuthContextProvider>
	);
}

export default App;
