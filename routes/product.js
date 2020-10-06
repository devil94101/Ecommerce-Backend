var express=require('express')
const router=express.Router()
const amazon=require('amazon-buddy')
router.get('/',(req,res)=>{
    res.send("product")
})
router.post('/get',async(req,res)=>{
   const products=await amazon.products({keyword:req.body.key,number:25});
   let data=[]
   let id={}
   products['result'].map(ele=>{
        if(!id[ele.asin]){
            data.push({
                _id:ele['asin'],
                price:ele.price.current_price,
                image:ele.thumbnail,
                title:ele.title
            })
            id[ele.asin]=1
        }
   })
   res.json(data);
})
router.post('/detail',async(req,res)=>{
    const product = await amazon.asin({ asin: req.body.id });
    res.json(product.result[0])
})
module.exports=router