const createNav =()=>{
   let nav = document.querySelector('.navbar');
   nav.innerHTML=`

   <div class="nav">
       <img src="img/logo3.png" class="brand-logo"><h1>On-Click</h1>
       <div class="nav-items">
           <div class="search">
               <input type="text"  class="search-box" placeholder="search-brand, produit">
               <button class="search-btn">Search</button>
           </div>
           <a>
              <img src="img/user.png" id="user-img">
              <div class="login-logout-popup hide">
                 <p class="account-info">Log in as, name</p>
                 <button class="btn" id="user-btn">log out</button>
              </div>
           </a>
           <a href="/cart">
           <img src="img/cart2.png"></a>
       </div>
   </div>
   <ul class="links-container">
       <li class="link-item"><a href="#" class="link">Acceuil</a></li>
       <li class="link-item"><a href="#" class="link">Femme</a></li>
       <li class="link-item"><a href="#" class="link">Homme</a></li>
       <li class="link-item"><a href="#" class="link">Enfant</a></li>
       <li class="link-item"><a href="#" class="link">Accessoires</a></li>

   </ul>
   `;

}
createNav();
//nav popup
const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click',()=>{
    userPopup.classList.toggle('hide');
});
window.onload = () =>{
    let user = JSON.parse(sessionStorage.user || null);
    if(user != null){
        //moment user est connecter
        popuptext.innerHTML = `login in as, ${user.name}`;
        actionBtn.innerHTML = `log out`;
        actionBtn.addEventListener('click',()=>{
            sessionStorage.clear();
            location.reload();
        })
    }else{
        //si user se deconnect
        popuptext.innerHTML = `login in to place order`;
        actionBtn.innerHTML = `log in`;
        actionBtn.addEventListener('click',()=>{
            location.href = '/login';
    })
  }

}

//search box

const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');

searchBtn.addEventListener('click',()=>{
    if(searchBox.value.length){
        location.href = `/search/${searchBox.value}`
    }
})