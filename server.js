//importation des modules
 const express = require('express');
 const admin = require('firebase-admin');
 const bcrypt = require('bcrypt');
 const path = require('path');
 const nodemailer = require('nodemailer');
 
 //firebase admin stup
 
let serviceAccount = require("./e-commerce-43db4-firebase-adminsdk-9ezji-f0747aea49.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();


//declaraton du static
let staticPath = path.join(__dirname,'public');
 // initialisation express
 const app = express();
//middleware
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
 //routes
 //home
 app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public', "ecomhome.html"));
 })
 //route signup
 app.get('/signup',(req,res)=>{
    res.sendFile(path.join(staticPath, 'ecomsignup.html'))
 })
 app.post('/signup',(req,res)=>{
    console.log(req.body)
 let{ name, email, password, number, tac, notification}=req.body;
    
 //formulaire validation
 if(name.length < 3){
   return res.json({alert:'name must be 3 letters long'});
}else if(!email.length){
   return res.json({alert:'enter your email'});
}else if(password.length < 8 ){
   return res.json({alert:'password should bbe 8 letters long'})
}else if(!number.length){
   return res.json({alert:'enter your phone number'});
}else if(!Number(number) || number.length < 8 ){
   return res.json({alert:'invalid number, please enter valid one'})
}else if(!tac){
   return res.json({alert:'you must agree to our terms and conditions'})
}
 // store user in db
 db.collection('users').doc(email).get()
 .then(user =>{
   if(user.exists){
      return res.json({'alert':'email already exists'})
   }else{
      //encrypt the password
      bcrypt.genSalt(10, (err,salt)=>{
         bcrypt.hash(password,salt,(err,hash)=>{
            req.body.password = hash;
            db.collection('users').doc(email).set(req.body)
            .then(data =>{
               res.json({
                  name:req.body.name,
                  email:req.body.email,
                  seller:req.body.seller
               })
            })
         })
      })
   }
 })
 });
 //route login
 app.get('/login',(req,res)=>{
   res.sendFile(path.join(staticPath,'ecomlogin.html'))
 });
 app.post('/login',(req,res)=>{
   let {email, password} = req.body;
   if(!email.length || !password.length){
      return res.json({'alert':'fill all inputs'})
   }
   db.collection('users').doc(email).get()
   .then(user =>{
      if(!user.exists){// si email nexiste pas
             return res.json({'alert':'log in email does not exists'})
      }else{
         bcrypt.compare(password, user.data().password, (err,result)=>{
            if(result){
               let data = user.data();
               return res.json({
                  name:data.name,
                  email:data.email,
                  seller:data.seller,
               })
            }else{
               return res.json({'alert':'password in incorrect'})
            }
         })
      }
   })
 })
 // route seller
 app.get('/seller',(req,res)=>{
   res.sendFile(path.join(staticPath,'ecomseller.html'))
 })
 app.post('/seller',(req,res)=>{
    let {name, about, adress, number, tac, legit, email}=req.body;
    if(!name.length || !adress.length || !about.length || number.length < 8 ||
      !Number(number)){
         return res.json({'alert':'some information(s) is/are invalide'})
      }else if(!tac || !legit){
         return req.json({'alert':'you must agree to our terms and conditions'})
      }else{
         //update users seller status here.
         db.collection('sellers').doc(email).set(req.body)
         .then(data=>{
            db.collection('users').doc(email).update({
               seller:true
            }).then(data=>{
               res.json(true);
            })
         })
      }
 })

 // add-product
 app.get('/add-product',(req,res)=>{
   res.sendFile(path.join(staticPath, 'ecomadd-product.html'))
 })

 app.get('/add-product/:id',(req,res)=>{
   res.sendFile(path.join(staticPath, 'ecomadd-product.html'))
 })

 //get the upload link
 app.get('/',(req,res)=>{
   generateUrl().then(url=>res.json(url));
 })
 //add product
 app.post('/add-product',(req,res)=>{
   let {name, shortDes, des, images, sizes, actualPrice, discount,sellPrice,
      stock,tags,tac,email,draft, id}=req.body;
   //validation
   if(!draft){
      if(!name.length){
         return res.json({'alert':'enter name product'})
     }else if(shortDes.length >100 || shortDes.length < 10){
          return res.json({'alert':'short description must be between 10 to 100 letters long'})
     }else if(!des.length){
         return res.json({'alert':'enter detail description about the product'})
     }else if(!images.length){//image link erray
         return res.json({'alert':'upload atleast one product image'});
     }else if(!sizes.length){//sizes array
         return res.json({'alert':'select at least one size'});
     }else if(!actualPrice.length || !discount.length || !sellPrice.length){
         return res.json({'alert':'you must add pricings'})
     }else if(stock.value < 20){
         return res.json({'alert':'you should have at least 20 items in stock'});
     }else if(!tags.length){
         return res.json({'alert':'enter few tags to help ranking your product in search'})
     }else if(!tac.checked){
         return res.json({'alert':'you must agree to our terms and conditions'});
     }
   }
  //add product
  let docName = id ==undefined ? `${name.toLowerCase()}-${Math.floor(Math.random
   ()*5000)}`: id ;
  db.collection('products').doc(docName).set(req.body)
  .then(data =>{
      res.json({'product':name});
  })
  .catch(err =>{
   return res.json({'alert':'some error occured. Try again'})
  })
 })

 //get products
