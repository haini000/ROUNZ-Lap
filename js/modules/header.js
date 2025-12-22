export function renderHeader() {
  const header = document.querySelector('#header');

  header.innerHTML =
    `
      <div class="container">
        <div class="topLeft">
          <div class="toggleMenuBtn">
            <span class="material-symbols-outlined">menu</span>
          </div>
          <h1><a href="index.html"><img src="/images/logo.svg" alt="logo"><span class="hidden">ROUNZ</span></a></h1>
        </div>
        <ul class="topRight">
          <li><a href=""><span class="material-symbols-outlined">account_circle</span></a></li>
          <li><a href="cart.html"><span class="material-symbols-outlined">shopping_cart</span></a></li>
          <li>
            <ul class="account">
              <li><a href="/login.html">로그인</a></li>
              <li><a href="/signup.html">회원가입</a></li>
            </ul>
          </li>
        </ul>
        
      </div>
      
    `
}