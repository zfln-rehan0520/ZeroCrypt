// app.js — UI logic and event listeners

document.getElementById('generateBtn').addEventListener('click', () => {
  const length = parseInt(document.getElementById('length').value);
  const useUpper = document.getElementById('uppercase').checked;
  const useLower = document.getElementById('lowercase').checked;
  const useNumbers = document.getElementById('numbers').checked;
  const useSymbols = document.getElementById('symbols').checked;

  const password = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);
  document.getElementById('generatedPassword').value = password;
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const pwd = document.getElementById('generatedPassword').value;
  if (!pwd) return alert('Generate a password first!');
  navigator.clipboard.writeText(pwd).then(() => alert('Copied to clipboard!'));
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const pwd = document.getElementById('generatedPassword').value;
  if (!pwd) return alert('Nothing to save!');
  savePassword(pwd);
  renderList();
});

function renderList() {
  const list = document.getElementById('passwordList');
  const passwords = getPasswords();
  list.innerHTML = '';
  passwords.forEach((pwd, index) => {
    const li = document.createElement('li');
    li.textContent = pwd;
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.addEventListener('click', () => {
      deletePassword(index);
      renderList();
    });
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Load saved passwords on page start
renderList();
