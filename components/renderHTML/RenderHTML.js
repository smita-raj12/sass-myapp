import React from 'react'

export default function RenderHTML(props) {
    return (
        <div dangerouslySetInnerHTML={{__html: props.html}}></div>
    )
}
