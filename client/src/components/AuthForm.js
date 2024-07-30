import React from 'react'

export default function AuthForm(props) {
    const {
        handleChange,
        handleSubmit,
        btnText,
        errMsg,
        isSubmitted,
        isMember,
        inputs: {
            username,
            password,
            confirmPassword
        }
    } = props

    const minLength = 8

    function minLengthTest(inputString) {
        let regex = new RegExp(`^.{${minLength},}$`)
        return regex.test(inputString)
    }

    // Check if password meets minimum length requirement
    const isPasswordValid = minLengthTest(password)
    // Check if password and confirmPassword match
    const doPasswordsMatch = password === confirmPassword
    // Check if there are any errors
    const isDisabled = !(isPasswordValid && doPasswordsMatch)

    const passwordError = isSubmitted && !isPasswordValid ? "Password must be at least 8 characters." : ""
    const confirmPasswordError = isSubmitted && !doPasswordsMatch ? "Passwords do not match." : ""

    return (
        <form onSubmit={handleSubmit} className='mx-auto row g-3'>
            {!isMember ? (
                <>
                    <div className='col-12'>
                        <input className='sign-in-form'
                            type="text"
                            value={username}
                            name="username"
                            onChange={handleChange}
                            placeholder="Username" />
                        <br></br>
                        <br></br>
                    </div>
                    <div className='col-12'>
                        <input className='sign-in-form'
                            type="password"
                            value={password}
                            name="password"
                            onChange={handleChange}
                            placeholder='Password' />
                        <br></br>
                        <br></br>
                    </div>
                    <div className='col-12'>
                        <input className='sign-in-form'
                            type="password"
                            value={confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                            placeholder='Confirm Password' />
                        <br></br>
                        <br></br>
                    </div>
                </>
            ) : (
                <>
                    <div className='col-12'>
                        <input className='sign-in-form'
                            type="text"
                            value={username}
                            name="username"
                            onChange={handleChange}
                            placeholder="Username" />
                        <br></br>
                        <br></br>
                    </div>
                    <div className='col-12'>
                        <input className='sign-in-form'
                            type="password"
                            value={password}
                            name="password"
                            onChange={handleChange}
                            placeholder='Password' />
                        <br></br>
                        <br></br>
                    </div>
                </>
            )}
            <div className="text-center my-10">
                <button disabled={isDisabled} type="submit" className="btn btn-danger">{btnText}</button>
            </div>
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            {confirmPasswordError && <p style={{ color: "red" }}>{confirmPasswordError}</p>}
            <p style={{ color: "red" }}>{errMsg}</p>
        </form>
    )
}
