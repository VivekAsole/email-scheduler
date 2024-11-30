import { useState } from "react"
import { useStore } from "../../store/StoreContext"

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formUserData, setFormUserData] = useState({
        email: '',
        username: '',
        password: ''
    })
    const { setUser, setisAuthenticated, setLoader_msg } = useStore()

    const { username, email, password } = formUserData

    const handleLogin = async (email, password) => {
        setLoader_msg("Login attempting...")
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to login');
            }

            const userData = await response.json();
            setUser(userData.user); // Update the store with the logged-in user's data
            setisAuthenticated(true)
        } catch (error) {
            console.error('Error during login:', error.message);
            alert(error.message);
        } finally {
            setTimeout(() => {
                setLoader_msg(null)
            }, 1000);
        }
    };

    const handleRegister = async (username, email, password,) => {
        setLoader_msg("Registration processing...")
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to register');
            }
            alert('Registration successful. Login now');
        } catch (error) {
            console.error('Error during registration:', error.message);
            alert(error.message);
        } finally {
            setTimeout(() => {
                setLoader_msg(null)
            }, 1000);
        }
    };

    return (
        <div className="flex justify-center items-center h-full bg-black">
            <div className="w-96 p-8 bg-gradient-to-b from-blue-600 via-purple-500 to-pink-400 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-center text-white">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>
                <form
                    className="mt-4 text-sm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        isLogin ? handleLogin(email, password) : handleRegister(username, email, password);
                    }}
                >
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-white text-sm font-medium mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) =>
                                    setFormUserData({ ...formUserData, username: e.target.value })
                                }
                                className="w-full px-4 py-2 bg-white/70 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your unique username"
                            />
                        </div>
                    )}
                    <div className="mb-2">
                        <label className="block text-white text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) =>
                                setFormUserData({ ...formUserData, email: e.target.value })
                            }
                            className="w-full px-4 py-2 bg-white/70 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) =>
                                setFormUserData({ ...formUserData, password: e.target.value })
                            }
                            className="w-full px-4 py-2 bg-white/70 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-white">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-slate-600 hover:text-indigo-500 font-bold underline"
                        >
                            {isLogin ? "Sign Up" : "Login"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
