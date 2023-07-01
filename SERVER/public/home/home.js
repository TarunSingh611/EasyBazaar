let butD=document.getElementsByClassName('show-details-btn')
let load_more=document.getElementById('loadMore')
let close =document.getElementsByClassName('close')
// let prodDetail =[]
let cartIcon = document.getElementById("cartIcon")
//load more button
load_more.addEventListener("click", load5)


//loading more items
function load(callback){
  let loaded =document.getElementsByClassName("product-card")
if(loaded){loaded=loaded.length}else{loaded=0}


  let xhr=new XMLHttpRequest();
  xhr.onload=()=>{
    callback(JSON.parse(xhr.responseText).products);
  }
  xhr.open("POST","/loadMore")
  xhr.setRequestHeader('Content-type', 'application/JSON')
  let data={loaded}
  xhr.send(JSON.stringify(data))
}


// append a product
function appendProd(item){
let plist=document.getElementById("product-list")

  let pcard=document.createElement("DIV")
  pcard.setAttribute("class","product-card")
  let pimg=document.createElement("DIV")
  pcard.setAttribute("id",item.id)
  pimg.setAttribute("class","product-image")
  let img=document.createElement("img")
  img.setAttribute("src",item.image)
  pimg.appendChild(img)
  pcard.appendChild(pimg)

  let pdet=document.createElement("DIV")
  pdet.setAttribute("class","product-details")
  let pname=document.createElement("DIV")
  pname.setAttribute("class","product-name")
  let h3=document.createElement("h3")
  h3.innerText=item.name
  let h3_2=document.createElement("h3")
  h3_2.innerText="$"+item.price

  let H4=document.createElement("h6")
  if(parseInt(item.stock)>5){
  H4.innerText="In stock left : "+item.stock
  H4.setAttribute("style","color:grey")
}
  else if(parseInt(item.stock)>0){
    H4.innerText="In stock left : "+item.stock
    H4.setAttribute("style","color:red")
  }

  else{
    H4.innerText="out of stock"
    H4.setAttribute("style","color:red")
  }



  let but=document.createElement("button")
  but.setAttribute("class","show-details-btn")
  but.setAttribute("onclick","showDetails(this)")
  but.innerText="Show details"



  let inc=document.createElement("button")
  inc.setAttribute("class","inc")
inc.setAttribute("onclick","incItem(this)")
  inc.textContent="+"

  let dec=document.createElement("button")
  dec.setAttribute("class","dec")
  dec.setAttribute("onclick","decItem(this)")
  dec.textContent="-"

  let done=document.createElement("button")
  done.setAttribute("class","done")
  done.setAttribute("onclick","doneCart(this)")
  done.textContent="Done"

  let canc=document.createElement("button")
  canc.setAttribute("onclick","canc(this)")
  canc.setAttribute("class","canc")
 canc.textContent="Cancel"

  let no=document.createElement("div")
  no.setAttribute("class","no")
  no.textContent=1

  let butdiv=document.createElement("div")
  butdiv.setAttribute("class","butdiv")
  butdiv.appendChild(done)
  butdiv.appendChild(canc)


  let qdiv=document.createElement("div")
  qdiv.setAttribute("class","qdiv")
  qdiv.appendChild(dec)
  qdiv.appendChild(no)
  qdiv.appendChild(inc)

  let condiv=document.createElement("div")
  condiv.setAttribute("class","condiv")
  condiv.appendChild(qdiv)
  condiv.appendChild(butdiv)






  let but2=document.createElement("button")
  but2.setAttribute("class","add2cart")
  but2.setAttribute("onclick","addCart(this)")
  but2.innerText="Add to Cart"

  let but6=document.createElement("button")
  but6.setAttribute("class","gocart")
  but6.setAttribute("onclick","Go2Cart()")
  but6.innerText="GO to Cart"

  pname.appendChild(h3)
  pname.appendChild(h3_2)
  pname.appendChild(H4)
  pname.appendChild(but)
  pname.appendChild(condiv)
  pname.appendChild(but2)
pname.appendChild(but6)
  pdet.appendChild(pname)
  pcard.appendChild(pdet)


  plist.appendChild(pcard)
}


// show more
// function to show details 


function showDetails(arg){
  let hidCard=document.getElementById("pop")
  let target=arg.parentNode.parentNode.parentNode
  let argId=target.id

getProd(argId,function(prod){

  
  let pop=genPop(prod)
  hidCard.appendChild(pop)
  hidCard.setAttribute("class","show")

});

}

/////get_prod
function getProd(id,cb){
let xhr= new XMLHttpRequest();
xhr.open("POST","/showDetail")
xhr.setRequestHeader("Content-Type","application/json")
xhr.onload=()=>{
 cb(JSON.parse(xhr.responseText).prod[0])
}
data={id}
xhr.send(JSON.stringify(data))
}



