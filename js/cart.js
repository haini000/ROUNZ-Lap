/* 오세찬  */

// 슬라이드
function slide(same) {
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

  function slideLayout() {
    slides.forEach((item, idx) => {
      item.style.left = idx * (item.offsetWidth + slideMargin) + 'px'
    });
  };
  slideLayout();


  move(0);
  function move(idx) {
    slideCotainer.style.left = -idx * (slides[0].offsetWidth + slideMargin) + 'px';
    currentIdx = idx;
    updateBtn();
  };

  prevBtn.addEventListener('click', () => {
    let idx = (currentIdx - 1);
    move(idx);

  });
  nextBtn.addEventListener('click', () => {
    let idx = (currentIdx + 1);
    move(idx);
  });
  function updateBtn() {
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
  window.addEventListener('resize', () => {
    let currentWidth = document.querySelector('body').offsetWidth;
    if (currentWidth <= 768) {
      slideMargin = 70
      maxSlide = 2
    } else {
      slideMargin = 20
      maxSlide = 4
    }
    if (currentWidth <= 480) {
      slideMargin = 0
      maxSlide = 1
    }
    slideLayout()
  })
};

//장바구니 관련
let cartList = document.querySelector('#cartList');
let list = [];
const totalItem = document.querySelector('#totalItem');
const totalPrice = document.querySelector('#totalPrice');
const discountPrice = document.querySelector('#discountPrice');
const deliveryFee = document.querySelector('#deliveryFee');
const finallPrice = document.querySelector('#finallPrice');

//---------------------------------------
//---------------------------------------
// 임시로 로컬 스토리지에 넣기
function RandomCart() {
  for (let i = 0; i < 5; i++) {
    addToCart(Math.floor(Math.random() * 35) + 1);
  }
};

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1
  } else {
    cart.push({ id: id, qty: 1 })
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};
RandomCart();


async function loadJSON() {
  let res = await fetch('./data/glasses.json');
  let data = await res.json();
  console.log(data)
  return data; // 결과 > 나중에 json 만들어지면 여기에 .glass 같이 카테고리 추가
}

function readCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart
};

(async function () {
  let cart = readCart();
  let allProducts = await loadJSON();
  list = await buildCartitems(cart, allProducts);
  renderCart();
  totalQty();
  loadTotalPrice();
  renderRecommend(list, allProducts);
  slide('sameBrand');
  slide('sameStyle');
  btn()
})()

function buildCartitems(cart, allProducts) {
  let productM = new Map(allProducts.map(p => [Number(p.id), p])); // json의 아이디, 프로덕트
  let list = cart.map(c => {
    let p = productM.get(Number(c.id))
    return {
      id: Number(c.id),
      qty: c.qty,
      product: p
    };
  })
  console.log(list)
  return list;
};

function renderCart() {
  cartList.innerHTML = list.map(li => {
    let item = li.product // json에서 상품의 이미지, 제목 같은거 있는 곳 따오기, 밑엔 보고 잘 넣기
    return `
      <li>
        <input type="checkbox">
        <span class="material-symbols-outlined checkbox">check</span>
        <img src="${item.imgUrl}" alt="" class="cartThumb">
        <div class="cartDesc">
          <h4><a href="">${item.modelName}</a></h4>
          <p>${item.description}</p>
          <p><span class="productPrice">${item.price.toLocaleString('ko-KR')}</span>원</p>
        </div>
        <div class="cartBtns">
          <button type="button" class="deleteBtn">삭제</button>
          <div class="countBtn">
            <span class="material-symbols-outlined remove">remove</span>
            <span class="productCount">${li.qty}</span>
            <span class="material-symbols-outlined add">add_2</span>
          </div>
        </div>
      </li>
    `
  }).join('')
};


