import React from 'react';
import useAuth from 'hooks/useAuth';

const Home = () => {
	const auth = useAuth();

	return (
		<div>
			<button onClick={() => auth?.dispatch({ type: 'logout' })}>Logout</button>
		</div>
	);
};

export default Home;
