const sub = document.getElementById("subBut")

sub.addEventListener("click",function(){
  const inp=document.getElementById("subIn")
  url="/changePass"
  const xhr = new XMLHttpRequest;
  xhr.open("POST",url)
  xhr.setRequestHeader("content-type","application/JSON")
  data={"currpass":inp.value}
  xhr.send(JSON.stringify(data))
  xhr.addEventListener("load",function(){
    if(xhr.status==200){
      if(xhr.responseText=='1'){
        window.location.href = '/newPass'
        return
      }
      else{
          let message =document.getElementById("message")

          message.innerText='Wrong password entered, Try Again'
          message.style.display = "block";
          message.style.background = '#ff0000';
          // Hide the message element after 2 seconds
          setTimeout(() => {
            message.style.display = "none";
          }, 1600);
        }
    }
  })
})


const passToggle = document.getElementById("pass-toggle");
const pass=document.getElementById("subIn")

function togglePasswordVisibility() {

  if (pass.type === "password") {
    pass.type = "text";
    passToggle.classList.add("shut");
  } else {
    pass.type = "password";
    passToggle.classList.remove("shut");
  }
}