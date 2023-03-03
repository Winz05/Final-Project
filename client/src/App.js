import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import NavigationBar from "./components/navbar";
import Profile from "./pages/profile";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./pages/login";
import UpdatePassword from "./pages/newpass";
import Register from "./pages/register";
import Activation from "./pages/activation";
import ForgotPass from "./pages/forgotpass";
import Dashboard from "./pages/dashboard";
import SalesReport from "./components/salesReport";
import ProductCategory from "./pages/product_category";
import Checkout from "./pages/checkout";
import Cart from "./pages/cart";

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
				let { data } = await axios.post("http://localhost:8000/user/keep-login", { token });
				setname(data.name);
				setredirect(true);
			}
		} catch (error) {
			console.log(error);
			// localStorage.removeItem("token");
		}
	};

	let onLogout = () => {
		localStorage.removeItem("token");
		setname("");
	};

	return (
		<>
			{location.pathname === "/home" || location.pathname === "/profile" ? (
				<NavigationBar data={{ name }} myFunc={{ onLogout }} />
			) : null}
			<div className="relative">
				<Routes>
					<Route path="/home" element={<LandingPage />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/login" element={<Login />} />
					<Route path="/updatePassword/:uid" element={<UpdatePassword />} />
					<Route path="/register" element={<Register />} />
					<Route path="/activation/:uid" element={<Activation />} />
					<Route path="/forgotpassword" element={<ForgotPass />} />
					<Route path="/" element={<Dashboard />}>
						{/* <Route path="/admin" element={<Overview />} /> */}
						<Route path="/sales-report" element={<SalesReport />} />
					</Route>
					<Route path="/category/:product" element={<ProductCategory/>}/>
					<Route path="/checkout/:cart" element={<Checkout/>}/>
					<Route path="/cart/:id" element={<Cart/>}/>
				</Routes>
			</div>
		</>
	);
}

export default App;