app.post('/get-products',(req,res)=>{
   let {email, id, tag}=req.body;

   if(id){
     docRef = db.collection('products').doc(id)
   }else if(tag){
     docRef = db.collection('products').where('tags','array-contains',tag);

   }else{
     docRef = db.collection('products').where('email','==', email);

   }

   docRef.get()
   .then(products=>{
        if(products.empty){
         return res.json('no products');
        }
        let productArr = [];
        if(id){
         return res.json(products.data());
        }else{
         products.forEach(item =>{
            let data = item.data();
            data.id = item.id;
            productArr.push(data);
           })
           res.json(productArr)
        }       
   })
})
app.post('/delete-product',(req,res)=>{
   let {id} = req.body;

   db.collection('products').doc(id).delete()
   .then(data => {
      res.json('success');
   }).catch(err =>{
      res.json('err');
   })
})
//product page
app.get('/products/:id',(req,res)=>{
   res.sendFile(path.join(staticPath,'ecomproduct.html'))
})

app.get('/search/:key', (req,res)=>{
   res.sendFile(path.join(staticPath,'ecomsearch.html'))
})

app.get('/cart',(req,res)=>{
   res.sendFile(path.join(staticPath,'cart.html'));
})

app.get('/checkout',(req,res)=>{
   res.sendFile(path.join(staticPath,'checkout.html'));
})

app.post('/order',(req,res)=>{
   const {order, email, add} = req.body;

   let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user:process.env.EMAIL,
         pass:process.env.PASSWORD,

      }
   })

   const mailOption = {
      from: 'valid sender email id',
      to:email,
      subject: 'Clothing : Order Placed',
      html :`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
             body{
                 min-height: 90vh;
                 background: #f5f5f5;
                 font-family: sans-serif ;
                 display: flex;
                 justify-content: center;
                 align-items: center;

             }
             .heading{
                text-align: center;
                font-size: 40px;
                width: 50%;
                display: block;
                line-height: 50px;
                margin: 30px auto 60px;
                text-transform: capitalize;
             }
             .heading span{
                font-weight: 300;
             }
             .btn{
                width: 200px;
                height: 50px;
                border-radius: 5px;
                background: #3f3f3f;
                color: #fff;
                display: block;
                margin: auto;
                font-size: 18px;
                text-transform: capitalize;
             }
    </style>

</head>
<body>
    
    <div>
        <h1 class="heading">dear ${email.split('@')[0]},<span>your order is successfully placed</span></h1>
        <button class="btn">check status</button>
    </div>

</body>
</html>
      `
   }

   let docName = email + Math.floor(Math.random() * 123719287419824);
   db.collection('order').doc(docName).set(req.body)
   .then(data => {
       
      transporter.sendMail(mailOption, (err, info)=>{
         if(err){
            res.json({'alert':'opps! its seems like som err occured. Try again'})
         }else{
            res.json({'alert':'your order is placed'})
         }
      })
      
   })
})

 //route 404
 app.get('/404',(req,res)=>{
    res.sendFile(path.join(staticPath,'404.html'))
 })
 app.use((req,res)=>{
    res.redirect('/404')
 })
app.listen(3400,()=>{
    console.log('demarage du server sur port 3000 localhost')
})