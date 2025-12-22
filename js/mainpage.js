const newSection = document.querySelector('#new-section');
const bestSection = document.querySelector('#best-section');
const exclusiveSection = document.querySelector('#exclusive-section');

fetch('./data/glasses.json')
  .then(res => {
    console.log(res);
    if (!res.ok) throw new Error('로딩중 에러가 발생했습니다');
    return res.json()
  })
  .then(result => {
    const newItem = result.filter(item => item.section === 'new');
    const bestItem = result.filter(item => item.section === 'best');
    const exclusiveItem = result.filter(item => item.section === 'exclusive');

    console.log(newItem);
    console.log(bestItem);
    console.log(exclusiveItem);

    innerSection(newItem, '#new-section');
    innerSection(bestItem, '#best-section');
    innerSection(exclusiveItem, '#exclusive-section')
  })


function innerSection(items, selecor) {
  const contain = document.querySelector(`${selecor} .recommend ul`);
  console.log(contain);
  let html = "";
 
  items.forEach(item => {
    html += `
      <li>
        <img src="${item.imgUrl}" alt="${item.modelName}" class="morePT">
        <div class="moreDesc">
          <h4><a href="#">${item.modelName}</a></h4>
          <p>${item.description}</p>
          <div class="priceInfo">
            <span><span class="discount">40</span>%</span>
            <span><span class="price">${Number(item.price).toLocaleString()}</span>원</span>
          </div>
        </div>
      </li>
    `;
  });

  contain.innerHTML = html;
}