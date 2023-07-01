const sub = document.getElementById("subBut")
const pass=document.getElementById("pass")
const pVer=document.getElementById("ver")
var passErr = document.getElementById("pass-err");
var pVErr = document.getElementById("pVer-err");

pass.addEventListener('input', function(e) {
  var pattern = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  var currentValue = e.target.value;
  var valid = pattern.test(currentValue);
  if (currentValue === "") { passErr.style.display = 'none'; } else if (valid) { passErr.style.display = 'none'; } else { passErr.style.display = 'block'; }
})

pVer.addEventListener('input', function(e) {
  var Pass = pass.value;
  var RePass = e.target.value;
  if (RePass === "") { pVErr.style.display = 'none'; } else if (Pass === RePass) { pVErr.style.display = 'none'; } else { pVErr.style.display = 'block'; }
})


sub.addEventListener("click",function(){

  var ver = 1;

  if (!(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(pass.value))) {
    ver = 0;
    passErr.style.display = 'block';
    pass.value = "";
}

if (pass.value !== pVer.value) {
    ver = 0;
    pVErr.style.display = 'block';
    pVer.value = "";
}
if (ver===1) {formSub(); }

})

function formSub(){

    const inp=document.getElementById("subIn")
  url="/newPass"
  const xhr = new XMLHttpRequest;
  xhr.open("POST",url)
  xhr.setRequestHeader("content-type","application/JSON")
  data={"newpass":pass.value}
  xhr.send(JSON.stringify(data))
  xhr.addEventListener("load",function(){
    if(xhr.status==200){
      window.location.href="/"
    }
  })

}



const passToggle = document.getElementById("pass-toggle");
const verToggle = document.getElementById("ver-toggle");

function togglePasswordVisibility(arg) {
  if(arg==1){
  if (pass.type === "password") {
    pass.type = "text";
    passToggle.classList.add("shut");
  } else {
    pass.type = "password";
    passToggle.classList.remove("shut");
  }}else{if (pVer.type === "password") {
    pVer.type = "text";
    verToggle.classList.add("shut");
  } else {
    pVer.type = "password";
    verToggle.classList.remove("shut");
  }}
}

