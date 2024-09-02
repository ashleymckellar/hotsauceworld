import React, { useState } from 'react';
import axios from 'axios';
export const UserContext = React.createContext();
const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        sauces: [],
        errMsg: '',
    };

    const [userState, setUserState] = useState(initState);
    // const [profileSauceState, setProfileSauceState] = useState({})
    const [hotSauces, setHotSauces] = useState([]);
    const [userSaucesState, setUserSaucesState] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hotSauceById, setHotSauceById] = useState({});
    const [theRandomSauce, setTheRandomSauce] = useState({});
    const [loading, setLoading] = useState(true);

    function signup(credentials) {
        axios
            .post('auth/signup', credentials)
            .then((res) => {
                const { user, token } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setUserState(
                    (prevUserState) => ({
                        ...prevUserState,
                        user,
                        token,
                    }),
                    setIsSubmitted(true),
                );
            })
            .catch((err) => handleAuthError(err.response.data.errMsg));
    }

    function login(credentials) {
        axios
            .post('/auth/login', credentials)
            .then((res) => {
                const { user, token } = res.data;
            
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                getSauce();
                setUserState(
                    (prevUserState) => ({
                        ...prevUserState,
                        user,
                        token,
                    }),
                    setIsSubmitted(true),
                );
            })
            .catch((err) => handleAuthError(err.response.data.errMsg));
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserState({
            user: {},
            token: '',
            sauces: [],
        });
    }

    function handleAuthError(errMsg) {
        setUserState((prevState) => ({
            ...prevState,
            errMsg,
        }));
        console.log(errMsg)
    }

    function resetAuthError() {
        setUserState((prevState) => ({
            ...prevState,
            errMsg: '',
        }));
    }

    async function getUserSauces() {
        try {
            const response = await userAxios.get('/api/sauce/user');
            const userSaucesData = response.data;

            setUserState((prevState) => ({
                ...prevState,
                sauces: userSaucesData,
            }));
            const userSaucesArray = [...userSaucesData];
            setUserSaucesState(userSaucesArray);
        } catch (error) {
            console.error('error fetching user sauces', error);
            setLoading(false);
        }
    }

    async function addComment(hotSaucesId, newComment) {
        try {
            const response = await userAxios.post(
                `api/comment/${hotSaucesId}`,
                newComment,
            );

            const updatedSauces = hotSauces.map((sauce) => {
                if (sauce._id === hotSaucesId) {
                    sauce.comments.push(response.data);
                }
                return sauce;
            });
            setHotSauces(updatedSauces);
            getSauce();
        } catch (err) {
            console.log(err);
        }
    }

    //gets all sauces
    function getSauce() {
        userAxios
            .get('/api/sauce', { params: { timestamp: Date.now() } })
            .then((response) => setHotSauces(response.data))
            .catch((error) => console.log(error));
    }

    //gets a single sauce based on its ID

    async function getSauceById(_id) {
        try {
            const response = await userAxios.get(`api/item/${_id}`);
            const itemData = response.data;
            setHotSauceById(itemData);
        } catch (error) {
            console.error('error fetching item', error);
        }
    }

    async function getRandomSauce() {
        try {
            const response = await userAxios.get(`api/sauce/random`);
            const randomSauce = response.data;
            setTheRandomSauce(randomSauce);
            
        } catch (error) {
            console.error('error getting random sauce', error);
        }
    }

   

    function addSauce(newSauce) {
    
        userAxios
            .post('/api/sauce', newSauce)
            .then((response) => {
                getSauce();
            })
            .catch((error) => console.log(error));
    }

    return (
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
                addSauce,
                resetAuthError,
                hotSauces,
                setHotSauces,
                getSauce,
                getUserSauces,
                getRandomSauce,
                theRandomSauce,
                userSaucesState,
                setUserSaucesState,
                addComment,
                isSubmitted,
                setIsSubmitted,
                getSauceById,
                hotSauceById,
                setHotSauceById,
                loading
                
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
