import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState();

	const navigate = useNavigate();

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		setUser(userInfo);
		// if (!userInfo) navigate('/');
	}, [navigate]);

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useContextState = () => {
	const user_context = useContext(UserContext);
	if (!user_context)
		throw new Error("useContextState must be used within a UserProvider");
	return useContext(UserContext);
};

export default UserProvider;
