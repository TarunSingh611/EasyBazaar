function admin() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/admin', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {


 
  if(xhr.responseText=="1"){
    let message = document.getElementById("message");
    message.innerText = 'Admins Only :\nuser is not Authorized to visit this page';
    message.style.display = "block";
    message.style.background = '#ff0000';

    setTimeout(() => {
      message.style.display = "none";
    }, 1600);
      }
  else if(xhr.responseText=="2"){
    
    window.location.href="/login";
        }

else{
  {
    window.location.href="/admin"
  }
}

}
    }

  
  xhr.send();
}
