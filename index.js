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

  const leftDiv = document.createElement("div");
  leftDiv.className = "flex gap-4";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "mt-1 w-5 h-5 accent-green-500";
  if (completed) checkbox.checked = true;

  const textDiv = document.createElement("div");

  const titleElem = document.createElement("h2");
  titleElem.className = "text-xl font-semibold todo-title";
  titleElem.textContent = title;

  const descElem = document.createElement("p");
  descElem.className = "text-gray-600 todo-desc";
  descElem.textContent = description;

  const timeElem = document.createElement("div");
  timeElem.className = "text-sm text-gray-500 mt-1 todo-time";
  timeElem.textContent = time;

  textDiv.appendChild(titleElem);
  textDiv.appendChild(descElem);
  textDiv.appendChild(timeElem);

  leftDiv.appendChild(checkbox);
  leftDiv.appendChild(textDiv);

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "space-x-2";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn text-blue-500 hover:text-blue-700 font-bold text-sm";
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn text-red-500 hover:text-red-700 font-bold text-sm";
  deleteBtn.textContent = "Delete";

  buttonDiv.appendChild(editBtn);
  buttonDiv.appendChild(deleteBtn);

  card.appendChild(leftDiv);
  card.appendChild(buttonDiv);

  editBtn.addEventListener('click', () => EditTodo(card, titleElem, descElem, timeElem));

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
