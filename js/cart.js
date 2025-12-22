// 슬라이드
function slide(same){
  const target = document.querySelector(`.${same}`)
  const slideWapper = target.querySelector(`.recommend`);
  const slideCotainer = slideWapper.querySelector('ul');
  const slides = slideCotainer.querySelectorAll('li');
  const prevBtn = target.querySelector('.prev');
  const nextBtn = target.querySelector('.next');
  let slideCount = slides.length;
  console.log(slideCount)
  let currentIdx = 0;
  slideMargin = 20;
  maxSlide = 4;

  function slideLayout(){
    slides.forEach((item,idx)=>{
    item.style.left = idx* (item.offsetWidth + slideMargin) +'px'
  });
  }
  slideLayout()
  

  move(0);
  function move(idx){
    slideCotainer.style.left = -idx * (slides[0].offsetWidth + slideMargin) +'px';
    currentIdx = idx;
    updateBtn()
  };
  
  prevBtn.addEventListener('click',()=>{
    let idx = (currentIdx - 1)
    move(idx)

  })
  nextBtn.addEventListener('click',()=>{
    let idx = (currentIdx + 1)
    move(idx)
  })
  function updateBtn(){
    if (currentIdx === 0) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }

    if (currentIdx === slideCount - maxSlide) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  };
  window.addEventListener('resize',()=>{
    let currentWidth = document.querySelector('body').offsetWidth;
    if(currentWidth <= 768){
      slideMargin = 70
      maxSlide = 2
    }else{
      slideMargin = 20
      maxSlide = 4
    }
    if(currentWidth <= 480){
      slideMargin = 0
      maxSlide = 1
    }
    slideLayout()
  })
}
slide('sameBrand')
slide('sameStyle')

//장바구니 관련
let cartList = document.querySelector('#cartList')
let list = [];
const totalItem = document.querySelector('#totalItem')
const totalPrice = document.querySelector('#totalPrice')
const discountPrice = document.querySelector('#discountPrice')
const deliveryFee = document.querySelector('#deliveryFee')
const finallPrice = document.querySelector('#finallPrice')

async function loadJSON(){
  let res = await fetch('/data/product.json');
  let data = await res.json();
  return data; // 결과 > 나중에 json 만들어지면 여기에 .glass 같이 카테고리 추가
}

function readCart(){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart
};

(async function() {
  let cart = readCart();
  let allProducts = await loadJSON();
  list = await buildCartitems(cart,allProducts);
  render();
  totalQty();
  totalPrice();
})()

function buildCartitems(cart,allProducts){
  let productM = new Map(allProducts.map(p=>[Number(p.id),p])); // json의 아이디, 프로덕트
    let list = cart.map(c=>{
      let p = productM.get(Number(c.id))
      return {
        id:Number(c.id),
        qty:c.qty,
        product:p
      };
    })
    return list;
};

function render(){
  cartList.innerHTML = list.map(li=>{
    let item = li.product // json에서 상품의 이미지, 제목 같은거 있는 곳 따오기, 밑엔 보고 잘 넣기
    return `
      <li>
        <input type="checkbox">
        <span class="material-symbols-outlined checkbox checked">check</span>
        <img src="" alt="" class="cartThumb">
        <div class="cartDesc">
          <h4><a href="">${item.title}</a></h4>
          <p>${item.desc}</p>
          <p><span class="productPrice">${item.price}</span>원</p>
        </div>
        <div class="cartBtns">
          <button type="button" class="deleteBtn">삭제</button>
          <div class="countBtn">
            <span class="material-symbols-outlined">remove</span>
            <span>1</span>
            <span class="material-symbols-outlined">add_2</span>
          </div>
        </div>
      </li>
    `
  })
};

function totalQty(){
  let totalQty = 0;
  for (let item of list) {
    totalQty += Number(item.qty);
  };
  totalItem.innerHTML = totalQty;
}
function totalPrice(){
  let TP = 0;
  for (let item of list) {
    // json에서 다르게 작성되면 바꾸기
    TP += Number(item.product.price) * Number(item.qty);  
  };
  totalPrice.innerHTML = TP;
  let delivery = 2000;
  if(TP >= 20000){
    delivery = 0;
  }else{
    let delivery = 2000
  }
  let FP = TP - DP + delivery
  finallPrice.innerHTML = FP
}