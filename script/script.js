   let taskList = [];

    function addTask() {
      const input = document.getElementById("todo-input");
      const task = input.value.trim();
      if (task) {
        taskList.push(task);
        renderTasks();
        input.value = "";
      }
    }

    function renderTasks() {
      const list = document.getElementById("todo-list");
      list.innerHTML = "";
      taskList.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;
        list.appendChild(li);
      });
    }

    function saveList() {
      if (taskList.length === 0) return;

      const savedDiv = document.createElement("div");
      savedDiv.className = "saved-list";
      savedDiv.style.top = Math.random() * 300 + "px";
      savedDiv.style.left = Math.random() * 300 + "px";

      const title = document.createElement("h3");
      title.textContent = "To-Do List";
      savedDiv.appendChild(title);

      const ul = document.createElement("ul");
      taskList.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        ul.appendChild(li);
      });
      savedDiv.appendChild(ul);

      const date = document.createElement("small");
      date.textContent = "Saved on: " + new Date().toLocaleString();
      savedDiv.appendChild(date);

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = () => savedDiv.remove();
      savedDiv.appendChild(delBtn);

      document.body.appendChild(savedDiv);

      makeDraggable(savedDiv);

      taskList = [];
      renderTasks();
    }

    function makeDraggable(element) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      element.onmousedown = dragMouseDown;

      function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }