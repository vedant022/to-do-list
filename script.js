function addTodo() {
  const inputElement = document.getElementById('newTodo');
  const todoText = inputElement.value.trim();

  if (todoText !== '') {
    const todoList = document.getElementById('todoList');
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${todoText}</span>
      <button class="delete-button" onclick="deleteTodo(this)">Delete</button>
    `;
    todoList.appendChild(li);

    inputElement.value = '';
  }
}

function deleteTodo(button) {
  const todoList = document.getElementById('todoList');
  const li = button.parentNode;
  todoList.removeChild(li);
}

function downloadTodoList(format) {
  const todoList = document.getElementById('todoList');
  const listItems = todoList.getElementsByTagName('li');
  let content = '';

  for (let i = 0; i < listItems.length; i++) {
    const todoText = listItems[i].getElementsByTagName('span')[0].innerText;
    content += `${i + 1}. ${todoText}\n`;
  }

  switch (format) {
    case 'textpad':
      downloadText(content);
      break;
    case 'notepad':
      downloadNotepad(content);
      break;
    case 'word':
      downloadWord(content);
      break;
    case 'pdf':
      downloadPDF(content);
      break;
    default:
      console.error('Invalid format');
  }
}

function downloadText(content) {
  downloadFile(content, 'todo_list.txt', 'text/plain');
}

function downloadNotepad(content) {
  downloadFile(content, 'todo_list.txt', 'text/plain');
}

function downloadWord(content) {
  downloadFile(content, 'todo_list.doc', 'application/msword');
}

function downloadPDF(content) {
  const pdf = new jsPDF();
  pdf.text('To-Do List', 20, 20);
  
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    pdf.text(lines[i], 20, 40 + i * 10);
  }

  pdf.save('todo_list.pdf');
}

function downloadFile(content, fileName, fileType) {
  const blob = new Blob([content], { type: fileType });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
