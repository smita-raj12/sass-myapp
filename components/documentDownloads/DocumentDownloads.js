import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default function DocumentDownloads(props) {
    let ProductDocument = [];
    if (props.Document) {
        // console.log(props.Document);
        ProductDocument = props.Document.edges.map(function (document, key) {
            return (
                <Col sm={12} md={6} key={key}>
                    <div className="d-grid gap-2 p-2">
                    <ButtonGroup>
                        <Button href={document.node.contentUrl} variant="outline-light">{document.node.name} Documnet <i className="far fa-save"></i></Button>
                    </ButtonGroup>
                    </div>
                </Col>
            )
        }
        );
    }
    return (
        <Container>
            <h3>Document Downloads</h3>
            <Row>
                {ProductDocument}
            </Row>
        </Container>
    )
}
