// Wajib Memanfaatkan: Variabel dan Array/Object untuk menampung data
let todos = [
    { id: 1, title: "Rancang Struktur HTML Semantik", completed: true },
    { id: 2, title: "Tulis Laporan UX Research", completed: false },
    { id: 3, title: "Implementasi Fungsi Filter", completed: false }
];

let nextId = 4; // Variabel untuk ID tugas berikutnya

// Ambil elemen DOM
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const filterSelect = document.getElementById('filter-select');
// --- 2. DEFINISI FUNGSI LOGIKA ---

function renderTasks(filter = 'all') {
    // 1. Bersihkan kontainer
    taskList.innerHTML = ''; 

    let filteredTodos = todos;

    // Logika Filter/Pencarian (Sesuai Spesifikasi Fitur Utama)
    if (filter === 'active') {
        filteredTodos = todos.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(task => task.completed);
    }

    // Loop dan buat elemen HTML
    filteredTodos.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        
        // Tambahkan kelas CSS untuk tugas yang sudah selesai
        if (task.completed) {
            li.classList.add('completed');
        }

        // Konten elemen li: Span (untuk toggle) dan Tombol Hapus
        li.innerHTML = `
            <span onclick="toggleComplete(${task.id})">${task.title}</span>
            <div>
                <button onclick="deleteTask(${task.id})" class="delete-btn">Hapus</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}// --- 2. LANJUTAN DEFINISI FUNGSI LOGIKA ---

// 3. Fitur Utama: Ubah data (Status Toggle)
function toggleComplete(id) {
    const taskIndex = todos.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        todos[taskIndex].completed = !todos[taskIndex].completed;
        // Panggil renderTasks dengan filter yang sedang aktif
        renderTasks(filterSelect.value); 
    }
}

// 3. Fitur Utama: Hapus data
function deleteTask(id) {
    todos = todos.filter(task => task.id !== id);
    // Panggil renderTasks dengan filter yang sedang aktif
    renderTasks(filterSelect.value); 
}


// --- 3. EVENT LISTENERS DAN INISIALISASI ---

// Event Listener untuk Form Submit (Tambah Tugas)
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = taskInput.value.trim();

    // Feedback ke Pengguna: Validasi sederhana (field wajib diisi)
    if (title === "") {
        alert("Judul tugas tidak boleh kosong!");
        return; 
    }
    
    // 3. Fitur Utama: Tambah data
    const newTask = {
        id: nextId++,
        title: title,
        completed: false
    };
    todos.push(newTask);

    taskInput.value = ''; // Reset input
    renderTasks(filterSelect.value); // Render ulang
});

// Event Listener untuk Filter (dipicu saat pilihan dropdown berubah)
filterSelect.addEventListener('change', function() {
    renderTasks(filterSelect.value);
});

// Panggilan Inisialisasi: Panggil renderTasks saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderTasks('all');
});