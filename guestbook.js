// HTML에서 방명록 폼, 입력칸, 안내 문구, 목록 영역을 찾는다.
const form = document.querySelector('#guestbook-form');
const nameInput = document.querySelector('#name');
const messageInput = document.querySelector('#message');
const notice = document.querySelector('#notice');
const list = document.querySelector('#list');

// 안내 문구를 비우는 함수.
function clearNotice() {
  notice.textContent = '';
}

// 방명록 한 줄을 만들어서 목록에 추가하는 함수.
function addGuestbookItem(name, message) {
  // li 태그를 새로 만든다. = 한 줄의 방명록 항목.
  const li = document.createElement('li');
  // 텍스트 노드를 만들어서 "이름: 메시지" 형식으로 넣는다.
  const text = document.createTextNode(`${name}: ${message}`);
  // 삭제 버튼을 만든다.
  const removeButton = document.createElement('button');

  // 버튼의 타입을 일반 버튼으로 지정해서 폼 제출을 막는다.
  removeButton.type = 'button';
  removeButton.textContent = '삭제';

  // 버튼을 누르면 현재 li(방명록 항목)를 화면에서 제거한다.
  removeButton.addEventListener('click', function () {
    li.remove();
  });

  // 텍스트와 삭제 버튼을 li 안에 붙이고, 마지막에 목록에 추가한다.
  li.append(text, removeButton);
  list.append(li);
}

// 폼이 제출될 때 실행되는 이벤트 처리.
form.addEventListener('submit', function (event) {
  // 기본 동작(페이지 새로고침)을 막는다.
  event.preventDefault();

  // 입력값 앞뒤 공백을 제거해서 값만 가져온다.
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  // 이름이 비어 있으면 경고 메시지를 보여주고 입력칸에 커서를 둔다.
  if (name === '') {
    notice.textContent = '이름을 입력하세요.';
    nameInput.focus();
    return;
  }

  // 메시지가 비어 있으면 경고 메시지를 보여주고 메시지 입력칸에 커서를 둔다.
  if (message === '') {
    notice.textContent = '메시지를 입력하세요.';
    messageInput.focus();
    return;
  }

  // 경고 메시지를 지우고 방명록을 추가한다.
  clearNotice();
  addGuestbookItem(name, message);

  // 폼을 비우고 이름 입력칸에 다시 커서를 놓는다.
  form.reset();
  nameInput.focus();
});

// 사용자가 이름 또는 메시지 입력창을 수정하면 경고 메시지를 지운다.
nameInput.addEventListener('input', clearNotice);
messageInput.addEventListener('input', clearNotice);
