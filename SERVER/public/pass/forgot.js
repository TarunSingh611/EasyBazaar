const sub = document.getElementById("subBut")

sub.addEventListener("click",function(){
  const inp=document.getElementById("subIn")
  url="/forgotPass"
  const xhr = new XMLHttpRequest;
  xhr.open("POST",url)
  xhr.setRequestHeader("content-type","application/JSON")
  data={"email":inp.value}
  xhr.send(JSON.stringify(data))
  xhr.addEventListener("load",function(){
    if(xhr.status==200){
      if(xhr.response=='0'){
        let message =document.getElementById("message")
  
        message.innerText='Account does not exist'
        message.style.display = "block";
        message.style.background = '#ff0000';
        // Hide the message element after 2 seconds
        setTimeout(() => {
          message.style.display = "none";
        }, 1600);
        }
        else if(xhr.response=='1'){
            let message =document.getElementById("message")
  
            message.innerText='Check Email for the Link to change Password'
            message.style.display = "block";
            message.style.background = '#4CAF50';
            // Hide the message element after 2 seconds
            setTimeout(() => {
              message.style.display = "none";
            }, 1600);
        }
    }
  })
})