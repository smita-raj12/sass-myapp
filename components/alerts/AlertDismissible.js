import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Alert'

function AlertDismissible(props) {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant={props.color} onClose={() => setShow(false)} dismissible>
            {props.heading && <Alert.Heading>{props.heading}</Alert.Heading>}
            {props.content && <p className="p-0 m-0">{props.content}</p>}
        </Alert>
      );
    }
    return <noscript />;
}

AlertDismissible.propTypes = {
    color: PropTypes.string,
    heading: PropTypes.string,
    content: PropTypes.string
}

export default AlertDismissible

