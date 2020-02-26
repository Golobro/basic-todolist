// selectors
function qs(qs) {
  return document.querySelector(qs)
}

function qa(qa) {
  return document.querySelectorAll(qa)
}

function crEl(el, className) {
  let elm = document.createElement(el)
  if(className){
    elm.setAttribute('class', className)
  }
  return elm
}
