const Notification = ({ message, color }) => {
    if (message === null) {
      return null
    }

    const style = {
      color: color,
    }
  
    return (
      <div className="success" style={style}>
        {message}
      </div>
    )
  }
  
  export default Notification