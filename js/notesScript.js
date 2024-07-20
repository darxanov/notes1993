window.onload = function() {
    const name = localStorage.getItem('name');
    const username = localStorage.getItem('username');

    if (name && username) {
        document.getElementById('welcomeMessage').innerText = `Welcome ${name} (${username})`;
    } else {
        document.getElementById('welcomeMessage').innerText = 'Welcome!';
    }

    // Load existing notes if any
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const notesContainer = document.getElementById('notesContainer');
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            <p><strong>${note.name} (${note.username})</strong> [${note.date} ${note.time}]</p>
            <p>${note.content}</p>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function submitNote() {
    const name = localStorage.getItem('name');
    const username = localStorage.getItem('username');
    const noteContent = document.getElementById('notes').value;

    if (noteContent.trim() === '') {
        alert('Please enter a note.');
        return;
    }

    const notesContainer = document.getElementById('notesContainer');
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const formattedTime = formatTime(currentDate);

    const note = {
        name,
        username,
        content: noteContent,
        date: formattedDate,
        time: formattedTime
    };

    // Save note to local storage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));

    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.innerHTML = `
        <p><strong>${name} (${username})</strong> [${formattedDate} ${formattedTime}]</p>
        <p>${noteContent}</p>
    `;

    notesContainer.appendChild(noteElement);
    document.getElementById('notes').value = ''; // Clear the textarea after submitting
}

function endSession() {
    document.getElementById('endSessionOptions').style.display = 'block';
}

function downloadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const name = localStorage.getItem('name');
    const username = localStorage.getItem('username');

    let textContent = `Notes for ${name} (${username}):\n\n`;
    notes.forEach(note => {
        textContent += `${note.date} ${note.time}\n${note.content}\n\n`;
    });

    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'notes.txt';
    link.click();

    // Clear storage and go back to main page
    localStorage.clear();
    window.location.href = 'index.html';
}

function startNewSession() {
    localStorage.clear();
    window.location.href = 'notes.html';
}

function goToMainPage() {
    localStorage.clear();
    window.location.href = 'index.html';
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

function formatTime(date) {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString(undefined, options);
}
