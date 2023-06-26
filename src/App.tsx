import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from 'hooks/useAuth';
import Authentication from 'pages/Authentication/Authentication';

function App() {
	return (
		<AuthContextProvider>
			<Authentication />
			<ToastContainer position="top-center" />
		</AuthContextProvider>
	);
}

export default App;
