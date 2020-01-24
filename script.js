
//selectors
let form = document.querySelector('#form');
let filter = document.getElementById('form-filter');
let list = document.querySelector('.list-group');
let todos;

//object
filterObject = {
    text: ''
}

//decide about todos
if(localStorage.getItem('todos') !== null){
    todos = JSON.parse(localStorage.getItem('todos'));
    renderUserInteFace(todos , filterObject);
}else{
    todos = [];
}
//function
//1.showAlert()

function showAlert(str){
    //1.create
    const div = document.createElement('div');
    //2.configure
    div.textContent = str;
    div.className = 'alert alert-info animate';
    //3.put the div in the  right place
    document.querySelector('#app .container').insertBefore(div , form);
    // document.getElementById('app').insertBefore(div , form);
    
    setTimeout(function(){
        div.remove();
    } ,3000)

}
//2.Updata User IterFace
function renderUserInteFace(tds , filter){
    list.innerHTML = '';
    
    tds = JSON.parse(localStorage.getItem('todos'));
    tds = tds.filter(function(todo){
        return todo.todo.includes(filter.text);
    })
    tds.forEach(function(todo){
        //1.create element
        let li = document.createElement('li');
        let btn = document.createElement('button');
        //2.configure element
        //li
        li.textContent = todo.todo;
        li.className = 'list-group-item d-flex align-items-center';
        //button
        btn.textContent = 'delete';
        btn.className = 'btn btn-danger ml-auto';
        btn.addEventListener('click' , function(e){

            //0. li style change
            e.target.parentNode.classList.add('animate-li');
            
            setTimeout(function(){
            //1. delete from todo
            let deleteData = e.target.parentNode.childNodes[0].textContent;
            let findedIndex = tds.findIndex(function(todo , index) {
                return todo.todo === deleteData;
            });
            tds.splice(findedIndex , 1);
            //2. save todo
            localStorage.setItem('todos' , JSON.stringify(tds));
            //3. renderUserInteface with new todo
            renderUserInteFace(tds , filterObject);
            todos = tds;
            } , 1000);
        })
        //3.put the element on user interface
        li.appendChild(btn);
        list.appendChild(li);
    });
}

//Event Listeners

//form
form.addEventListener('submit', function(e){
    let data = document.querySelector('#form-data');
    if(data.value !== ''){
    //update todo
    todos.push({todo:data.value});
    //save todo on localStorage
    localStorage.setItem('todos' , JSON.stringify(todos));
    //render UI
    renderUserInteFace(todos , filterObject);
    //clean the input field
    data.value = '';
    }
    else{
        showAlert('Please Fill out the forms');
    }

    e.preventDefault();
})

//form-filter 
filter.addEventListener('input' , function(e){
    filterObject.text = e.target.value;
    renderUserInteFace(todos , filterObject);
})
