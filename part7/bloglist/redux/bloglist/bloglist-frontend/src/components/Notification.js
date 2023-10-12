import { Alert } from 'react-bootstrap'

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  const style = {
    color: color,
  }

  return (
    <div className="notification" style={style}>
      <Alert variant="success">
        {message}
      </Alert>
    </div>
  )
}

export default Notification