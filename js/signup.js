const mainform = document.querySelector('form');
const signupBtn = mainform.querySelector('.signup-btn button');
const rows = mainform.querySelectorAll('.row.valign-wrapper');

signupBtn.addEventListener('click', (e) => {
  e.preventDefault();

  rows.forEach(row => {
    // id를 가진 input을 검색 -> input을 찾을 시 phone input을 못찾음
    const input = row.querySelector('input[id]');
    const titleElement = row.querySelector('.input-title');

    const error = row.querySelector('.helper-text');

    if(!titleElement.querySelector('span')) return;

    // childNode -> 자식 요소 를 순서대로 저장 -> text, span
    // textContet -> 요소노드의 텍스트 노드를 변경한다. HTML 마크업을 파싱하지 않는다.
    const titleText = titleElement.childNodes[0].textContent.trim();

    // console.log(titleText);

    if (input.value.trim().length === 0 || input.value == null) {
      error.textContent = `${titleText}는 필수 입력 사항입니다.`
      error.style.display = 'block';
    } else {
      error.style.display = 'none';
    }
    
  });
});