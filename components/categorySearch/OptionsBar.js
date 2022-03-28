import React from 'react'
import { gql, useQuery } from '@apollo/client';

import Form from 'react-bootstrap/Form';
import Switch from './Switch';

const GET_PRODUCTS_SEARCH_OPTIONS = gql`
query GetProductOrigins(
    $AmountOfProductsPerPage: Int,
    $origins: [String],
    $typeOrganic: Boolean,
    $typeKosher: Boolean,
    $typeUSASourced: Boolean,
    $typeColdProcessed: Boolean,
    $typeNonGMO: Boolean,
    $typeWildcrafted: Boolean,
    $typeVirgin: Boolean,
    $typeRefinedAndRBD: Boolean,
    
    $useHair: Boolean,
    $useFace: Boolean,
    $useBody: Boolean,
    $useSoap: Boolean,
    $useCandles: Boolean,
    $useLip: Boolean,
    $useBath: Boolean,


  ) {
    products(
      live: true,
      itemsPerPage: $AmountOfProductsPerPage,
      origin_list: $origins,
      typeOrganic: $typeOrganic,
      typeKosher: $typeKosher,
      typeUSASourced: $typeUSASourced,
      typeColdProcessed: $typeColdProcessed,
      typeNonGMO: $typeNonGMO,
      typeWildcrafted: $typeWildcrafted,
      typeVirgin: $typeVirgin,
      typeRefinedAndRBD: $typeRefinedAndRBD,

      useHair: $useHair,
      useFace: $useFace,
      useBody: $useBody,
      useSoap: $useSoap,
      useCandles: $useCandles,
      useLip: $useLip,
      useBath: $useBath
    ) {
        collection {
            origin
        }
      }
    }
`;

function OptionsBar(props) {
    const { loading, error, data } = useQuery(GET_PRODUCTS_SEARCH_OPTIONS, {
        variables: {
            live: true,
            AmountOfProductsPerPage: 10000,
            useByHairCare: props.fUseByHairCare ? true : null,
            typeOrganic: props.typeOrganic ? true : null,
            typeKosher: props.typeKosher ? true : null,
            typeUSASourced: props.typeUSASourced ? true : null,
            typeColdProcessed: props.typeColdProcessed ? true : null,
            typeNonGMO: props.typeNonGMO ? true : null,
            typeWildcrafted: props.typeWildcrafted ? true : null,
            typeVirgin: props.typeVirgin ? true : null,
            typeRefinedAndRBD: props.typeRefinedAndRBD ? true : null,

            useHair: props.useHair ? true : null,
            useFace: props.useFace ? true : null,
            useBody: props.useBody ? true : null,
            useSoap: props.useSoap ? true : null,
            useCandles: props.useCandles ? true : null,
            useLip: props.useLip ? true : null,
            useBath: props.useBath ? true : null
        },
    });
    let OriginList = (
        <div>
            <div>
                Loading ...
            </div>
        </div>
    );
    let OriginListData = [];
    if (!loading && data.products) {
        data.products.collection.forEach(product => {
            if (product.origin) {
                if (!OriginListData.includes(product.origin)) {
                    OriginListData.push(product.origin);
                } 
            }
        });
        OriginList = OriginListData.map(function (product, key) {
            return <Form.Check key={key}
            type="switch"
            label={product}
            id={product + "Switch"}
            onChange={() => props.handlefOrigin(product)}
            checked={props.fOrigin.includes(product) ? true : false}
        />;
        });
    }


    if (error) return `Error! ${error}`;

    return (
        <div>
            <h6 className='mb-0'>Type:</h6>
            <Switch Label="Organic" SetBool={props.setfTypeOrganic} GetBool={props.fTypeOrganic} />
            <Switch Label="Kosher" SetBool={props.setfTypeKosher} GetBool={props.fTypeKosher} />
            <Switch Label="USA Sourced" SetBool={props.setfTypeUSASourced} GetBool={props.fTypeUSASourced} />
            <Switch Label="Cold Processed" SetBool={props.setfTypeColdProcessed} GetBool={props.fTypeColdProcessed} />
            <Switch Label="Non-GMO" SetBool={props.setfTypeNonGMO} GetBool={props.fTypeNonGMO} />
            <Switch Label="Wildcrafted" SetBool={props.setfTypeWildcrafted} GetBool={props.fTypeWildcrafted} />
            <Switch Label="Virgin" SetBool={props.setfTypeVirgin} GetBool={props.ftypeVirgin} />
            <Switch Label="Refined/RBD" SetBool={props.setfTypeRefinedAndRBD} GetBool={props.ftypeRefinedAndRBD} />

            <h6 className='mb-0'>Use:</h6>
            <Switch Label="Hair" SetBool={props.setfUseHair} GetBool={props.fUseHair} />
            <Switch Label="Face" SetBool={props.setfUseFace} GetBool={props.fUseFace} />
            <Switch Label="Body" SetBool={props.setfUseBody} GetBool={props.fUseBody} />
            <Switch Label="Soap" SetBool={props.setfUseSoap} GetBool={props.fUseSoap} />
            <Switch Label="Candles" SetBool={props.setfUseCandles} GetBool={props.fUseCandles} />
            <Switch Label="Lip" SetBool={props.setfUseLip} GetBool={props.fUseLip} />
            <Switch Label="Bath" SetBool={props.setfUseBath} GetBool={props.fUseBath} />
            
            <h6 className='mb-0'>Origin:</h6>
            {OriginList}
        </div>
    );
}
export default OptionsBar;