let computers = JSON.parse(localStorage.getItem("computers")) || [];

document.addEventListener("DOMContentLoaded", () => {
    const computerList = document.getElementById("computerList");
    if (computerList) {
        displayComputers();
    }

    const addForm = document.getElementById("computerForm");
    if (addForm) {
        addForm.addEventListener("submit", addComputer);
    }

    const editForm = document.getElementById("editComputerForm");
    if (editForm) {
        loadEditData();
        editForm.addEventListener("submit", updateComputer);
    }

    loadViewData();
});

function displayComputers() {
    const computerList = document.getElementById("computerList");
    computerList.innerHTML = "";
    computers.forEach((comp, index) => {
        computerList.innerHTML += `
            <tr>
                <td>${comp.author}</td>
                <td>${comp.name}</td>
                <td>${comp.brand}</td>
                <td>${comp.serviceDate}</td>
                <td>
                    <a href="view.html?id=${comp.id}" class="btn btn-info btn-sm">View</a>
                    <a href="edit.html?id=${comp.id}" class="btn btn-warning btn-sm">Edit</a>
                    <button class="btn btn-danger btn-sm" onclick="deleteComputer(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function addComputer(e) {
    e.preventDefault();
    const author = document.getElementById("author").value;
    const name = document.getElementById("name").value;
    const brand = document.getElementById("brand").value;
    const serviceDate = document.getElementById("serviceDate").value;
    const description = document.getElementById("description").value;

    const newComputer = {
        id: computers.length > 0 ? computers[computers.length - 1].id + 1 : 1,
        author,
        name,
        brand,
        serviceDate,
        description
    };

    computers.push(newComputer);
    localStorage.setItem("computers", JSON.stringify(computers));
    window.location.href = "index.html";
}

function deleteComputer(index) {
    if (confirm("Are you sure?")) {
        computers.splice(index, 1);
        localStorage.setItem("computers", JSON.stringify(computers));
        displayComputers();
    }
}

function loadEditData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get("id"));
    const computer = computers.find(c => c.id === id);

    if (computer) {
        document.getElementById("editId").value = computer.id;
        document.getElementById("editAuthor").value = computer.author;
        document.getElementById("editName").value = computer.name;
        document.getElementById("editBrand").value = computer.brand;
        document.getElementById("editServiceDate").value = computer.serviceDate;
        document.getElementById("editDescription").value = computer.description;
    }
}

function updateComputer(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById("editId").value);
    const author = document.getElementById("editAuthor").value;
    const name = document.getElementById("editName").value;
    const brand = document.getElementById("editBrand").value;
    const serviceDate = document.getElementById("editServiceDate").value;
    const description = document.getElementById("editDescription").value;

    const index = computers.findIndex(c => c.id === id);
    if (index !== -1) {
        computers[index] = { id, author, name, brand, serviceDate, description };
        localStorage.setItem("computers", JSON.stringify(computers));
        window.location.href = "index.html";
    }
}

function loadViewData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get("id"));
    const computer = computers.find(c => c.id === id);

    if (computer) {
        document.getElementById("viewAuthor").textContent = computer.author;
        document.getElementById("viewName").textContent = computer.name;
        document.getElementById("viewBrand").textContent = computer.brand;
        document.getElementById("viewServiceDate").textContent = computer.serviceDate;
        document.getElementById("viewDescription").textContent = computer.description;
    }
}
