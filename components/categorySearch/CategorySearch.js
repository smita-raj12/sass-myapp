import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import useWindowDimensions from '../../utilities/useWindowDimensions'
import OptionsBar from './OptionsBar';

// Components
import PaginationButtons from './PaginationButtons';
import ListProduct from '../ListProduct/ListProduct';
// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Dropdown from 'react-bootstrap/Dropdown'


const GET_PRODUCTS_SEARCH = gql`
query GetProducts(
    $AmountOfProductsPerPage: Int,
    $PageNumber: Int,
    $categoriesidlist : [Int],
    $title: String,
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
    $useBath: Boolean
  ) {
    products(
      live: true,
      itemsPerPage: $AmountOfProductsPerPage,
      page: $PageNumber,
      categories_id_list: $categoriesidlist,
      title: $title,
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
      paginationInfo {
        itemsPerPage
        lastPage
        totalCount
      }
        collection {
            id
            _id
            title
            sku
            shortDescription
            uniformResourceLocator
            lastUpdated
            origin

            typeOrganic
            typeKosher
            typeUSASourced
            typeColdProcessed
            typeNonGMO
            typeWildcrafted
            typeVirgin
            typeRefinedAndRBD
      
            useHair
            useFace
            useBody
            useSoap
            useCandles
            useLip
            useBath

            productImages {
                edges {
                    node {
                        id
                        name
                        alt
                        contentUrl
                    }
                }
            }
        }
      }
    }
`;



