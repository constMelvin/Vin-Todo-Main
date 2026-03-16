import Home from "./components/Home";
import { ThemeProvider } from "./components/theme-provider";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import Layout from "@/components/Layout";
import SignIn from "./components/Sign-in";
import SignUp from "./components/Sign-up";

const App = () => {
	return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<Routes>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />

					<Route element={<Layout />}>
						<Route
							path="/"
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
					</Route>
				</Routes>
			</ThemeProvider>
		</>
	);
};

export default App;
