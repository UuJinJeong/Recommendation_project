import React, {useEffect, useState} from 'react'
import { FaCode, FaSortAmountDown } from "react-icons/fa";

import axios from "axios";
import {Icon, Col, Card, Row} from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Button} from 'antd';
import { useDispatch } from 'react-redux';


function ChooseProductPage() {

    const [Products, setProducts] = useState([])  // 여러가지 들어가니까 array로
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(16)
    

    useEffect(() => {
//lendering //limit과 skip 이용해서 8개만 가져오기

        let body = {
            skip : Skip,
            limit : Limit
        }
        getProducts(body)
   

    }, [])

    const getProducts = (body)=> {
        axios.post('/api/product/products', body)   //product 라우트에 보내기
            .then(response => {
                if (response.data.success){
                    if(body.loadMore) {
                        setProducts([...Products, ...response.data.chooseProduct])
                    }
                    else {
                        setProducts(response.data.chooseProduct)

                    }

                } else {
                    alert(" 상품을 가져오는데 실패 했습니다. ")
                }
            })
    }

    const loadMoreHandler = () => {

        let skip = Skip + Limit
        let body = {
            skip : Skip,
            limit : Limit,
            loadMore: true
        }

        getProducts(body)

        setSkip(skip)


    }

    
    
 


    const renderCards = Products.map((product, index) => {
        console.log('product', product)
        
        return <Col lg = {6} md={8} xs ={24} key = {index}> 
        


        <Card 
            //이미지 누르면 카트페이지로 이동 (카트에 담겨야함..)
            cover = {<a href ={"/cart"}><img style = {{ width: '100%', maaxheight: '200px' }}src = {product.image}/></a> }
        >
       
            <Meta
            
            />
        </Card>
    </Col>
    
    })

    
    
    
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <div style={{ textAlign: 'center' }}>
            <h2> 선호하는 메뉴를 선택해주세요! <Icon type="heart" /></h2>
            <p>회원님 취향 추천 데이터로 활용됩니다.</p>
            </div>

            {/* Filter */}


            {/* search */}

            {/*cards */}

            <br />

            <Row gutter = {[16, 16]}>
                {renderCards}

            </Row>



            <br />
            <br />

           
            <div style = {{ display : 'flex', justifyContent : 'center'}}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>
            

        </div>
    )
}


export default ChooseProductPage




