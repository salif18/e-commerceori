let loader = document.querySelector('.loader');
let user = JSON.parse(sessionStorage.user || null);

const becomeSellerElement = document.querySelector('.become-seller');
const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');

//window.onload = () =>{
   // if(user){
      //  if(compareToken(user.authToken, user.email)){
         //   becomeSellerElement.classList.remove('hide');
      //  }else{
      //      loader.style.display = 'block';
             // setupProducts();
       // }else{
         //   location.replace('/login');
      //  }
  //  } else{
    //    location.replace('/login');
   // }
//}
//showApplyFormBtn.addEventListener('click',()=>{
   // becomeSellerElement.classList.add('hide');
  //  applyForm.classList.remove('hide');
//})
//form submission

const applyFormButton = document.querySelector('#apply-form-btn');
const businessName = document.querySelector('#business-name');
const adress = document.querySelector('#business-add');
const about = document.querySelector('#about');
const number = document.querySelector('#number');
const tac = document.querySelector('#terms-and-cond');
const legitInfo = document.querySelector('#legitInfo');

applyFormButton.addEventListener('click',()=>{
    if(!businessName.value.length || !adress.value.length || !about.value.length 
        || !number.value.length){
            showAlert('fill all the inputs');
        }else if(!tac.checked || !legitInfo.checked){
            showAlert('you must agree to our terms and conditions')
        }else{
            //making server request
           loader.style.display = 'block';
           sendData('/seller',{
            name:businessName.value,
            adress:adress.value,
            about:about.value,
            number:number.value,
            tac:tac.checked,
            legit:legitInfo.checked,
            email:JSON.parse(sessionStorage.user).email
           })
        }
})

const setupProducts = ()=>{
    fetch('/get-products',{
        method:'post',
        headers:new Headers({'Content-TYpe':'application/json'}),
        body:JSON.stringify({email:user.email})
    })
    .then(res => res.json())
    .then(data => {
        loader.style.display = null;
        productListingElement.classList.remove('hide');
        if(data == 'no products'){
            let emptySvg = document.querySelector('.no-product-image');
            emptySvg.classList.remove('hide');
        }else{
            data.forEach(product => createProduct(product));
        }
    });
}
