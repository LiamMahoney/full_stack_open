import React from 'react'

const LoginForm = (props) => {

    return (
        <div>
            <form onSubmit={props.loginHandler}>
                <div>
                    Username
                    <input
                        type="text"
                        value={props.username}
                        onChange={({ target }) => props.setUsername(target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                        type="password"
                        value={props.password}
                        onChange={({ target }) => props.setPassword(target.value)}
                    />
                </div>
                <button  type="submit">sign in</button>
            </form>
        </div>
    );
}

export default LoginForm;