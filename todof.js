var input;
var ongoingTable;
var completedTable;
let ongoing_tasks = new Array();
let completed_tasks = new Array();

document.addEventListener("DOMContentLoaded", function() {
    input = document.getElementById("Input");
    ongoingTable = document.getElementById("ongoing_table");
    completedTable = document.getElementById("completed_table");
});

function addTask() {
    var input_value = input.value;
    ongoing_tasks.push(input_value);
    input.value = "";
    var newRow = ongoingTable.insertRow();
    var taskCell = newRow.insertCell(0);
    var actionCell = newRow.insertCell(1);
    var editCell = newRow.insertCell(2);
    taskCell.textContent = input_value;
    actionCell.innerHTML = '<button onclick="markAsDone(this)">Mark as Done</button>';
    editCell.innerHTML = '<button onclick="editTask(this)">Edit</button>';

    document.getElementById("ongoing").style.display = "block";
}

function markAsDone(button) {
    var row = button.parentElement.parentElement;
    var taskText = row.cells[0].textContent;

    ongoing_tasks = ongoing_tasks.filter(task => task !== taskText);

    completed_tasks.push(taskText);

    ongoingTable.deleteRow(row.rowIndex);

    var newRow = completedTable.insertRow();
    var taskCell = newRow.insertCell(0);
    var actionCell = newRow.insertCell(1);
    var editCell = newRow.insertCell(2);
    taskCell.textContent = taskText;
    actionCell.innerHTML = '<button onclick="markAsOngoing(this)">Unmark</button>';
    editCell.innerHTML = '<button onclick="editTask(this)">Edit</button>';

    // Check if the "Ongoing tasks" section should be displayed or hidden
    if (ongoing_tasks.length === 0) {
        document.getElementById("ongoing").style.display = "none";
    }

    // Display the "Completed tasks" section
    document.getElementById("completed").style.display = "block";
}

function markAsOngoing(button) {
    var row = button.parentElement.parentElement;
    var taskText = row.cells[0].textContent;

    // Remove the task from completed tasks
    completed_tasks = completed_tasks.filter(task => task !== taskText);

    // Move the task back to ongoing tasks
    ongoing_tasks.push(taskText);

    // Remove the row from the completed tasks table
    completedTable.deleteRow(row.rowIndex);

    // Add the task to the ongoing tasks table (similar to adding a new row)
    var newRow = ongoingTable.insertRow();
    var taskCell = newRow.insertCell(0);
    var actionCell = newRow.insertCell(1);
    var editCell = newRow.insertCell(2);
    taskCell.textContent = taskText;
    actionCell.innerHTML = '<button onclick="markAsDone(this)">Mark as Done</button>';
    editCell.innerHTML = '<button onclick="editTask(this)">Edit</button>';

    // Check if the "Completed tasks" section should be displayed or hidden
    if (completed_tasks.length === 0) {
        document.getElementById("completed").style.display = "none";
    }

    // Display the "Ongoing tasks" section
    document.getElementById("ongoing").style.display = "block";
}

function editTask(button) {
    const row = button.parentElement.parentElement;
    var taskText = row.cells[0].textContent;
    
    // Check if the task is in the completed tasks array
    if (completed_tasks.includes(taskText)) {
        alert("This task is already completed and cannot be edited.");
        return;
    }

    const newTask = prompt('Edit task:', taskText);
    if (newTask !== null) {
        row.cells[0].textContent = newTask;
    }
}