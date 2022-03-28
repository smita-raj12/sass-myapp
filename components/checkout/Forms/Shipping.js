import React, { useState } from 'react';
// import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

import Form from 'react-bootstrap/Form'


const GET_SHIPPING_ESTIMATE = gql`
query estimatesShipping{
    estimatesShipping{
        id
        _id
        data
        token
        oldCart
        boxes
        fees
        shippingCodes
    }
  }
`;

const UPDATE_SHIPPING_CODE = gql`
mutation UpdateShippingCodeCart($input: updateShippingCodeCartInput!) {
    updateShippingCodeCart(input: $input) {
      cart {
        id
        shippingOption
      }
    }
  }
`;

export default function Shipping(props) {
    const { data, loading, error } = useQuery(GET_SHIPPING_ESTIMATE, {
        pollInterval: 1000,
    });
    const [UpdateShippingCode, { loading: codeChangeLoading }] = useMutation(UPDATE_SHIPPING_CODE);


    function changeShippingCode(code) {
        UpdateShippingCode({
            variables: {
                input: {
                    code: code,
                }
            },
            onError: (err) => {
                props.refetchCart();
            },
            onCompleted: (data) => {
                props.refetchCart();
                setValueState(code);
            }
        });
    }

    if (!props.cartData) {
        return (
            <div>
                <div>loadding...</div>
            </div>
        )
    }
    if (error) {
        return (
            <div>
                {error.message}
            </div>
        )
    }
    if (loading) {
        return (
            <div>
                <div>loadding...</div>
            </div>
        )
    }
    if (data) {
        console.log(data.estimatesShipping.data);

        const myData = [].concat(data.estimatesShipping.data)
            .sort((a, b) => a.Estimate > b.Estimate ? 1 : -1)
            .map((item, i) => {
                if (props.cartData.retrieveCart.shippingOption === item.Code) {
                    return (
                        <option key={i} value={item.Code} selected>{data.estimatesShipping.shippingCodes[item.Code]} - ${item.Cost.toFixed(2)}</option>
                    );
                } else {
                    return (
                        <option key={i} value={item.Code}>{data.estimatesShipping.shippingCodes[item.Code]} - ${item.Cost.toFixed(2)}</option>
                    );

                }
            }
            );
        let productCount = 0;
        data.estimatesShipping.oldCart.forEach(Item => {
            productCount = productCount + Item.count
        });

        return (
            <div>
                <Form.Select onChange={(e) => changeShippingCode(e.target.value)}>
                    {myData}
                </Form.Select>
                {codeChangeLoading ? "Loading ..." : null}
                <div className='d-flex justify-content-around'>
                    <div>
                        Box Count - {data.estimatesShipping.boxes.length}
                    </div>
                    <div>
                        Product Count - {productCount}
                    </div>
                </div>
            </div>
        )
    }
}
