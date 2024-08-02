import React, { useState } from 'react';

export default function AuthForm(props) {
    const {
        handleChange,
        handleSubmit,
        btnText,
        errMsg,
        isSubmitted,

        isMember,
        inputs: { username, password, confirmPassword },
    } = props;

    const minLength = 8;
    const [isFocused, setIsFocused] = useState(true);

    function minLengthTest(inputString) {
        let regex = new RegExp(`^.{${minLength},}$`);
        return regex.test(inputString);
    }

    function handleBlur(e) {
        setIsFocused((prev) => !prev);
    }

    console.log(isMember);
    console.log(password);
    console.log(confirmPassword);
    const isPasswordValid = minLengthTest(password);
    console.log(errMsg);

    const doPasswordsMatch = password === confirmPassword;

    console.log(doPasswordsMatch);
    console.log(isPasswordValid);

    const isDisabled = !(isMember && isPasswordValid && !doPasswordsMatch);

    const passwordError =
        !isMember && !isPasswordValid && !isFocused
            ? 'Password must be at least 8 characters.'
            : '';
    const confirmPasswordError = !isFocused ? 'Passwords do not match.' : '';

    return (
        <form onSubmit={handleSubmit} className="mx-auto row g-3">
            {!isMember ? (
                <>
                    <div className="col-12 flex">
                        <input
                            className="sign-in-form"
                            type="text"
                            value={username}
                            name="username"
                            onChange={handleChange}
                            placeholder="Username"
                        />
                    </div>
                    <div className="col-12 flex">
                        <input
                            className="sign-in-form"
                            type="password"
                            value={password}
                            name="password"
                            onChange={handleChange}
                            // onBlur={handleBlur}
                            placeholder="Password"
                        />
                    </div>
                    <div className="col-12">
                        <input
                            className="sign-in-form"
                            type="password"
                            value={confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Confirm Password"
                        />

                        {passwordError && (
                            <p style={{ color: 'red' }}>{passwordError}</p>
                        )}
                        {!doPasswordsMatch && !isMember && (
                            <p style={{ color: 'red' }}>
                                {confirmPasswordError}
                            </p>
                        )}
                        {/* <p style={{ color: "red" }}>{errMsg}</p> */}
                    </div>
                </>
            ) : (
                <>
                    <div className="col-12">
                        <input
                            className="sign-in-form"
                            type="text"
                            value={username}
                            name="username"
                            onChange={handleChange}
                            placeholder="Username"
                        />
                    </div>
                    <div className="col-12">
                        <input
                            className="sign-in-form"
                            type="password"
                            value={password}
                            name="password"
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </div>
                </>
            )}
            <div className="flex flex-col">
                <div className="text-center mt-10">
                    <button
                        disabled={isDisabled}
                        type="submit"
                        className="btn btn-danger"
                    >
                        {btnText}
                    </button>
                </div>
            </div>
        </form>
    );
}
