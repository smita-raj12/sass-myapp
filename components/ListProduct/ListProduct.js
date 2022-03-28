import React from 'react'
import useWindowDimensions from '../../utilities/useWindowDimensions'
import Image from '../Image/Image'

// Bootstrap
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button';

// componets
import Title from '../Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default function ListProduct(props) {
    const { width } = useWindowDimensions();
    const imageURL = props.product.productImages ? props.product.productImages.edges[0] : "null";
    return (
        <div className='d-flex flex-column align-items-end h-100'>
            {width <= 767 ?
                <div className='d-flex w-100'>
                    <div className='d-flex justify-content-center align-items-center w-100 h-100 p-0 overflow-hidden'>
                    <a href={"/products" + props.product.uniformResourceLocator} className='text-decoration-none h-100 w-100'>
                            <Image alt={imageURL ? imageURL.node.alt : 'Product placeholder'} styles={{width: "100%", height: '120px', position: "relative"}} src={imageURL ? imageURL.node.contentUrl: "https://api.element-storm-cart.viewmynew.com/media/620586a983d39_thumbnail-placeholder.jpg"} />
                        </a>
                    </div>
                </div> : null}
            <div className='d-flex h-100 w-100'>
                {width >= 767 ?
                    <div className='d-flex justify-content-center align-items-center p-0 overflow-hidden' style={{ minWidth: "120px", minHeight: '120px' }}>
                        <a href={"/products" + props.product.uniformResourceLocator} className='text-decoration-none h-100 w-100'>
                            <Image alt={imageURL ? imageURL.node.alt : 'Product placeholder'} styles={{width: "120px", height: '100%', position: "relative"}} src={imageURL ? imageURL.node.contentUrl: "https://api.element-storm-cart.viewmynew.com/media/620586a983d39_thumbnail-placeholder.jpg"} />
                        </a>
                    </div> : null}
                <div className='p-0 w-100 flex-grow-1'>
                    <div className='p-2 w-100'>
                        <figure className='m-0'>
                            <blockquote className="blockquote">
                                <a href={"/products" + props.product.uniformResourceLocator} className='text-decoration-none'>
                                    <Title as={'h2'} Size={"h5"} Width="15" Name={props.product.title} />
                                </a>
                            </blockquote>
                            <figcaption className="figure-caption">
                                <a href={"/products" + props.product.uniformResourceLocator} className='text-decoration-none'>
                                    {props.product.shortDescription}
                                </a>
                            </figcaption>
                        </figure>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <Badges product={props.product} />
                            </div>
                        </div>
                    </div>
                </div>
                {width >= 767 ?
                <Button href={"/products" + props.product.uniformResourceLocator} className='d-flex justify-content-center align-items-center' variant="primary"><FontAwesomeIcon icon={faCartPlus}  size="3x" /></Button>
                : null}
            </div>
            {width <= 767 ?
                <Button href={"/products" + props.product.uniformResourceLocator} className='d-flex justify-content-center align-items-center w-100' variant="primary"><FontAwesomeIcon icon={faCartPlus}  size="3x" /></Button>
                : null}
        </div>
    )
}




function Badges(props) {
    return (
        <div className={props.setClsss ? props.setClsss : ''}>
            {props.product.origin ? <Badge className='m-1 p-2' pill bg="info">{props.product.origin}</Badge> : null}
            {props.product.typeOrganic ? <Badge className='m-1 p-2' pill bg="success">Organic</Badge> : null}
            {props.product.typeKosher ? <Badge className='m-1 p-2' pill bg="success">Kosher</Badge> : null}
            {props.product.typeUSASourced ? <Badge className='m-1 p-2' pill bg="success">USA Sourced</Badge> : null}
            {props.product.typeColdProcessed ? <Badge className='m-1 p-2' pill bg="success">Cold Processed</Badge> : null}
            {props.product.typeNonGMO ? <Badge className='m-1 p-2' pill bg="success">Non-GMO</Badge> : null}
            {props.product.typeWildcrafted ? <Badge className='m-1 p-2' pill bg="success">Wildcrafted</Badge> : null}
            {props.product.typeVirgin ? <Badge className='m-1 p-2' pill bg="success">Virgin</Badge> : null}
            {props.product.typeRefinedAndRBD ? <Badge className='m-1 p-2' pill bg="success">Refined And RBD</Badge> : null}


            {props.product.useHair ? <Badge className='m-1 p-2' pill bg="secondary">Hair</Badge> : null}
            {props.product.useFace ? <Badge className='m-1 p-2' pill bg="secondary">Face</Badge> : null}
            {props.product.useBody ? <Badge className='m-1 p-2' pill bg="secondary">Body</Badge> : null}
            {props.product.useSoap ? <Badge className='m-1 p-2' pill bg="secondary">Soap</Badge> : null}
            {props.product.useCandles ? <Badge className='m-1 p-2' pill bg="secondary">Candles</Badge> : null}
            {props.product.useLip ? <Badge className='m-1 p-2' pill bg="secondary">Lip</Badge> : null}
            {props.product.useBath ? <Badge className='m-1 p-2' pill bg="secondary">Bath</Badge> : null}
        </div>
    )
}
