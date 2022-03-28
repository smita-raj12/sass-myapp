import React from 'react';

import { gql, useMutation } from '@apollo/client';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import useWindowDimensions from '../../utilities/useWindowDimensions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faDumpster, faMinus, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

import Image from '../Image/Image';

const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($input: updateCartItemInput!) {
    updateCartItem(input: $input) {
      clientMutationId
      cartItem {
        id
      }
    }
  }
`;
const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($input: deleteCartItemInput!) {
    deleteCartItem(input: $input) {
      clientMutationId
      cartItem {
        id
      }
    }
  }
`;

function Item(props) {
  const { width } = useWindowDimensions();

  const [UpdateCartItem, { loading: LOADINGUPDATE }] = useMutation(UPDATE_CART_ITEM);
  const [DeleteCartItem, { loading: LOADINGDELETE }] = useMutation(DELETE_CART_ITEM);

  function AddRemoveItem(Type) {
    let QTY = props.cartItem.node.quantity;
    if (Type === "Remove") {
      if (QTY <= 1) {
        DeleteItem();
      } else {
        UpdateItem(QTY - 1);
      }
    } else if (Type === "Add") {
      UpdateItem(QTY + 1);
    } else {
      console.log(err);
    }
  }

  function UpdateItem(data) {
    UpdateCartItem({
      variables: {
        input: {
          id: props.cartItem.node.id,
          quantity: data
        }
      },
      onError: (err) => {
        console.log(err);
      },
      onCompleted: (data) => {
        console.log(data);
        props.refetch();
      }
    });
  }

  function DeleteItem() {
    DeleteCartItem({
      variables: {
        input: {
          id: props.cartItem.node.id
        }
      },
      onError: (err) => {
        console.log(err);
      },
      onCompleted: (data) => {
        console.log(data);
        props.refetch();
      }
    });
  }

  return (
    <Col sm={12} className='border border-primary my-2 rounded-3 overflow-hidden p-0'>
      <div className='d-flex h-100'>
        {/* {width >= 500 ?
          <div className='d-flex justify-content-center align-items-center p-0 overflow-hidden' style={{ minWidth: "120px", minHeight: '120px' }}>
            {props.imageURL ?
              <div className='overflow-hidden position-relative' style={{ width: "120px", height: '120px' }}>
                <img className="w-auto h-100 position-absolute top-50 start-50 translate-middle" src={props.imageURL.node.contentUrl ? props.imageURL.node.contentUrl : ""} alt={props.imageURL.node.alt ? props.imageURL.node.alt : ''} />
              </div> :
              <div className='overflow-hidden position-relative' style={{ width: "120px", height: '120px' }}>
                <img className="w-auto h-100 position-absolute top-50 start-50 translate-middle" src={'/images/thumbnail-placeholder.jpg'} alt={"Place Holder"} />
              </div>}
          </div> : null} */}
          {width >= 500 ?
                    <div className='d-flex justify-content-center align-items-center p-0 overflow-hidden' style={{ minWidth: "120px", minHeight: '120px' }}>
                        <a href={"/products" + props.cartItem.node.product.uniformResourceLocator} className='text-decoration-none h-100 w-100'>
                            <Image alt={props.imageURL.node.alt ? props.imageURL.node.alt : 'Product placeholder'} styles={{width: "120px", height: '100%', position: "relative"}} src={props.imageURL.node.contentUrl ? props.imageURL.node.contentUrl: "https://api.element-storm-cart.viewmynew.com/media/620586a983d39_thumbnail-placeholder.jpg"} />
                        </a>
                    </div> : null}
        <div className='p-0 w-100 flex-grow-1'>
          <div className='p-2 w-100'>
            <figure className='m-0'>
              <blockquote className="blockquote">
                <h2 className='h6'>{props.cartItem.node.product.title}</h2>
              </blockquote>
              <figcaption className="blockquote-footer">
                {props.cartItem.node.attributes.title}
              </figcaption>
            </figure>
            <div className='d-flex justify-content-between flex-wrap'>
              <div className='d-flex align-items-center w-100'>
              {width <= 500 ?
                <div className='d-flex w-100'>
                    <div className='d-flex justify-content-center align-items-center w-100 h-100 p-0 overflow-hidden'>
                    <a href={"/products" + props.cartItem.node.product.uniformResourceLocator} className='text-decoration-none h-100 w-100'>
                            <Image alt={props.imageURL.node.alt ? props.imageURL.node.alt : 'Product placeholder'} styles={{width: "100%", height: '120px', position: "relative"}} src={props.imageURL.node.contentUrl ? props.imageURL.node.contentUrl: "https://api.element-storm-cart.viewmynew.com/media/620586a983d39_thumbnail-placeholder.jpg"} />
                        </a>
                    </div>
                </div> : null}
                {/* {width <= 500 ?
                  <div className='d-flex justify-content-center align-items-center w-auto h-100 p-0 overflow-hidden' style={{ width: "60px", height: '60px' }}>
                    {props.imageURL ?
                      <div className='overflow-hidden position-relative' style={{ width: "60px", height: '60px' }}>
                        <img className="w-auto h-100 position-absolute top-50 start-50 translate-middle" src={props.imageURL.node.contentUrl ? props.imageURL.node.contentUrl : ""} alt={props.imageURL.node.alt ? props.imageURL.node.alt : ''} />
                      </div> :
                      <div className='overflow-hidden position-relative' style={{ width: "60px", height: '60px' }}>
                        <img className="w-auto h-100 position-absolute top-50 start-50 translate-middle" src={'/images/thumbnail-placeholder.jpg'} alt={"Place Holder"} />
                      </div>}
                  </div>
                  : null} */}
                <div>
                  {props.cartItem.node.product.origin ? <Badge className='m-1 p-1' pill bg="info">{props.cartItem.node.product.origin}</Badge> : null}
                  {props.cartItem.node.product.useByHairCare ? <Badge className='m-1 p-1' pill bg="success">Hair Care</Badge> : null}
                  {props.cartItem.node.product.useByBodyCare ? <Badge className='m-1 p-1' pill bg="success">Body Care</Badge> : null}
                  {props.cartItem.node.product.useByFaceCare ? <Badge className='m-1 p-1' pill bg="success">Face Care</Badge> : null}
                  {props.cartItem.node.product.useByLipCare ? <Badge className='m-1 p-1' pill bg="success">Lip Care</Badge> : null}
                  {props.cartItem.node.product.useBySoap ? <Badge className='m-1 p-1' pill bg="success">Soap</Badge> : null}
                  {props.cartItem.node.product.typeOrganic ? <Badge className='m-1 p-1' pill bg="secondary">Organic</Badge> : null}
                  {props.cartItem.node.product.typeKosher ? <Badge className='m-1 p-1' pill bg="secondary">Kosher</Badge> : null}
                  {props.cartItem.node.product.typeNonDeodorized ? <Badge className='m-1 p-1' pill bg="secondary">Non-Deodorized</Badge> : null}
                  {props.cartItem.node.product.typeUnrefined ? <Badge className='m-1 p-1' pill bg="secondary">Unrefined</Badge> : null}
                  {props.cartItem.node.product.typeDoubleRefined ? <Badge className='m-1 p-1' pill bg="secondary">Double Refined</Badge> : null}
                  {props.cartItem.node.product.typeVirgin ? <Badge className='m-1 p-1' pill bg="secondary">Virgin</Badge> : null}
                  {props.cartItem.node.product.typeSoyFree ? <Badge className='m-1 p-1' pill bg="secondary">Soy Free</Badge> : null}
                  {props.cartItem.node.product.typeUspGrade ? <Badge className='m-1 p-1' pill bg="secondary">USP Grade</Badge> : null}
                  {props.cartItem.node.product.typeNonGMO ? <Badge className='m-1 p-1' pill bg="secondary">Non-GMO</Badge> : null}
                  {props.cartItem.node.product.typeVegetable ? <Badge className='m-1 p-1' pill bg="secondary">Vegetable</Badge> : null}
                  {props.cartItem.node.product.typeHalal ? <Badge className='m-1 p-1' pill bg="secondary">Halal</Badge> : null}
                  {props.cartItem.node.product.typeKOS ? <Badge className='m-1 p-1' pill bg="secondary">KOS</Badge> : null}
                  {props.cartItem.node.product.typeExtraVirgin ? <Badge className='m-1 p-1' pill bg="secondary">Extra Virgin</Badge> : null}
                  {props.cartItem.node.product.typeRSPO ? <Badge className='m-1 p-1' pill bg="secondary">RSPO</Badge> : null}
                  {props.cartItem.node.product.typeCRU ? <Badge className='m-1 p-1' pill bg="secondary">CRU</Badge> : null}
                  {props.cartItem.node.product.typeRBD ? <Badge className='m-1 p-1' pill bg="secondary">RBD</Badge> : null}
                  {props.cartItem.node.product.typeNonBioengineer ? <Badge className='m-1 p-1' pill bg="secondary">Non-Bioengineer</Badge> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex flex-column justify-content-between align-items-center' style={{ maxWidth: "120" }}>
          <div>Price: ${props.cartItem.node.attributes.price.toFixed(2)}</div>
          <div>Qty: {props.cartItem.node.quantity}</div>
          <div>Total: ${(props.cartItem.node.quantity * props.cartItem.node.attributes.price).toFixed(2)}</div>
          <ButtonGroup aria-label="Basic example">
            {LOADINGUPDATE ?
              <Button variant="primary" disabled><FontAwesomeIcon icon={faSpinner} spin /></Button> :
              <Button variant="primary" onClick={() => AddRemoveItem("Add")}><FontAwesomeIcon icon={faPlus} /></Button>}
            {LOADINGDELETE ?
              <Button variant="danger" disabled><FontAwesomeIcon icon={faSpinner} spin /></Button> :
              <Button variant="danger" onClick={() => DeleteItem()}><FontAwesomeIcon icon={faDumpster} /></Button>}
            {LOADINGUPDATE ?
              <Button variant="warning" disabled><FontAwesomeIcon icon={faSpinner} spin /></Button> :
              <Button variant="warning" onClick={() => AddRemoveItem("Remove")}><FontAwesomeIcon icon={faMinus} /></Button>}
            <Button variant="info" href={"/products" + props.cartItem.node.product.uniformResourceLocator}><FontAwesomeIcon icon={faInfoCircle} /></Button>
          </ButtonGroup>
        </div>
      </div>
    </Col>
  );
}

export default Item;
