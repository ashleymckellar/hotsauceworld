import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import AuthForm from './AuthForm.js';

const initInputs = { username: '', password: '', confirmPassword: '' };

export default function Auth() {
    const [inputs, setInputs] = useState(initInputs);
    const [toggle, setToggle] = useState(false);
    const { signup, login, errMsg, resetAuthError } = useContext(UserContext);
    const [validationError, setValidationError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const minLength = 8;
    const regex = new RegExp(`^.{${minLength},}$`);

    function handleChange(e) {
        const { name, value } = e.target;

        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    }

    function handleSignup(e) {
        e.preventDefault();
        if (!regex.test(inputs.password)) {
            setValidationError('Password must be at least 8 characters.');
            return;
        }
        signup(inputs);
        setIsSubmitted(true);
    }

    function handleLogin(e) {
        e.preventDefault();
        login(inputs);
    }

    function toggleForm() {
        setToggle((prev) => !prev);
        resetAuthError();
    }

    return (
        <div>
            <div>
                <AuthForm
                    handleChange={handleChange}
                    handleSubmit={toggle ? handleLogin : handleSignup}
                    inputs={inputs}
                    btnText={toggle ? 'Log in' : 'Sign up'}
                    errMsg={errMsg}
                    isSubmitted={isSubmitted}
                    isMember={toggle}
                />
            </div>
            <div className="member-flex">
                <div className="member-box">
                    <button className="member-button" onClick={toggleForm}>
                        {toggle ? 'Not a member?' : 'Already a member?'}
                    </button>
                </div>
            </div>
            <div className="validation-section">
                {validationError && (
                    <p style={{ color: 'red' }}>{validationError}</p>
                )}
                {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
            </div>
        </div>
    );
}
