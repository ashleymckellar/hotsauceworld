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
    // const { name, origin, heatRating, description, ingredients, imageUrl, comments, _id } = props
    const { sauceId } = useParams();
    const { addComment, hotSauces } = useContext(UserContext);
    const [foundSauce, setFoundSauce] = useState({});
    const [formData, setFormData] = useState({
        comment: '',
    });
    // const hotSaucesId = foundSauce._id
    const [showForm, setShowForm] = useState(false);
    const [hotSauceById, setHotSauceById] = useState({});

    console.log(sauceId);
    console.log(hotSauceById);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.comment) {
            console.log('Comment text is required.');
            return;
        }
        const newComment = {
            comment: formData.comment,
            sauce: sauceId,
        };
        console.log('sauceId', newComment);
        // console.log(hotSaucesId)
        // console.log(foundSauce)
        addComment(sauceId, newComment);

        console.log('comment submitted!');
        setFormData({ comment: '' });
    };

    // console.log(hotSauces)
    // console.log(foundSauce)

    const handleClick = () => {
        setShowForm(true);
    };

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    // useEffect(() => {
    //     const sauce = hotSauces.find((salsa) => salsa._id === sauceId);
    //     setFoundSauce(sauce);
    // }, [hotSauces, setFoundSauce]);

    async function getSauceById(sauceId) {
        try {
            const response = await userAxios.get(`/api/item/${sauceId}`);
            const itemData = response.data;
            console.log('item data', itemData);
            setHotSauceById(itemData);
        } catch (error) {
            console.error('error fetching item', error);
        }
    }

    useEffect(() => {
        getSauceById(sauceId);
    }, [sauceId]);

    // console.log(foundSauce);
    return (
        <div className="details-main">
        <div className="details-div">
            <div className="details-container">
                <h3>{!!hotSauceById && hotSauceById.name}</h3>
                <img src={hotSauceById.imageUrl || pepper} alt="" className="details-pic" />
                <div className="details-text-div">
                    <h5>Origin: {!!hotSauceById && hotSauceById.origin}</h5>
                    <h5>Heat Rating (Scoville Units): {!!hotSauceById && hotSauceById.heatRating}</h5>
                    <h5>Description: {!!hotSauceById && hotSauceById.description}</h5>
                    <h5>Ingredients: {!!hotSauceById && hotSauceById.ingredients}</h5>
                </div>
            </div>
            <h3>Comments</h3>
            <div className="comment-container">
                
                <ul>
                    {hotSauceById && Array.isArray(hotSauceById.comments) ? (
                        hotSauceById.comments.map((comment) => (
                            <li className="comment-bubble" key={comment._id}>
                                <p>{comment.comment}</p>
                            </li>
                        ))
                    ) : (
                        <li>No comments available.</li>
                    )}
                </ul>
            </div>
        </div>
    </div>
    )
}

export default Details;