function CategorySearch(props) {
    const queryParams = new URLSearchParams(location.search);
    const { width } = useWindowDimensions();
    const [fTestSearch, setfTestSearch] = useState(queryParams.get('search'));
    const [fTitle, setfTitle] = useState(queryParams.get('search'));

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    const [fCategories, setfCategories] = useState([]);
    const [fOrigin, setfOrigin] = useState([]);

    const [fTypeOrganic, setfTypeOrganic] = useState(null);
    const [fTypeKosher, setfTypeKosher] = useState(null);
    const [fTypeUSASourced, setfTypeUSASourced] = useState(null);
    const [fTypeColdProcessed, setfTypeColdProcessed] = useState(null);
    const [fTypeNonGMO, setfTypeNonGMO] = useState(null);
    const [fTypeWildcrafted, setfTypeWildcrafted] = useState(null);
    const [ftypeVirgin, setfTypeVirgin] = useState(null);
    const [ftypeRefinedAndRBD, setfTypeRefinedAndRBD] = useState(null);

    const [fUseHair, setfUseHair] = useState(null);
    const [fUseFace, setfUseFace] = useState(null);
    const [fUseBody, setfUseBody] = useState(null);
    const [fUseSoap, setfUseSoap] = useState(null);
    const [fUseCandles, setfUseCandles] = useState(null);
    const [fUseLip, setfUseLip] = useState(null);
    const [fUseBath, setfUseBath] = useState(null);

    if (queryParams.get('search') && fTestSearch !== queryParams.get('search')) {
        setfTestSearch(queryParams.get('search'));
        setfTitle(queryParams.get('search'));
    }

    const { loading, error, data } = useQuery(GET_PRODUCTS_SEARCH, {
        variables: {
            live: true,
            AmountOfProductsPerPage: itemsPerPage,
            PageNumber: pageNumber,
            categoriesidlist: fCategories ? fCategories : [],
            title: fTitle,
            origins: fOrigin ? fOrigin : [],
            typeOrganic: fTypeOrganic ? true : null,
            typeKosher: fTypeKosher ? true : null,
            typeUSASourced: fTypeUSASourced ? true : null,
            typeColdProcessed: fTypeColdProcessed ? true : null,
            typeNonGMO: fTypeNonGMO ? true : null,
            typeWildcrafted: fTypeWildcrafted ? true : null,
            typeVirgin: ftypeVirgin ? true : null,
            typeRefinedAndRBD: ftypeRefinedAndRBD ? true : null,
            useHair: fUseHair ? true : null,
            useFace: fUseFace ? true : null,
            useBody: fUseBody ? true : null,
            useSoap: fUseSoap ? true : null,
            useCandles: fUseCandles ? true : null,
            useLip: fUseLip ? true : null,
            useBath: fUseBath ? true : null
        },
    });
    console.log(props.name);
    console.log(props.categoryID);
    const handlefCategories = (data) => {
        if (fCategories.includes(data)) {
            setfCategories(fCategories.filter(fCategories => fCategories !== data));
        } else {
            setfCategories(arr => [...arr, data]);
        }
    };

    if (props.categoryID && !fCategories.includes(props.categoryID)) {
        handlefCategories(props.categoryID);
    }

    const handlefOrigin = (data) => {
        if (fOrigin.includes(data)) {
            setfOrigin(fOrigin.filter(fOrigin => fOrigin !== data));
        } else {
            setfOrigin(arr => [...arr, data]);
        }
    };

    if (error) return <div>Error! ${error}</div>;

    let ListProducts = [];
    for (var i = 0; i < itemsPerPage; i++) {
        ListProducts.push(<Col sm={12} className='border border-primary my-2' style={{ height: "120px" }}>Loading ...</Col>);
    }


    if (!loading && data.products.paginationInfo.lastPage < pageNumber) {
        setPageNumber(data.products.paginationInfo.lastPage);
    }
    if (!loading && data.products) {
        if (data.products.collection.length) {
            ListProducts = data.products.collection.map(function (product, key) {
                return <Col key={key} sm={6} md={12} className='border border-primary my-2 rounded-3 overflow-hidden p-0'>
                    <ListProduct product={product} />
                </Col>;
            });
        } else {
            ListProducts = (
                <Col sm={12} className='border border-primary my-2' style={{ height: "120px" }}><h2 className='h1'>No Products</h2></Col>
            )
        }
    }
    const OptionsBarHolder = (
        <OptionsBar
            handlefOrigin={handlefOrigin}
            fOrigin={fOrigin}
            loading={loading}
            data={data}
            fTypeOrganic={fTypeOrganic}
            setfTypeOrganic={setfTypeOrganic}
            fTypeKosher={fTypeKosher}
            setfTypeKosher={setfTypeKosher}
            fTypeUSASourced={fTypeUSASourced}
            setfTypeUSASourced={setfTypeUSASourced}
            fTypeColdProcessed={fTypeColdProcessed}
            setfTypeColdProcessed={setfTypeColdProcessed}
            fTypeNonGMO={fTypeNonGMO}
            setfTypeNonGMO={setfTypeNonGMO}
            fTypeWildcrafted={fTypeWildcrafted}
            setfTypeWildcrafted={setfTypeWildcrafted}
            ftypeVirgin={ftypeVirgin}
            setfTypeVirgin={setfTypeVirgin}
            ftypeRefinedAndRBD={ftypeRefinedAndRBD}
            setfTypeRefinedAndRBD={setfTypeRefinedAndRBD}
            fUseHair={fUseHair}
            setfUseHair={setfUseHair}
            fUseFace={fUseFace}
            setfUseFace={setfUseFace}
            fUseBody={fUseBody}
            setfUseBody={setfUseBody}
            fUseSoap={fUseSoap}
            setfUseSoap={setfUseSoap}
            fUseCandles={fUseCandles}
            setfUseCandles={setfUseCandles}
            fUseLip={fUseLip}
            setfUseLip={setfUseLip}
            fUseBath={fUseBath}
            setfUseBath={setfUseBath}
        />
    );
    return (
        <div className='py-2'>
            <Container>
                <Row>
                    <Col xs={12} className="d-flex justify-content-center">
                        <h2 className="display-5 text-center">{props.name} Product Search</h2>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-center align-items-center w-100 p-0">
                        {width <= 850 ?
                            <Dropdown className={width >= 550 ? "" : "w-100"}>
                                <Dropdown.Toggle variant="primary" className='btn-lg w-100' id="dropdown-basic">
                                    Filter
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{ width: "300px" }}>
                                    <div className='bg-light p-2 m-2'>
                                        {OptionsBarHolder}
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                            : null}
                        {width >= 550 ?
                            <FloatingLabel className='w-75' controlId="floatingInputGrid" label="Search All Products By Name">
                                <Form.Control size="lg" className='w-100' type="text" placeholder="Search All Products By Name" onChange={(e) => setfTitle(e.target.value)} value={fTitle} />
                            </FloatingLabel> : null}
                        <Dropdown className={width >= 550 ? "" : "w-100"}>
                            <Dropdown.Toggle variant="primary" className='btn-lg w-100' id="dropdown-basic">
                                P({itemsPerPage})
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setItemsPerPage(10)}>10</Dropdown.Item>
                                <Dropdown.Item onClick={() => setItemsPerPage(20)}>20</Dropdown.Item>
                                <Dropdown.Item onClick={() => setItemsPerPage(40)}>40</Dropdown.Item>
                                <Dropdown.Item onClick={() => setItemsPerPage(60)}>60</Dropdown.Item>
                                <Dropdown.Item onClick={() => setItemsPerPage(100)}>100</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    {width >= 550 ? null :
                        <Col xs={12} className="d-flex justify-content-center align-items-center">
                            <FloatingLabel className='w-100' controlId="floatingInputGrid" label="Search">
                                <Form.Control size="lg" className='w-100' type="text" placeholder="Search" onChange={(e) => setfTitle(e.target.value)} value={fTitle} />
                            </FloatingLabel>
                        </Col>}

                    {width >= 850 ?
                        <Col sm={3} className='d-flex flex-column'>
                            <div className='bg-light p-2 m-2'>
                                <OptionsBar
                                    handlefOrigin={handlefOrigin}
                                    fOrigin={fOrigin}
                                    loading={loading}
                                    data={data}
                                    fTypeOrganic={fTypeOrganic}
                                    setfTypeOrganic={setfTypeOrganic}
                                    fTypeKosher={fTypeKosher}
                                    setfTypeKosher={setfTypeKosher}
                                    fTypeUSASourced={fTypeUSASourced}
                                    setfTypeUSASourced={setfTypeUSASourced}
                                    fTypeColdProcessed={fTypeColdProcessed}
                                    setfTypeColdProcessed={setfTypeColdProcessed}
                                    fTypeNonGMO={fTypeNonGMO}
                                    setfTypeNonGMO={setfTypeNonGMO}
                                    fTypeWildcrafted={fTypeWildcrafted}
                                    setfTypeWildcrafted={setfTypeWildcrafted}
                                    ftypeVirgin={ftypeVirgin}
                                    setfTypeVirgin={setfTypeVirgin}
                                    ftypeRefinedAndRBD={ftypeRefinedAndRBD}
                                    setfTypeRefinedAndRBD={setfTypeRefinedAndRBD}
                                    fUseHair={fUseHair}
                                    setfUseHair={setfUseHair}
                                    fUseFace={fUseFace}
                                    setfUseFace={setfUseFace}
                                    fUseBody={fUseBody}
                                    setfUseBody={setfUseBody}
                                    fUseSoap={fUseSoap}
                                    setfUseSoap={setfUseSoap}
                                    fUseCandles={fUseCandles}
                                    setfUseCandles={setfUseCandles}
                                    fUseLip={fUseLip}
                                    setfUseLip={setfUseLip}
                                    fUseBath={fUseBath}
                                    setfUseBath={setfUseBath}
                                />
                            </div>
                        </Col> : null}
                    <Col sm={width >= 850 ? 9 : 12}>
                        <Row>
                            {ListProducts}
                        </Row>
                    </Col>
                    <Col sm={12} className="d-flex justify-content-center align-items-center">
                        <PaginationButtons
                            setItemsPerPage={setItemsPerPage}
                            itemsPerPage={itemsPerPage}
                            setPageNumber={setPageNumber}
                            pageNumber={pageNumber}
                            lastPage={loading ? 1 : data.products.paginationInfo.lastPage}
                            loadingData={loading} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default CategorySearch;