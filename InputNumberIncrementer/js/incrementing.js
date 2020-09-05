function add() {
  var value = document.getElementById("number").innerHTML;
  value = Number(value) + 1
  document.getElementById("number").innerHTML = value
}
function subtract() {
  var value = document.getElementById("number").innerHTML;
  value = Number(value) - 1
  document.getElementById("number").innerHTML = value
}

