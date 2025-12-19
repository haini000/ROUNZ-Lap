export function renderToggleMenu() {
  const toggle = document.querySelector('#toggleMenu');

  toggle.innerHTML =
    `
    <span class="material-symbols-outlined">close</span>
    <h2>카테고리</h2>
    <ul>
      <li class="active">
        <h3>안경테</h3>
        <ul>
          <li class="active"><a href="">안경테 전체보기<span class="material-symbols-outlined">chevron_right</span></a></li>
          <li><a href="">모양<span class="material-symbols-outlined">chevron_right</span></a></li>
          <li><a href="">브랜드<span class="material-symbols-outlined">chevron_right</span></a></li>
        </ul>
      </li>
      <li>
        <h3>선글라스</h3>
        <ul>
          <li><a href="">선글라스 전체보기<span class="material-symbols-outlined">chevron_right</span></a></li>
          <li><a href="">모양<span class="material-symbols-outlined">chevron_right</span></a></li>
          <li><a href="">브랜드<span class="material-symbols-outlined">chevron_right</span></a></li>
        </ul>
      </li>
      <li>
        <h3>브랜드</h3>
        <ul>
          <!-- 스크립트로 넣기 -->
          <li><a href="">브랜드1<span class="material-symbols-outlined">chevron_right</span></a></li>
          <li><a href="">브랜드2<span class="material-symbols-outlined">chevron_right</span></a></li>
          <li><a href="">브랜드3<span class="material-symbols-outlined">chevron_right</span></a></li>
        </ul>
      </li>
      <li>
        <h3>신상품</h3>
        <ul>
          <li><a href="">안경테<span class="material-symbols-outlined">chevron_right</span></a></li>
          <li><a href="">선글라스<span class="material-symbols-outlined">chevron_right</span></a></li>
          <li><a href="">베스트 상품<span class="material-symbols-outlined">chevron_right</span></a></li>
        </ul>
      </li>
      <li>
        <h3>고객센터</h3>
        <ul>
          <li><a href="">공지사항<span class="material-symbols-outlined">chevron_right</span></a></li>
          <li><a href="">자주하는 질문<span class="material-symbols-outlined">chevron_right</span></a></li>
          <li><a href="">묻고답하기<span class="material-symbols-outlined">chevron_right</span></a></li>
          <li><a href="">교환/반품 신청<span class="material-symbols-outlined">chevron_right</span></a></li>
        </ul>
      </li>

    </ul>
    `
}