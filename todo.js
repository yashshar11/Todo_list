let tasks = [];
const taskList = document.getElementById('listItems');
const addTaskCurr = document.getElementById('add');
const tasksCounter = document.getElementById('tasksCounter');

console.log('Working');

// function fetchToDo(){
//    //GET access 
//   fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(function(response){
//       console.log(response);
//     });
// }

function addTasktoScreen(task) {
    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" data-id="${task.id}" ${task.completed ? 'checked' : ''  } class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.png" class="delete" data-id="${task.id}">
    `;

    taskList.append(li);
}

          

function renderTheList () {
    taskList.innerHTML='';

    for(let i=0;i<tasks.length;i++){
        addTasktoScreen(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;
}

function markTasksComplete (taskId) {
    const task= tasks.filter(function(task){
        return task.id === taskId;
    });

    if(task.length > 0){
        const CurrTask= task[0];

        CurrTask.completed= !CurrTask.completed;
        renderTheList();
        showAlert('Toggled Succesfully');
        return;
    }

    showAlert('Could not be toggled succesfully');

}



function addNewTask (task) {
    if(task){
        tasks.push(task);
        renderTheList();
        showAlert("Task Added Succesfully!");
        return;
    }
    showAlert('Task can not be added!')
}
function deletePrevTask (taskId) {
    const newTasks=tasks.filter(function(task){
        return task.id !==  taskId;
    });
    tasks=newTasks;
    renderTheList();
    showAlert("Task Deleted Succesfully!");

}

function showAlert(text) {
    alert(text);
}

function inputKeypress(ent){
    if(ent.key == 'Enter'){
        const title=ent.target.value;

        if(!title){
          showAlert("Task couldn't be empty");
          return;
        }
      const task={
        title,
        id:Date.now().toString(),
        completed:false
      }
      addNewTask(task);


    }
}
function listenclickListener(event){
    const target=event.target;
    
    if(target.className =='delete'){
       const taskId=target.dataset.id;
       console.log(taskId);
       deletePrevTask(taskId);
       return;
    }else if(target.className == 'custom-checkbox'){
        const taskId=target.id;
        markTasksComplete(taskId);
        return;
    }
}
function startingTheApp(){
    
    addTaskCurr.addEventListener('keyup',inputKeypress);
    document.addEventListener('click',listenclickListener);
}

startingTheApp();

