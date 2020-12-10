//main products page
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import './product.css'
import store from '../../store';
import { GET_ALL } from '../../store/actions/getallproduct';

import axios from "axios";
import configdata from '../../csrftoken'

export class Product extends Component<{}, any> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            products: store.getState().productseReducer
        }
    }

    //get all product from database (via GET_ALL action)
    componentDidMount() {
        store.dispatch(GET_ALL())
        store.subscribe(() => {
            this.setState({
                products: store.getState().productseReducer
            })
        })
    };
    render() {
        console.log(this.state.products)
        return (
            <div>
                <div className='container'>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img className='product__img' src='https://cdn.simplegreen.com/images/news_media/9-spring-cleaning-tips-made-simple-large.jpg' />
                </div>
                <div className='product__list'>

                    <Link to={{
                        //pass the tools product to tools page
                        pathname: "/product/tools",
                        state: this.state.products.product,
                    }}
                        style={{ textDecoration: "none" }}>
                        <Button style={{ marginLeft: "8px" }} color="primary" variant="contained" size="large">Product Tools</Button>
                    </Link>

                    <Link to={{
                        //pass the material product to material page
                        pathname: "/product/materials",
                        state: this.state.products.material,
                    }}
                        style={{ textDecoration: "none" }}>
                        <Button style={{ marginLeft: "8px" }} color="primary" variant="contained" size="large">Product Materials</Button>
                    </Link>
                    <Button onClick={
                        () => {
                            axios.put('/api/products/', { _id: '5fce1fd486421322abecae99' }, configdata)
                                .then(res => {
                                    console.log(res.data)
                                })
                                .catch(err => console.log(err));
                        }
                    }>test</Button>
                </div>
            </div>
        )
    }
}

export default Product