const express = require('express');
const router = express.Router();
const { Product } = require('../models/product'); //Product에서 export한 것을 받아온다.




//route에서 디비, 서버 사이 관리

//=================================
//             product
//=================================

router.post('/products', (req,res)  => {
    
  let limit = req.body.limit ? parseInt(req.body.limit) :20;
  // property 이름 limit  //stirng을 숫자로:parseint
  let skip = req.body.skip ? parseInt(req.body.skip): 0;

  
  
  //produc collection 에 있는 모든 정보 가져오기
  Product.find()   //안에다 {}로 조건주기
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({success: false, err})
     return res.status(200).json({success: true, 
        productInfo})
    })

  })




  //id=123123123,324234234,324234234  type=array
router.get('/cartProducts', (req, res) => {

  let type = req.query.type
  let productIds = req.query.id

  if (type === "array") {
      //id=123123123,324234234,324234234 이거를 
      //productIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
      let ids = req.query.id.split(',')
      productIds = ids.map(item => {
          return item
      })

  }

  //productId를 이용해서 DB에서  productId와 같은 상품의 정보를 가져온다.

  Product.find({ _id: { $in: productIds } })
  .exec((err, product) => {
    if (err) return res.status(400).send({success: false, err})
    return res.status(200).json({success: true, product})
  })

})





  router.post('/python', (req,res) => {

      const {parse, stringify} = require('flatted/cjs');
      const {spawn} = require('child_process');
      const py = spawn('python', ['../app.py']);
      data = '쿠캣마켓 스노우콘치즈새우',
      dataString ="",

      py.stdout.on('data', function(data){    //py로부터 data오면 callback
        dataString += data.toString();
      });
      py.stdout.on('end', function(){
        console.log(dataString); //py쪽으로부터 end 오면 callback
      });
      py.stdin.write(stringify(data)); //paramter를 data로 하여 python 모듈 호출
      py.stdin.end();
    });

    
  
 





  

    


    
    //product collection 에 있는 특정 정보 가져오기 
    router.post('/specificProducts3', (req,res)  => {

      let type = req.query.type
      let productIds = req.query.id
      
      productIds =['615adc6262babc3c854ab812', '615adc2262babc3c854ab720', '615adcb262babc3c854ab97e',
                   '615adbff62babc3c854ab679']

      if (type ==="array"){
        let ids = req.query.id.split(',')
      }

  
      Product.find({ '_id': {$in: productIds} })   //안에다 {}로 조건주기
        .exec((err, productInfo) => {
          if (err) return res.status(400).json({success: false, err})
          return res.status(200).json({success: true, productInfo})
        })

        
      })

      //product collection 에 있는 특정 정보 가져오기 
    router.post('/specificProducts2', (req,res)  => {

      let type = req.query.type
      let productIds = req.query.id
      
      productIds =['615adc6262babc3c854ab7e9', '615adc0462babc3c854ab68a', '615adc9962babc3c854ab911',
                    '615adc9962babc3c854ab902', '615adc4362babc3c854ab7a8', '615adc3d62babc3c854ab781',]

      if (type ==="array"){
        let ids = req.query.id.split(',')
      }

  
      Product.find({ '_id': {$in: productIds} })   //안에다 {}로 조건주기
        .exec((err, productInfo) => {
          if (err) return res.status(400).json({success: false, err})
          return res.status(200).json({success: true, productInfo})
        })

        
      })

        //product collection 에 있는 특정 정보 가져오기 
    router.post('/specificProducts1', (req,res)  => {

      let type = req.query.type
      let productIds = req.query.id
      
      productIds =['615adc7762babc3c854ab865', '615adc6262babc3c854ab7f2', '615adc8e62babc3c854ab8fa',
                    '615adc6262babc3c854ab80a','615adc1562babc3c854ab6ae', '615adc6962babc3c854ab83c',
                  '615adc5362babc3c854ab7d7', '615adbbb62babc3c854ab64f']

      if (type ==="array"){
        let ids = req.query.id.split(',')
      }

  
      Product.find({ '_id': {$in: productIds} })   //안에다 {}로 조건주기
        .exec((err, productInfo) => {
          if (err) return res.status(400).json({success: false, err})
          return res.status(200).json({success: true, productInfo})
        })

        
      });

      

    
    
  










module.exports = router