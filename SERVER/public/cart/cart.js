let cartcon =document.getElementById("cart-con")

let prodId=document.getElementsByClassName("product-card")
 let prodDetail=[]





let xhr =new XMLHttpRequest
xhr.onload = () => {

  let prodDetail = JSON.parse(xhr.responseText).cartItems;

  if (prodDetail) {

    for (let i of prodDetail) {
      
      appendProd(i);
    }
  }
};

xhr.open("GET","/cartItems")
xhr.setRequestHeader('Content-type', 'application/JSON')

xhr.send()

////
//loop through items

for(let i of prodDetail){
  appendProd(i)
}


/////cart items

function appendProd(item){
  let plist =document.getElementById("cart-con")
  
    let pcard=document.createElement("DIV")
    pcard.setAttribute("class","product-card")
    let pimg=document.createElement("DIV")
    pcard.setAttribute("id",item.id)
    pcard.setAttribute("cartId",item.cartId)
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

let spanEle=document.createElement("span")
spanEle.setAttribute("class","spanBut")

let incbut=document.createElement("button")
incbut.setAttribute("class","sInc")
incbut.setAttribute("onclick","incItem(this)")
incbut.innerHTML="+"

let decbut=document.createElement("button")
decbut.setAttribute("class","sDec")
decbut.setAttribute("onclick","decItem(this)")
decbut.innerHTML="-"

let labEl=document.createElement("label")
labEl.setAttribute("class","Qn")



labEl.innerHTML=item.Qn;

let trash=document.createElement("label")
trash.setAttribute("onclick","del(this)")
// trash.innerHTML="&#128465;"
trash.innerHTML="&#128465;"
spanEle.appendChild(decbut)
spanEle.appendChild(labEl)
spanEle.appendChild(incbut)
spanEle.appendChild(trash)

  
    pname.appendChild(h3)
    pname.appendChild(h3_2)
    pname.appendChild(H4)
    pname.appendChild(spanEle)
    pname.appendChild(but)
  

    pdet.appendChild(pname)
    pcard.appendChild(pdet)
  
  
    plist.appendChild(pcard)
  }


////description 
function showDetails(arg){
  let hidCard=document.getElementById("pop")
  let target=arg.parentNode.parentNode.parentNode
  let argId=target.id
  getProd(argId,function(prod){
  let pop=genPop(prod)
  hidCard.appendChild(pop)
  hidCard.setAttribute("class","show")
}
  )}
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


//////////////////////////////////////////////////////////////////////////////////////////////////
//increase-decresase

function incItem(inc){
  let id=inc.parentNode.parentNode.parentNode.parentNode.id;
  let cartid=inc.parentNode.parentNode.parentNode.parentNode.getAttribute("cartid");
let Q=inc.parentNode.children[1]
  let Qn = parseInt(Q.textContent);
  Qn++

  itemNo(Qn,id,cartid,Q)

}

function decItem(dec){
let id=dec.parentNode.parentNode.parentNode.parentNode.id;
let cartid=dec.parentNode.parentNode.parentNode.parentNode.getAttribute("cartid");
  let Q=dec.parentNode.children[1]
  let Qn = parseInt(Q.textContent);
  if (Qn== 1) {
      return;
  } else {
      Qn--;
  
      itemNo(Qn,id,cartid,Q)
      
  }
}

////array -quantity
function itemNo(Qn,itemId,cartid,Q){

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

const data={"id":cartid,"Qn":parseInt(Qn)}

updateCart(data,function(){
  Q.textContent = Qn;})
}})}

///update
function updateCart(userCart,callback){
let xhr =new XMLHttpRequest
xhr.addEventListener('load',function(err){
  if (xhr.status === 200) {
   callback()
  }})

xhr.open("POST","/cartItems")
xhr.setRequestHeader('Content-type', 'application/JSON')
xhr.send(JSON.stringify(userCart))

}

//////////////////////////
function del(arg){
  let item =arg.parentNode.parentNode.parentNode.parentNode

  const id = item.getAttribute("cartid");


  let xhr =new XMLHttpRequest
xhr.addEventListener('load',function(err){
  if (xhr.status === 200) {
    item.remove()
  }})

xhr.open("POST","/cart")
xhr.setRequestHeader('Content-type', 'application/JSON')
xhr.send(JSON.stringify({"id":id}))

}

/////////////////////////////////////////////////////////////////////////////////////////
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