function genPop(item)
{
let divHid=document.createElement("div")
divHid.setAttribute("class","hid-container")

  let hidImg=document.createElement("img")
  hidImg.setAttribute("class","popImg")
  hidImg.setAttribute("src",item.image)
  hidImg.setAttribute("alt",item.name)
  let nameHid=document.createElement("h1")
  nameHid.innerText=item.name
  let Hid3=document.createElement("h3")
  Hid3.innerText=item.price
  let Hid5=document.createElement("h5")
  Hid5.innerText=item.description
  let Hid4=document.createElement("h4")
  Hid4.innerText=item.category

let closeDiv=document.createElement("div")
let close =document.createElement("label")
close.setAttribute("class","close")
close.innerHTML="close"
closeDiv.setAttribute("onclick","closefun(this)")
closeDiv.appendChild(close)

divHid.appendChild(hidImg)
divHid.appendChild(nameHid)
divHid.appendChild(Hid3)
divHid.appendChild(Hid5)
divHid.appendChild(Hid4)

divHid.appendChild(closeDiv)
return divHid
}
//closebutton
function closefun(arg)
{
  let target=arg.parentNode.parentNode
  target.innerHTML=null
  target.setAttribute("class","hid")
}

////////////////////////////////////////////////////
//////////////////////cart//////////////////////////
///////////////////////////////////////////////////

function doneCart(arg){
  let target=arg.parentNode.parentNode.parentNode.parentNode.parentNode
  let itemId=target.id



  let xhr=new XMLHttpRequest();
  xhr.onload=()=>{
if(xhr.responseText=='0'){
  window.location.href = '/login'
  return
}
else{
    let message =document.getElementById("message")
    // if((xhr.responseText).length<20){
    message.innerText=xhr.responseText
    message.style.display = "block";
     
    arg.parentNode.parentNode.style.display='none'
    arg.parentNode.parentNode.parentNode.children[5].style.display='block'

    // Hide the message element after 2 seconds
    setTimeout(() => {
      message.style.display = "none";
    }, 1000);

  }}

  xhr.open("POST","/addCart")
  no=parseInt(arg.parentNode.parentNode.children[0].children[1].textContent)
  xhr.setRequestHeader('Content-type', 'application/JSON')
  let data={itemId,no}
  xhr.send(JSON.stringify(data))

  ///////////////////////////////////////


}



/////////////inc decrease
function incItem(inc){
  let id=inc.parentNode.parentNode.parentNode.parentNode.parentNode.id;
let Q=inc.parentNode.children[1]
  let arg = parseInt(Q.textContent);
  arg++

  itemNo(arg,id,Q)
}

function decItem(dec){
let id=dec.parentNode.parentNode.parentNode.parentNode.parentNode.id;

  let Q=dec.parentNode.children[1]

  let arg = parseInt(Q.textContent);
  if (arg == 1) {
      return;
  } else {
      arg--;
     
        
  }
  itemNo(arg,id,Q)
}

///////////////

//item no

function itemNo(Qn,itemId,Q){
  
  getProd(itemId,function(prod){
 
  if(parseInt(prod.stock)<parseInt(Qn)){
    message.innerText="Product Quantity exceeds stock limits"
    message.style.display = "block";

    // Hide the message element after 2 seconds
    setTimeout(() => {
      message.style.display = "none";
    }, 1000);
    return;
  }
  else{

{Q.textContent = Qn;}
}})}









///////////////////////////////////////////////////
////////////////////addCart////////////////////////
/////////////////////////////////////////////////////

function addCart(arg){
  let target=arg.parentNode.parentNode.parentNode
  let itemId=target.id
  
  getProd(itemId,function(prod){
  if(prod.stock<1){
    let message =document.getElementById("message")
    message.innerText="Item is Out of Stock"
    message.style.display = "block";

    // Hide the message element after 2 seconds
    setTimeout(() => {
      message.style.display = "none";
    }, 1000);
  }
else{
  let xhr=new XMLHttpRequest();
  xhr.open("POST","/cartAuth")
  xhr.setRequestHeader("content-type","application/JSON")
  xhr.onload=()=>{
  
    if(xhr.responseText=='0'){
      
     window.location.href = '/login'
      return
    }
    else if(xhr.responseText=='1'){
      newtarg=target.children[1].children[0].children[4]
     newtarg.parentNode.children[5].style.display='none'
     
     newtarg.parentNode.children[6].style.display='block'

     let message =document.getElementById("message")
     // if((xhr.responseText).length<20){
     message.innerText="Item Already in cart"
     message.style.display = "block";
 
     // Hide the message element after 2 seconds
     setTimeout(() => {
       message.style.display = "none";
     }, 1000);
    }
    else{
        newtarg=target.children[1].children[0].children[4]
        newtarg.style.display='block'
       newtarg.parentNode.children[5].style.display='none'
      }}
data={itemId}

  xhr.send(JSON.stringify(data))
}


})}
////////////////////////////////////////////
function canc(arg){
  let target=arg.parentNode.parentNode
  target.style.display="none"
  target.parentNode.children[5].style.display='block'
}

function Go2Cart(){
  window.location.href="/cart";}



  //load 5 more items
function load5() {

  load(function(value){
   
    if(value.length){
    for(let i of value){  
      appendProd(i)
      // prodDetail.push(i)
    }}
    else{

      lm=document.getElementById("loadMore")
      lm.innerText="No product left to see"
      return
    }
  })
}

load5()
