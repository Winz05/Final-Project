import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import NavigationBar from "./components/navbar";
// import Profile from "./pages/profile";
import ForgotPass from "./pages/forgotpass";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect, useState } from "react";
import axios from "axios";
import UpdatePassword from "./pages/newpass";
import Activation from "./pages/activation";


function App() {
	const location = useLocation();
	const [name, setname] = useState("");
	const [redirect, setredirect] = useState(false);
	

	useEffect(() => {
		// checkIsLogin();
	}, []);

	let checkIsLogin = async () => {
		try {
			let token = localStorage.getItem("token");
			if (token) {
				let { data } = await axios.post(
					"http://localhost:5000/user/keep-login",
					{ token }
				);
				setname(data.name);
				setredirect(true);
			}
		} catch (error) {
			localStorage.removeItem("token");
		}
	};

	let onLogout = () => {
		localStorage.removeItem("token");
		setname("");
	};

	return (
		<div className="relative">
			{location.pathname === "/home" || location.pathname === "/profile" ? (
				<NavigationBar data={{ name }} myFunc1={{ onLogout }} />
			) : null}
			<Routes>
				<Route path="/home" element={<LandingPage />} />
				{/* <Route path="/profile" element={<Profile />} /> */}
				<Route path="/login" element={<Login />} />
				<Route path="/updatePassword/:uid" element={<UpdatePassword />} />
				<Route path="/register" element={<Register />} />
				<Route path="/activation/:uid" element={<Activation />} />
				<Route path="/forgotpassword" element={<ForgotPass />} />
			</Routes>
		</div>
	);
}

export default App;
