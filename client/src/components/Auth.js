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

    console.log(inputs.password)
    console.log(inputs.confirmPassword)

    function handleChange(e) {
        const { name, value } = e.target
        
        // if (name === "password" && !regex.test(value)) {
        //     setValidationError("Password must be at least 8 characters.")
        
        // } else {
        //     setValidationError("")
        // }

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
        <div className='flex gap-4'>
            <div className='basis-1/2'>
            <AuthForm
                handleChange={handleChange}
                handleSubmit={toggle ? handleLogin : handleSignup}
                inputs={inputs}
                btnText={toggle ? "Log in" : "Sign up"}
                errMsg={errMsg}
                
                isSubmitted={isSubmitted}
                isMember={toggle}
            />
            </div>
            <div className='basis-1/2'>
                <button className="btn btn-danger custom-button mt-4" onClick={toggleForm}>
                    {toggle ? "Not a member?" : "Already a member?"}
                </button>
            </div >
            {validationError && <p style={{ color: "red" }}>{validationError}</p>}
        </div>
    )
}

