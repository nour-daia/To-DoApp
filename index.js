const todos = [
  {
    id: "1",
    title: "Display todos",
    description: "Render all todos from localStorage and show them on the page",
    time: "09:00",
    completed: true,
  },
  {
    id: "2",
    title: "Add new todo",
    description: "Create a form to add new todos with title, description, and time",
    time: "09:45",
    completed: true,
  },
  {
    id: "3",
    title: "Save todo to localStorage",
    description: "When a new todo is added, store it in localStorage",
    time: "10:15",
    completed: true,
  },
  {
    id: "4",
    title: "Mark todo as done/undone",
    description: "Add a checkbox to toggle the completed state of a todo",
    time: "10:45",
    completed: false,
  },
  {
    id: "5",
    title: "Update completion in localStorage",
    description: "When todo is toggled, update its completed value in localStorage",
    time: "11:15",
    completed: false,
  },
  {
    id: "6",
    title: "Delete todo",
    description: "Add a delete button to each todo and remove it from the list and storage",
    time: "11:45",
    completed: false,
  },
  {
    id: "7",
    title: "Edit todo",
    description: "Allow editing todo title, description, and time and save changes",
    time: "12:15",
    completed: false,
  },
  {
    id: "8",
    title: "Update todo in localStorage",
    description: "Save the edited todo back to localStorage",
    time: "12:45",
    completed: false,
  },
  {
    id: "9",
    title: "Show todo count",
    description: "Display the total number of todos currently in the list",
    time: "13:15",
    completed: false,
  },
  {
    id: "10",
    title: "Style todos with Tailwind CSS",
    description: "Improve the UI of todo cards, form, and buttons using Tailwind",
    time: "14:00",
    completed: false,
  },
];

    const divlist = document.getElementById("todolist");

function createCard(title, description, time, completed = false) {
      const card = document.createElement("div");
      card.className = "Card bg-white border p-4 rounded-lg shadow flex items-start gap-4 justify-between";
      card.innerHTML = `
        <div class="flex gap-4">
          <input type="checkbox" class="mt-1 w-5 h-5 accent-green-500" ${completed ? "checked" : ""}>
          <div>
            <h2 class="text-xl font-semibold todo-title">${title}</h2>
            <p class="text-gray-600 todo-desc">${description}</p>
            <div class="text-sm text-gray-500 mt-1 todo-time">${time}</div>
          </div>
        </div>

        <div class="space-x-2">
          <button class="edit-btn text-blue-500 hover:text-blue-700 font-bold text-sm">Edit</button>
          <button class="delete-btn text-red-500 hover:text-red-700 font-bold text-sm">Delete</button>
        </div>
      `;

      const titleElemtoedit = card.querySelector(".todo-title")
      const descElemtoedit = card.querySelector(".todo-desc")
      const timeElemtoedit = card.querySelector(".todo-time")

      const editBtn = card.querySelector('.edit-btn');
      editBtn.addEventListener('click', () => EditTodo(card, titleElemtoedit, descElemtoedit, timeElemtoedit));

      const deleteBtn = card.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
        card.remove();
        totalcount();
        alert("ToDo deleted");
      });
     totalcount();
      divlist.appendChild(card);
    }
    todos.forEach(todo => {
      createCard(todo.title, todo.description, todo.time, todo.completed);
    });



    let Editcard = null;
    const addBtn = document.getElementById("addBtn");
    const popupForm = document.getElementById("popupForm");
    const todoForm = document.getElementById("todoForm");
  addBtn.addEventListener("click", () => {
      Editcard = null;
      popupForm.classList.remove("hidden");
    });
    const closeBtn = document.getElementById("closeBtn");

  closeBtn.addEventListener("click", () => {
      popupForm.classList.add("hidden");
      todoForm.reset();
    });


    const titleInput = document.getElementById("title");
    const descInput = document.getElementById("description");
    const timeInput = document.getElementById("time");

     function EditTodo(card, titleElem, descElem, timeElem) {
      Editcard = { card, titleElem, descElem, timeElem };
      titleInput.value = titleElem.textContent;
      descInput.value = descElem.textContent;
      timeInput.value = timeElem.textContent.trim();
      popupForm.classList.remove("hidden");
    }



    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = titleInput.value;
      const description = descInput.value;
      const time = timeInput.value;

      if (Editcard) {
        Editcard.titleElem.textContent = title;
        Editcard.descElem.textContent = description;
        Editcard.timeElem.textContent = time;
        alert("Edit suc");
        Editcard = null;
      } else {
        createCard(title, description, time);
        totalcount();
        alert("Add Suc");
      }

      popupForm.classList.add("hidden");
      todoForm.reset();
    });

    function totalcount(){
  const count = divlist.querySelectorAll(".Card").length;
      document.getElementById("total").textContent = count;
    }
