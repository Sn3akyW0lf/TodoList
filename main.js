
const myForm = document.querySelector('#my-form');
const todo = document.querySelector('#todo');
const desc = document.querySelector('#desc');
const msg_todo = document.querySelector('#msg_todo');
const msg_desc = document.querySelector('#msg_desc');
const tblTodoPending = document.querySelector('#tblTodoPending');
const tblTodoDone = document.querySelector('#tblTodoDone');


myForm.addEventListener('submit', onSubmit);

window.addEventListener('DOMContentLoaded', () => {
    axios
        .get('https://crudcrud.com/api/625a693c42cb4ffabfefc0c756bda80f/todoData')
        .then(response => {
            response.data.forEach(res => {
                
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                let td5 = document.createElement('td');
                let del = document.createElement('button');
                let done = document.createElement('button');

                td1.appendChild(document.createTextNode(`${res._id}`));
                td1.className = "d-none";
                td2.appendChild(document.createTextNode(`${res.todo}`));
                td3.appendChild(document.createTextNode(`${res.desc}`));
                td4.appendChild(document.createTextNode(`${res.status}`));

                del.className = 'btn btn-danger btn-sm float-right delete';
                del.appendChild(document.createTextNode('X'));
                del.addEventListener('click', function(){ deleteTodo(td1); });

                done.className = 'btn btn-info btn-sm float-right done';
                done.appendChild(document.createTextNode('✓'));
                done.addEventListener('click', function(){ doneTodo(td1); });

                td5.appendChild(done);
                td5.appendChild(del);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);

                if (res.status === 'Done') {
                    tblTodoDone.appendChild(tr);
                } else {
                    tblTodoPending.appendChild(tr);
                }

            });
        })
})


function onSubmit(e) {
    e.preventDefault();

    if (todo.value === '') {
        msg_todo.style.color = 'chocolate';
        msg_todo.style.background = 'beige';
        msg_todo.innerHTML = 'Please Enter To-Do Task Name!';
        setTimeout(() => msg_todo.remove(), 3000);
    } else if (desc.value === '') {
        msg_desc.style.color = 'chocolate';
        msg_desc.style.background = 'beige';
        msg_desc.innerHTML = 'Please Enter To-Do Task Description!';
        setTimeout(() => msg_desc.remove(), 3000);
    } else {
        let todoObj = {
            todo: todo.value,
            desc: desc.value,
            status: 'Pending'
        };

        axios
            .post('https://crudcrud.com/api/625a693c42cb4ffabfefc0c756bda80f/todoData', todoObj)
            .then(res => {
                console.log(res.data);
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                let td5 = document.createElement('td');
                let del = document.createElement('button');
                let done = document.createElement('button');

                td1.appendChild(document.createTextNode(`${res.data._id}`));
                td1.className = "d-none";
                td2.appendChild(document.createTextNode(`${res.data.todo}`));
                td3.appendChild(document.createTextNode(`${res.data.desc}`));
                td4.appendChild(document.createTextNode(`${res.data.status}`));

                del.className = 'btn btn-danger btn-sm float-right delete';
                del.appendChild(document.createTextNode('X'));
                del.addEventListener('click', function(){ deleteTodo(td1); });

                done.className = 'btn btn-info btn-sm float-right done';
                done.appendChild(document.createTextNode('✓'));
                done.addEventListener('click', function(){ doneTodo(td1); });

                td5.appendChild(done);
                td5.appendChild(del);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tblTodoPending.appendChild(tr);

                todo.value = '';
                desc.value = '';
            })
    }
}

function doneTodo(id) {
    console.log(id.parentElement)
    let tr = id.parentElement;
    let tbl = tr.parentElement;

    let tds = tr.children;
    let texts = [];
    for (let i = 0; i < tds.length; i++) {
        texts.push(tds[i].innerHTML);
    }
    console.log(texts);
    axios
        .put(`https://crudcrud.com/api/625a693c42cb4ffabfefc0c756bda80f/todoData/${id.innerHTML}`, {
            todo: texts[1],
            desc: texts[2],
            status: 'Done'
        })
        .then(res => {
            console.log(res)
            tbl.removeChild(tr);
            tblTodoDone.appendChild(tr);
        })
    
}

function deleteTodo(id) {
    console.log(id.parentElement.parentElement);

    let tr = id.parentElement;
    let tbl = tr.parentElement;
    axios
        .delete(`https://crudcrud.com/api/625a693c42cb4ffabfefc0c756bda80f/todoData/${id.innerHTML}`)
        .then(res => {
            console.log(res);
            tbl.removeChild(tr);
        })
}