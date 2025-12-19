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