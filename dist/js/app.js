/* ====== Written By Gologa Virobo ====== */

const url = "https://jsonplaceholder.typicode.com/todos";
const li = qa("li");
const menu = qs("ul");
const form = qs('form');

// Data source
const getData = server => {
  fetch(server)
  .then(res => res.json())
  .then(data => renderData(data))
  .catch(err => console.warn(err));
};    

getData(url);

// Render API Data
const renderData = data => {  
  li.forEach((idx, i) => {
    let { title } = data[i];
    renderUI(idx, title);
  });
};

// Render API Data to DOM
const renderUI = (el, param) => {
  let iconRender = '<i class="fa fa-trash" onclick="deleteList(this)"></i>';
  el.innerHTML = `<span class="edit" title="click to edit text" onclick="editNewElem(this)">${param}</span>${iconRender}`;  
};

// Get form data
form.onsubmit = e => {
  e.preventDefault();
  getTodos();
}  

const getTodos = () => {
  let todo = qs('.form-text').value;
  let liTag = crEl('li');
  qs('.form-text').value = '';
  // check if input text is empty
  if (todo.length === 0) {
    alert("Don't leave empty!");
    return;
  }  
  loadIcons(liTag);
  loadSpanTag(liTag, todo);
  menu.appendChild(liTag);
}  

// load icons to the dom
const loadIcons = el => {
  // create El
  const icon = crEl("i");
  // set Attr
  icon.setAttribute("class", "fa fa-trash");
  icon.setAttribute("onclick", "deleteList(this)");
  // Append To Li
  el.appendChild(icon);
};

// delete li tags
const deleteList = el => {
  el.parentElement.remove();
};

// load span tags to the dom
const loadSpanTag = (el, val) => {
  // create El
  const span = crEl('span');
  // Create Txtnode
  const spanTxt = crTxt(val);
  // Set Attr
  span.setAttribute('class', 'edit');
  span.setAttribute('title', 'click to edit text');
  span.setAttribute('onclick', 'editNewElem(this)');
  // Append Txtnode to span tag
  span.appendChild(spanTxt);
  // Append span tag to Li
  el.appendChild(span);
}

// edit list tags
const editNewElem = list => {
  // Create El
  const input = crEl("input");
  // Set Attr
  input.className = "edit-text";
  input.placeholder = "Type text and HIT Enter";
  input.title = 'Type and Hit Enter to make changes to the text';

  // Set Vars for DOM manipulation
  let listNodeName = list.nodeName;
  let text = list.innerText;  
  let parentEl = list.parentElement;
  // add input to li tag
  if (listNodeName === 'SPAN') {
    input.value = text;
    renderUI(parentEl, text);
    parentEl.appendChild(input).focus();    
  } 
  // remove input when element is blurred
  input.addEventListener('blur', function(){this.remove();});
  // change current text on keypress
  input.onkeypress = function(e) {
    const defaultTxt = e.target.parentElement.textContent;
    const newTxt = e.target.value;
    // change text when enter key is pressed
    if (e.key === "Enter") {
      // overwrite default text with new one
      renderUI(parentEl, newTxt);
      this.remove();
      if (newTxt === "") {
        // do not overwrite text if input blank
        renderUI(parentEl, defaultTxt);
      } else if (this.value) {
        // clear input field
        this.value = "";
      }
    }
  };
};

// loop through li tags and apply created elems
li.forEach(el => {
  loadSpanTag(el);
  loadIcons(el);
});



