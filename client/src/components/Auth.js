import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import AuthForm from './AuthForm.js'

const initInputs = { username: "", password: "", confirmPassword: ""}

export default function Auth() {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)
    const { signup, login, errMsg, resetAuthError } = useContext(UserContext)
    const [validationError, setValidationError] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    const minLength = 8
    const regex = new RegExp(`^.{${minLength},}$`)

    function handleChange(e) {
        const { name, value } = e.target
        
        if (name === "password" && !regex.test(value)) {
            setValidationError("Password must be at least 8 characters.")
        } else if (inputs.password !== inputs.confirmPassword) {
            setValidationError("Passwords do not match")
        } else {
            setValidationError("")
        }

        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e) {
        e.preventDefault()
        if (!regex.test(inputs.password)) {
            setValidationError("Password must be at least 8 characters.")
            return
        }
        signup(inputs)
        setIsSubmitted(true)
    }

    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
    }

    function toggleForm() {
        setToggle(prev => !prev)
        resetAuthError()
    }

    return (
        <div className='mx-auto row'>
            <AuthForm
                handleChange={handleChange}
                handleSubmit={toggle ? handleLogin : handleSignup}
                inputs={inputs}
                btnText={toggle ? "Log in" : "Sign up"}
                errMsg={errMsg}
                isSubmitted={isSubmitted}
                isMember={toggle}
            />
            <div className="text-center my-10">
                <button className="btn btn-danger custom-button" onClick={toggleForm}>
                    {toggle ? "Not a member?" : "Already a member?"}
                </button>
            </div>
            {validationError && <p style={{ color: "red" }}>{validationError}</p>}
        </div>
    )
}

