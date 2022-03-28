import React from 'react'

import Form from 'react-bootstrap/Form';

function Switch(props) {
    let Bool = props.GetBool;
    let Label = props.Label;
    return (
        <Form.Check
            type="switch"
            label={Label}
            id={Label + "Switch"}
            onChange={() => props.setBool(Bool => !Bool)}
            checked={Bool}
        />
    );
}

export default Switch;