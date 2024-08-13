class TodoItem {
    constructor(text, completed = false) {
        //Создаёт новый экземпляр TodoList c заданным текстом и состоянием выполнения (по умолчанию - не выполнено)
        this.text = text;
        this.completed = completed;
    }
}

class TodoList {
    constructor() {
        //Создание экземпляра с пустым массивом задач
        this.items = [];
    }

    //Добавление новой задачи в список задачи
    addItem(item) {
        this.items.push(item); // добавление задачи в массив
        this.renderItem(item); // отображение задачи на странице
    }

    // Добавление задачи в контейнер
    renderItem(item) {
        const todoItem = document.createElement("div");
        todoItem.classList.add('todo-item');

        //Изменения состояния
        if (item.completed) {
            todoItem.classList.add('completed')
        }

        //Checkbox для изменения состояния 
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.checked = item.completed;
        checkbox.addEventListener('change', () => this.toggleItemComplection(this.items.indexOf(item)))

        //текст задачи
        const text = document.createElement('span');
        text.textContent = item.text;

        //кнопка удаления задачи
        const deleteButton = document.createElement('span');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Удалить';
        deleteButton.style.display = item.completed ? 'none' : 'block';
        deleteButton.addEventListener("click", () => this.deleteItem(this.items.indexOf(item)));

        todoItem.append(checkbox);
        todoItem.append(text);
        todoItem.append(deleteButton);

        document.querySelector('.todo-list').append(todoItem);
    }


    toggleItemComplection(index) {
        this.items[index].completed = !this.items[index].completed;
        this.renderList()
    }

    //Очищает все задачи и отображает точный список актуальных задач
    renderList() {
        document.querySelector('.todo-list').innerHTML = '';
        this.items.forEach(item => this.renderItem(item));
    }

    deleteItem(index) {
        this.items.splice(index, 1);
        this.renderList();
    }
}

const todolist = new TodoList();
document.querySelector("#add-task").addEventListener("click", () => {
    const textInput = document.querySelector("#task-input");
    const textTask = textInput.value.trim();

    if (textTask != "") {
        const newItem = new TodoItem(textTask);
        //Вызов метода добавления элемента
        todolist.addItem(newItem);
        textInput.value = "";
    }
})