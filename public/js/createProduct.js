const createProduct = (data) =>{
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="product-card">
    <div class="product-image">
    ${data.draft ? `<span class="tag">Draft</span>`:''}     
        <img class="product-thumb" src="${data.image[0] || 'img/no-image-png-2'}">
        <button class="card-action-btn edit-btn" onclick="location.href='/add-product/${data.id}'"><img  src="img/edit.png"></button>
        <button class="card-action-btn open-btn" onclick="location.href='/products/${data.id}' "><img  src="img/open.png"></button>
        <button class="card-action-btn delete-popup-btn" onclick="openDeletePopup('${data.id}')"><img  src="img/delete.png"></button>
    </div>
    <div class="product-info">
        <h2 class="product-brand">${data.name}</h2>
        <p class="product-short-des">${data.shortDes}</p>
        <span class="price">${data.sellPrice}Fcfa</span>
        <span class="actual-price">${data.actualPrice}Fcfa</span>
    </div>
</div>
</div>
    `;
}

const openDeletePopup = (id) =>{
    let deleteAlert = document.querySelector('.delete-alert');
    deleteAlert.style.display = 'flex';

    let closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click',()=> deleteAlert.style.display = null);

    let deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.addEventListener('click',()=> deleteItem(id))
}

const deleteItem = (id) => {
    fetch('/delete-product',{
        method:'post',
        headers: new Headers({'Content-Type':'application/json'}),
        body:JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data =>{
        if(data == 'success'){
            location.reload();
        }else{
            showAlert('some error occured while deleting the product. Try Again')
        }
    })
}