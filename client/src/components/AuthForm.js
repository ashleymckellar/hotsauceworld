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

    function handleBlur() {
        setIsFocused(false);
    }

    const isPasswordValid = minLengthTest(password);

    const doPasswordsMatch = password === confirmPassword;

    const isDisabled = !isMember
        ? !isPasswordValid || !doPasswordsMatch
        : !isPasswordValid;

    const passwordError =
        !isMember && !isPasswordValid && !isFocused
            ? 'Password must be at least 8 characters.'
            : '';
    const confirmPasswordError =
        !isMember && !doPasswordsMatch && !isFocused
            ? 'Passwords do not match.'
            : '';

    return (
        <div className="login-flex">
            <div className="login-box">
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
                                    onBlur={handleBlur}
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
                                    <p style={{ color: 'white' }}>
                                        {passwordError}
                                    </p>
                                )}
                                {confirmPasswordError && (
                                    <p style={{ color: 'white' }}>
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
                    <div className="flex flex-col gap-4">
                        <div className="text-center mt-10">
                            <button
                                disabled={isDisabled}
                                type="submit"
                                className="login-button"
                            >
                                {btnText}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
