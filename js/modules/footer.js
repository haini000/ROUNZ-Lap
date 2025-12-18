export function renderFooter() {
  const footer = document.querySelector('#footer');

  footer.innerHTML =
    `
    <div>
      <ul>
        <li>고객센터</li>
        <li>개인정보처리방침</li>
        <li>이용약관</li>
      </ul>
      <ul>
        <li>라운즈앱</li>
        <li>라운즈해외</li>
        <li>라운즈파트너스</li>
        <li>글라스박스</li>
        <li>가맹문의</li>
      </ul>


      <div>
        사업자정보확인 (주)라운즈 ROUNZ 사업자정보
      </div>
      <ul>
        <li>
          <img src="/images/icon/kcp.png" alt="kcp">
          <a href=""><img src="images/icon/facebook.svg" alt=""><span class="hidden">facebook</span></a>
        </li>
        <li>
          <a href=""><img src="images/icon/instagram.svg" alt=""><span class="hidden">instagram</span></a>
        </li>
        <li>
          <a href=""><img src="images/icon/naver.svg" alt=""><span class="hidden">naver</span></a>
        </li>
      </ul>
    </div>
    <div class="componyInfo">
      <div class="footerLeft">
        <ul>
          <li>상호명</li>
          <li>대표</li>
          <li>대표전화</li>
          <li>플래그십 스토어</li>
        </ul>
        <ul>
          <li>사업자 주소</li>
          <li>사업자등록번호</li>
          <li>통신판매업 신고</li>
          <li>개인정보관리책임자</li>
          <li>&copy;ROUNZ</li>
        </ul>
      </div>
      <div class="footerRight">
        <ul>
          <li>주식회사 라운즈</li>
          <li>김세민, 김명섭</li>
          <li>1522-0416 | 팩스 : 02-3453-5136 </li>
          <li>서울시 강남구 역삼로 109 1층 (라운즈 강남역점)</li>
          <li>경기도 성남시 분당구 판교역로
            192번길 12 1층 (라운즈 판교점)서울특별시 강남구 강남대로94길 34, K&Y빌딩 4층</li>
          <li>119-86-02418</li>
          <li>2016-서울강남-03811호</li>
          <li>김명섭</li>
        </ul>
      </div>
    </div>
    `
}