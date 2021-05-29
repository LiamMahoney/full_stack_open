const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }

    if (type !== 'error' && type !== 'success') {
        throw Error('unsupported notification type');
    }
  
    return (
      <div className={type}>
        {message}
      </div>
    )
  }

  export default Notification;