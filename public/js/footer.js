const createFooter = ()=>{
    let footer = document.querySelector('footer');
    footer.innerHTML=`
    <div class="footer-content">
   <img src="img/logo3.png" class="logo">
    <div class="footer-ul-container">
      <ul class="category">
        <li class="category-title">mens</li>
        <li><a href="#" class="footer-link">t-shirts</a></li>
        <li><a href="#" class="footer-link">sweatshirts</a></li>
        <li><a href="#" class="footer-link">shirts</a></li>
        <li><a href="#" class="footer-link">jeans</a></li>
        <li><a href="#" class="footer-link">trouser</a></li>
        <li><a href="#" class="footer-link">Shoes</a></li>
        <li><a href="#" class="footer-link">casuals</a></li>
        <li><a href="#" class="footer-link">formals</a></li>
        <li><a href="#" class="footer-link">sports</a></li>
        <li><a href="#" class="footer-link">watch</a></li>
   
      </ul>
      <ul class="category">
        <li class="category-title">women</li>
        <li><a href="#" class="footer-link">t-shirts</a></li>
        <li><a href="#" class="footer-link">sweatshirts</a></li>
        <li><a href="#" class="footer-link">shirts</a></li>
        <li><a href="#" class="footer-link">jeans</a></li>
        <li><a href="#" class="footer-link">trouser</a></li>
        <li><a href="#" class="footer-link">Shoes</a></li>
        <li><a href="#" class="footer-link">casuals</a></li>
        <li><a href="#" class="footer-link">formals</a></li>
        <li><a href="#" class="footer-link">sports</a></li>
        <li><a href="#" class="footer-link">watch</a></li>

      </ul>
    </div>
  
   </div> 
   <p class="footer-title">About compagny</p>
   <p class="info">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p>
   <p class="info">Support email - salif@gmail.com, salif@yahoo.fr</p>
   <p class="info">telephone- +22378303208</p>
   <div class="footer-social-container">
    <div>
      <a href="#" class="social-link">terms & services</a>
      <a href="#" class="social-link">privacy pages</a>
   </div>
   <div>
    <a href="#" class="social-link">instagram</a>
    <a href="#" class="social-link">facebook</a>
    <a href="#" class="social-link">twitter</a>
   </div>
 </div>
 <p class="footer-credit">clothing best apparels online store</p>
    `;
}
createFooter()