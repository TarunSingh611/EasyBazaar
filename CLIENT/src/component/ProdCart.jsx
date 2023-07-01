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

  export default appendProd