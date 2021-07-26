import React from 'react';

const Notification = (props) => {

    const notificationStyle = props.notification && props.notification.type === 'error' ?
    {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    } :
    {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (props.notification) {
        return (
            <div style={notificationStyle} className="{props.notification.type}">
                {props.notification.message}
            </div>
        )
    } else {
        return null;
    }
}

export default Notification;