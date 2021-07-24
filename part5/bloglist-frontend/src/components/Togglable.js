import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = {display: visible ? '' : 'none' };

    const toggleVisbility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisbility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisbility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisbility}>cancel</button>
            </div>
        </div>
    )
})

export default Togglable;