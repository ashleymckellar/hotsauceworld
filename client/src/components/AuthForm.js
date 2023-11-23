import React, { useState, useContext} from 'react'
import { UserContext } from '../context/UserProvider'

export default function AuthForm(props){
    const {
        handleChange,
        handleSubmit,
        onBlur,
        btnText,
        errMsg,
        isSubmitted,
        inputs: {
            username,
            password
        }
    } = props


    let minLength = 8
    let regex = new RegExp(`^.{${minLength},}$`)

    function minLengthTest (inputString){
        let minLength = 8
        let regex = new RegExp(`^.{${minLength},}$`)
        return regex.test(inputString)
    }

   
    const isDisabled = !(minLengthTest(password))
    const passwordError = isSubmitted && !isDisabled ? "Password must be at least 8 characters." : ""
    return (
        <form onSubmit={handleSubmit} className='mx-auto row g-3'>
            <div className='col-12'>
                <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={handleChange}
                    placeholder="Username"/>
                    <br></br>
                    <br></br>
            </div>
            <div className='col-12'>
                <input 
                    type="password"
                    value={password}
                    name="password"
                    onChange={handleChange}
                
                    placeholder='Password'/>
                    <br></br>
                    <br></br>
            </div>
            <div class="text-center my-10">
                <button disabled={isDisabled} type="submit" class="btn btn-danger">{ btnText }</button>
            </div>
            {passwordError && <p style={{ color: "red"}}>{passwordError}</p>}
            <p style={{color: "red"}}>{ errMsg }</p>
        </form>
    )
}