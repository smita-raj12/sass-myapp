import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function Subscribe(props) {

    return (
        <Form >
            <InputGroup>
                <FormControl
                    placeholder="ABC@abc.com"
                    aria-label="Subscribe For Exclusive Offers"
                    aria-describedby="Subscribe For Exclusive Offers"
                    size="sm"
                />
                <Button variant={props.buttonColor} size="sm">
                    Subscribe
                </Button>
            </InputGroup>
        </Form>
    )
}

export default Subscribe;