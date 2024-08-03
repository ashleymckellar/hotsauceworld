import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { UserContext } from './context/UserProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home.js';
import Header from './components/Header';
import SauceListContainer from './components/SauceListContainer.js';
import Search from './components/Search.js';
import Profile from './components/Profile';
import Details from './components/Details';
import RandomSauce from './components/RandomSauce.js';

function App() {
    const { token, logout } = useContext(UserContext);
    const [newSauce] = useState({});

    useEffect(() => {
        console.log(newSauce);
    }, [newSauce]);



    return (
        <div>
            <Router>
                <div className="app-background">
                    
                    {token && <Header />}

                    <Routes>
                        <Route
                            path="/"
                            element={
                                token ? <Navigate to="/profile" /> : <Home />
                            }
                        />

                        <Route
                            path="/saucelist"
                            element={
                                <ProtectedRoute token={token} redirectTo="/">
                                    <SauceListContainer />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute token={token} redirectTo="/">
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/search"
                            element={
                                <ProtectedRoute token={token} redirectTo="/">
                                    <Search />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/random"
                            element={
                                <ProtectedRoute token={token} redirectTo="/">
                                    <RandomSauce />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/saucelist/details/:sauceId"
                            element={
                                <ProtectedRoute token={token} redirectTo="/">
                                    <Details />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/profile/details/:sauceId"
                            element={
                                <ProtectedRoute token={token} redirectTo="/">
                                    <Details />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/search/details/:sauceId"
                            element={
                                <ProtectedRoute token={token} redirectTo="/">
                                    <Details />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
