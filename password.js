const add = document.querySelector('form');
add.addEventListener('submit', (event) => {
    event.preventDefault();
    const Title = event.target.Title.value;
    const Password = event.target.Password.value;
    obj = {
        Title: Title,
        Password: Password
    }
    increment();
    axios
        .post("https://crudcrud.com/api/f85b2b006571438d9d1a71a4601c8fae/PasswordKeeper", obj)
        .then((result) => {
            showOnScreen(result.data);
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        })
    document.querySelector('#Title').value = "";
    document.querySelector('#Password').value = "";
})
const Filter=document.querySelector('#Search');
Filter.addEventListener('keyup',(event)=>{
    event.preventDefault();
    const keyValue=event.target.value.toLowerCase();
    const List=document.getElementsByClassName('listItem');
    for(let i=0;i<List.length;i++){
        const currentList=List[i].firstChild.textContent.toLocaleLowerCase();
        if(currentList.indexOf(keyValue)===-1)
        List[i].style.display='none';
        else
        List[i].style.display='flex';
    }
})
function showOnScreen(obj) {
    const ul = document.querySelector('ul');
    const list = document.createElement('li');
    const listtext = document.createTextNode(`${obj.Title}-${obj.Password}`);
    list.appendChild(listtext);
    list.className='listItem';
    const deletebtn = document.createElement('button');
    const dlttext = document.createTextNode('Delete');
    deletebtn.type = 'button';
    deletebtn.appendChild(dlttext);
    const editbtn = document.createElement('button');
    const edttext = document.createTextNode('Edit');
    editbtn.type = 'button';
    editbtn.appendChild(edttext);
    list.appendChild(deletebtn);
    list.appendChild(editbtn);
    deletebtn.addEventListener('click', (event) => {
        event.preventDefault();
        const listitem = event.target.parentElement;
        listitem.remove();
        decrement();
        axios
        .delete(`https://crudcrud.com/api/f85b2b006571438d9d1a71a4601c8fae/PasswordKeeper/${obj._id}`)
        .then((result)=>console.log(result))
        .catch((err)=>console.log(err));
    })
    editbtn.addEventListener('click', (event) => {
        event.preventDefault();
        decrement();
        axios
        .delete(`https://crudcrud.com/api/f85b2b006571438d9d1a71a4601c8fae/PasswordKeeper/${obj._id}`)
        .then((result)=>console.log(result))
        .catch((err)=>console.log(err));
        document.querySelector('#Title').value = obj.Title;
        document.querySelector('#Password').value = obj.Password;
        const listitem = event.target.parentElement;
        listitem.remove();
    })
    ul.appendChild(list);
}var count=0;
const para=document.querySelector('p');
function increment(){
  count++;  
  para.innerText=`Total passwords: ${count}`;
}
function decrement(){
    count--;
   para.innerText=`Total passwords: ${count}`; 
}