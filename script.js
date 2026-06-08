const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const todoList = document.getElementById('todo-list');
const filterRadios = document.querySelectorAll('input[name="todo-filter"]');

let currentFilter = 'all';

// 1. Gestionnaire de soumission du formulaire d'ajout
todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        createTaskElement(taskText);
        taskInput.value = "";
        taskInput.focus();

        // Réappliquer le filtre en cours
        filterTasks(currentFilter);
    }
});

// 2. Fonction de génération d'une tâche
function createTaskElement(text) {
    const li = document.createElement('li');

    // 🆕 Création de la case à cocher
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';

    // Zone de texte
    const taskSpan = document.createElement('span');
    taskSpan.textContent = text;
    taskSpan.className = 'task-text';

    // Écouteur sur le changement de la case à cocher
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        filterTasks(currentFilter); // Rafraîchir l'affichage selon le filtre actif
    });

    // Bouton de suppression
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', function () {
        li.style.opacity = '0';
        li.style.transform = 'translateX(20px)';
        li.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            li.remove();
        }, 300);
    });

    // Assemblage dans l'ordre : Case -> Texte -> Bouton Supprimer
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);

    // Ajout en haut de la liste
    todoList.appendChild(li);
}

// 3. Gestionnaire des filtres d'options
filterRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        if (this.checked) {
            currentFilter = this.value;
            filterTasks(currentFilter);
        }
    });
});

// 4. Fonction de filtrage des tâches
function filterTasks(filter) {
    const tasks = todoList.querySelectorAll('li');

    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'active':
                if (task.classList.contains('completed')) {
                    task.style.display = 'none';
                } else {
                    task.style.display = 'flex';
                }
                break;
            case 'completed':
                if (!task.classList.contains('completed')) {
                    task.style.display = 'none';
                } else {
                    task.style.display = 'flex';
                }
                break;
        }
    });
}