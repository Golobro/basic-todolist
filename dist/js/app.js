/* ====== Written By Gologa Virobo ====== */

const url = "https://jsonplaceholder.typicode.com/todos"
const li = qa("li")
const menu = qs("ul")
const form = qs('form')

// Data source
const getData = async server => {
  let res = await fetch(server)
  let data = await res.json()
  renderData(data)
}    

getData(url)

// Render API Data
const renderData = data => {
  li.forEach((idx, i) => {
    let { title } = data[i]        
    renderList(idx, title)
  })
}

const renderList = (el, text) =>{
    el.children[0].textContent = text
    el.innerHTML = el.children[0].outerHTML + el.children[1].outerHTML
}

// Get form data
form.addEventListener('submit', getTodos, false)  
function getTodos(e){
  e.preventDefault()
  let formData = new FormData(form)
  let todo = formData.get('todo-text')
  let liTag = crEl('li')

  // check if input text is empty
  if (!todo) {
    alert("Don't leave empty!")
    return
  }  

  // Create UI
  loadSpanTag(liTag, todo)
  loadIcons(liTag)
  menu.appendChild(liTag)

  this.reset()
}  

// load icons to the dom
const loadIcons = el => {
  // create El
  const icon = crEl("i", "fa fa-trash")
  // set Attr
  icon.setAttribute("onclick", "deleteList(this)")
  // Append To Li
  el.appendChild(icon)
}

// delete li tags
const deleteList = el => {
  el.parentElement.remove()
}

// load span tags to the dom
const loadSpanTag = (el, val) => {
  // create El
  const span = crEl('span', 'edit')
  // Set Attr
  span.textContent = val
  span.setAttribute('title', 'click to edit text')
  span.setAttribute('onclick', 'editNewElem(this)')
  // Append span tag to Li
  el.appendChild(span)
}

// edit list tags
const editNewElem = list => {
  // Create El
  const input = crEl("input", "edit-text")
  // Set Attr
  input.placeholder = "Type text and HIT Enter"
  input.title = 'Type and Hit Enter to make changes to the text'

  // Set Vars for DOM manipulation
  let listNodeName = list.nodeName
  let text = list.innerText  
  let parentEl = list.parentElement
  // add input to li tag
  if (listNodeName === 'SPAN') {
    input.value = text
    renderList(parentEl, text)
    parentEl.appendChild(input).focus()    
  } 

  // remove input when element is blurred
  input.addEventListener('blur', function(){this.remove()})

  // change current text on keypress
  input.onkeypress = function(e) {
    const defaultTxt = e.target.parentElement.textContent
    const newTxt = e.target.value
    // change text when enter key is pressed
    if (e.key === "Enter") {
      // overwrite default text with new one
      renderList(parentEl, newTxt)
      this.remove()
      if (newTxt === "") {
        // do not overwrite text if input blank
        renderList(parentEl, defaultTxt)
      } else if (this.value) {
        // clear input field
        this.value = ""
      }
    }
  }
}

// loop through li tags and apply created elems
li.forEach(el => {
  loadSpanTag(el)
  loadIcons(el)
})
