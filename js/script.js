function saveUserData() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;

    localStorage.setItem('name', name);
    localStorage.setItem('username', username);

    window.location.href = "notes.html";
}