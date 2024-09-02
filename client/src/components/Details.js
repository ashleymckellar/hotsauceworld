import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import pepper from '../assets/chilipepper.jpg';
import axios from 'axios';

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

function Details(props) {
    const { sauceId } = useParams();
    // const { addComment, hotSauces } = useContext(UserContext);
    // const [foundSauce, setFoundSauce] = useState({});
    // const [formData, setFormData] = useState({
    //     comment: '',
    // });

    // const [showForm, setShowForm] = useState(false);
    const [hotSauceById, setHotSauceById] = useState({});

  

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!formData.comment) {
    //         console.log('Comment text is required.');
    //         return;
    //     }
    //     const newComment = {
    //         comment: formData.comment,
    //         sauce: sauceId,
    //     };
    //     console.log('sauceId', newComment);
        
    //     addComment(sauceId, newComment);

    //     console.log('comment submitted!');
    //     setFormData({ comment: '' });
    // };

 

    // const handleClick = () => {
    //     setShowForm(true);
    // };

    // const handleChange = (e) => {
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [e.target.name]: e.target.value,
    //     }));
    // };

  

    async function getSauceById(sauceId) {
        try {
            const response = await userAxios.get(`/api/item/${sauceId}`);
            const itemData = response.data;
            
            setHotSauceById(itemData);
        } catch (error) {
            console.error('error fetching item', error);
        }
    }

    useEffect(() => {
        getSauceById(sauceId);
    }, [sauceId]);

  
    
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div
                className="d-flex flex-column justify-content-center align-items-center mt-5"
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    borderRadius: '20px',
                    backgroundColor: '#E55139',
                    padding: '5vh',
                }}
            >
                <div className="d-flex flex-column justify-content-center align-items-center gap-3 p-5 m-3">
                    <h3 className="details-title">
                        {!!hotSauceById && hotSauceById.name}
                    </h3>
                    <img
                        src={hotSauceById.imageUrl || pepper}
                        alt=""
                        className="details-pic img-fluid. max-width: 100% m-4;"
                    />
                    <div
                        className="d-flex flex-column align-items-center p-4"
                        style={{
                            borderRadius: '20px',
                            width: '100%',
                            maxWidth: '500px',
                            border: 'none',
                            backgroundColor: '#FED7B2',
                        }}
                    >
                        <h5 className="details-text">
                            Origin: {!!hotSauceById && hotSauceById.origin}
                        </h5>
                        <h5 className="details-text">
                            Heat Rating (Scoville Units):{' '}
                            {!!hotSauceById && hotSauceById.heatRating}
                        </h5>
                        <h5 className="details-text">
                            Description:{' '}
                            {!!hotSauceById && hotSauceById.description}
                        </h5>
                        <h5 className="details-text">
                            Ingredients:{' '}
                            {!!hotSauceById && hotSauceById.ingredients}
                        </h5>
                    </div>
                </div>
                <h3 className="details-title">User Comments</h3>
                <div className="random-comment-section">
                    <ul>
                        {hotSauceById &&
                        Array.isArray(hotSauceById.comments) &&
                        hotSauceById.comments.length !== 0 ? (
                            hotSauceById.comments.map((comment) => (
                                <li
                                    className="comment-bubble"
                                    key={comment._id}
                                >
                                    <p>{comment.comment}</p>
                                </li>
                            ))
                        ) : (
                            <li className="no-comments-text">
                                No comments posted yet.
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Details;
