/* eslint-disable no-unused-vars */
const Notification = ({newName, message, setMessage}) => {

    const activeStyle = {
        display: 'block',
        minHeight: '3em',
        padding: '1em',
        color: 'green',
        backgroundColor: 'gray',
        boxSizing: 'border-box',
        border: '3px solid green',
        visibility: 'visible',
        overflow: 'visible',
        marginBottom: '1em'
    },

    inactiveStyle = {
        visibility: 'hidden',
        overflow: 'hidden'
    },    
    errorStyle = {
        display: 'block',
        minHeight: '3em',
        padding: '1em',
        color: 'red',
        backgroundColor: 'gray',
        boxSizing: 'border-box',
        border: '3px solid red',
        visibility: 'visible',
        overflow: 'visible',
        marginBottom: '1em'
    }

    if (message != null) {
        setTimeout(() => { 
            setMessage(null)
            }, 3500)
    }

    if (message === `Error: ${newName}'s information was not found on server`) {
        return (
        <div id="notification-box" style={errorStyle}>
            {message}
        </div>
        )
    }
    
    return (
        <div id="notification-box" style={message ? activeStyle : inactiveStyle}>
            {message}
        </div>
    )

}

export default Notification