function totalQty() {
  let totalQty = 0;
  for (let item of list) {
    totalQty += Number(item.qty);
  };
  totalItem.innerHTML = totalQty;
}
function loadTotalPrice() {
  let TP = 0;
  let DP = 0;
  for (let item of list) {
    // json에서 다르게 작성되면 바꾸기
    TP += Number(item.product.price) * Number(item.qty);
  };
  totalPrice.innerHTML = TP.toLocaleString('ko-KR');
  const deliveryFee = document.querySelector('#deliveryFee')
  let delivery = 5000;
  if (TP >= 300000) {
    delivery = 0;
  } else {
    delivery = 5000
  }
  deliveryFee.innerHTML = `${delivery}원`;
  let FP = TP - DP + delivery;
  finallPrice.innerHTML = FP.toLocaleString('ko-KR');
  progressbar(TP)
}

// 게이지바
let freePrice = document.querySelector('.gauge h3')
let bar = document.querySelector('.bar')
function progressbar(totalPrice) {
  if (totalPrice < 300000) {
    let pricePer = (300000 - totalPrice) / 300000
    freePrice.innerHTML = `${300000 - totalPrice}원 이상 추가시 배달비 무료`;
    bar.style.width = pricePer + '%'
  } else {
    freePrice.innerHTML = `지금 주문시 배달비 무료!`
    bar.style.width = 100 + '%'
  };
}

//추천 상품
const sameBrandProducts = document.querySelector('.sameBrandProducts ul');
const sameStyleProducts = document.querySelector('.sameStyleProducts ul');
const targetBrand = document.querySelector('.sameBrand .brand');
function renderRecommend(list, allProducts) {
  let selectBrand = list[0].product.brand;
  let findSameBrand = allProducts.filter(item => item.brand === selectBrand);
  console.log(findSameBrand);

  targetBrand.innerHTML = selectBrand;
  sameBrandProducts.innerHTML = findSameBrand.map(li => {
    let item = li
    console.log(item)
    return `
      <li>
        <img src="${item.imgUrl}" alt="" class="morePT">
        <div class="moreDesc">
          <h4><a href="">${item.modelName}</a></h4>
          <p>${item.description}</p>
          <div class="priceInfo">
            <span><span class="PPrice">${item.price}</span>원</span>
          </div>
        </div>
      </li>
    `
  }).join('');

  let selectStyle = list[0].product.category;
  let findSameStyle = allProducts.filter(item => item.category === selectStyle);

  sameStyleProducts.innerHTML = findSameStyle.map(li => {
    let item = li
    return `
      <li>
        <img src="${item.imgUrl}" alt="" class="morePT">
        <div class="moreDesc">
          <h4><a href="">${item.modelName}</a></h4>
          <p>${item.description}</p>
          <div class="priceInfo">
            <span><span class="PPrice">${item.price}</span>원</span>
          </div>
        </div>
      </li>
    `
  }).join('');
};

// 버튼
function btn() {
  const cartItems = document.querySelectorAll('#cartList > li');
  const allSelect = document.querySelector('#allSelect + span');
  const selectDel = document.querySelector('#selectDel');

  cartItems.forEach((item, idx) => {
    const deleteBtn = item.querySelector('.deleteBtn');
    const removeBtn = item.querySelector('.remove');
    const addBtn = item.querySelector('.add');
    const checkbox = item.querySelector('.checkbox');

    deleteBtn.addEventListener('click', () => {
      list.splice(idx, 1);
      let cart = list.map(item => ({ id: item.id, qty: item.qty }));
      localStorage.setItem('cart', JSON.stringify(cart));

      updateCart()
    });
    removeBtn.addEventListener('click',()=>{
      list[idx].qty -= 1
      if(list[idx].qty <= 0){
        list.splice(idx, 1);
        let cart = list.map(item => ({ id: item.id, qty: item.qty }));
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCart()
      }else{
        let cart = list.map(item => ({ id: item.id, qty: item.qty }));
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCart()
      }
    });
    addBtn.addEventListener('click',()=>{
      list[idx].qty += 1
      let cart = list.map(item => ({ id: item.id, qty: item.qty }));
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart()
    })


  });
  function updateCart(){
    renderCart();
    totalQty();
    loadTotalPrice();
    btn();
  }
};

