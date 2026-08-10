// /js/notepad.js

// -- State Management --
let notes = [];
let activeNoteId = null;

// -- DOM Elements --
const noteListEl = document.getElementById('note-list');
const addNoteBtn = document.getElementById('add-note-btn');
const searchInput = document.getElementById('note-search');

const emptyStateEl = document.getElementById('empty-state');
const activeEditorEl = document.getElementById('active-editor');

const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const timestampEl = document.getElementById('note-timestamp');
const deleteBtn = document.getElementById('delete-note-btn');
const saveStatus = document.getElementById('save-status');

// -- Initialization --
function initApp() {
    // Load notes from local storage
    const savedNotes = localStorage.getItem('spydr_notes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
    }
    renderNoteList();
}

// -- Core Functions --
function saveNotes() {
    localStorage.setItem('spydr_notes', JSON.stringify(notes));
    
    // Flash the "Saved" text
    saveStatus.classList.add('show');
    setTimeout(() => saveStatus.classList.remove('show'), 2000);
}

function createNote() {
    const newNote = {
        id: Date.now().toString(),
        title: '',
        content: '',
        updatedAt: Date.now()
    };
    
    notes.unshift(newNote); // Add to beginning of array
    saveNotes();
    renderNoteList();
    openNote(newNote.id);
}

function deleteNote() {
    if (!activeNoteId) return;
    
    notes = notes.filter(n => n.id !== activeNoteId);
    activeNoteId = null;
    
    saveNotes();
    renderNoteList();
    
    // Switch back to empty state UI
    activeEditorEl.classList.add('hidden');
    emptyStateEl.classList.remove('hidden');
}

function openNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;
    
    activeNoteId = id;
    
    // Update UI
    titleInput.value = note.title;
    contentInput.value = note.content;
    timestampEl.innerText = `Last edited: ${formatDate(note.updatedAt)}`;
    
    emptyStateEl.classList.add('hidden');
    activeEditorEl.classList.remove('hidden');
    
    // Highlight active item in sidebar
    renderNoteList();
}

function updateActiveNote() {
    if (!activeNoteId) return;
    
    const noteIndex = notes.findIndex(n => n.id === activeNoteId);
    if (noteIndex > -1) {
        notes[noteIndex].title = titleInput.value;
        notes[noteIndex].content = contentInput.value;
        notes[noteIndex].updatedAt = Date.now();
        
        timestampEl.innerText = `Last edited: ${formatDate(notes[noteIndex].updatedAt)}`;
        
        saveNotes();
        renderNoteList(); // Re-render sidebar to show updated title/preview
    }
}

// -- UI Rendering --
function renderNoteList(filterText = '') {
    noteListEl.innerHTML = '';
    
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(filterText.toLowerCase()) || 
        note.content.toLowerCase().includes(filterText.toLowerCase())
    );
    
    if (filteredNotes.length === 0) {
        noteListEl.innerHTML = `<div style="text-align: center; color: var(--text-secondary); padding: 2rem 1rem; font-size: 0.85rem;">No notes found.</div>`;
        return;
    }
    
    filteredNotes.forEach(note => {
        const item = document.createElement('div');
        item.className = `note-item ${note.id === activeNoteId ? 'active' : ''}`;
        
        const displayTitle = note.title.trim() === '' ? 'Untitled Note' : note.title;
        const displayPreview = note.content.trim() === '' ? 'No content...' : note.content.substring(0, 40) + '...';
        
        item.innerHTML = `
            <div class="note-item-title">${displayTitle}</div>
            <div class="note-item-preview">${displayPreview}</div>
            <div class="note-item-date">${formatDate(note.updatedAt)}</div>
        `;
        
        item.addEventListener('click', () => openNote(note.id));
        noteListEl.appendChild(item);
    });
}

// -- Helper Utilities --
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
    });
}

// -- Event Listeners --
addNoteBtn.addEventListener('click', createNote);
deleteBtn.addEventListener('click', deleteNote);

// Auto-save on input
titleInput.addEventListener('input', updateActiveNote);
contentInput.addEventListener('input', updateActiveNote);

// Search filtering
searchInput.addEventListener('input', (e) => {
    renderNoteList(e.target.value);
});

// Boot up
document.addEventListener('DOMContentLoaded', initApp);
