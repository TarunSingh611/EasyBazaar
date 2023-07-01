let load_more=document.getElementById('loadMore')
load_more.addEventListener("click", load5)
let prodDetail=[]


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
function appendProd(item) {
  let plist = document.getElementById("product-list");

  let pcard = document.createElement("DIV");
  pcard.setAttribute("class", "product-card");
  pcard.setAttribute("id", item.id);

  let pimg = document.createElement("DIV");
  pimg.setAttribute("class", "product-image");
  let img = document.createElement("img");
  img.setAttribute("src", item.image);
  pimg.appendChild(img);
  pcard.appendChild(pimg);

  let pdet = document.createElement("DIV");
  pdet.setAttribute("class", "product-details");

  let pname = document.createElement("DIV");
  pname.setAttribute("class", "product-name");

  let nameLabel = document.createElement("label");
  nameLabel.innerText = "Name: ";
  let nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.value = item.name;


  let descLabel = document.createElement("label");
  descLabel.innerText = "Description: ";
  let descInput = document.createElement("input");
  descInput.setAttribute("type", "text");
  descInput.value = item.description;

  let catLabel = document.createElement("label");
  catLabel.innerText = "Category: ";
  let catInput = document.createElement("input");
  catInput.setAttribute("type", "text");
  catInput.value = item.category;

  let priceLabel = document.createElement("label");
  priceLabel.innerText = "Price: ";
  let priceInput = document.createElement("input");
  priceInput.setAttribute("type", "text");
  priceInput.value = item.price;

  let stockLabel = document.createElement("label");
  stockLabel.innerText = "Stock: ";
  let stockInput = document.createElement("input");
  stockInput.setAttribute("type", "text");
  stockInput.value = item.stock;

  let applyBtn = document.createElement("button");
  applyBtn.setAttribute("onclick", "applyChanges(this)");
  applyBtn.textContent = "Apply";

  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("onclick", "deleteProduct(this)");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.backgroundColor="#ff0000";

  let buttonGroup = document.createElement("DIV");
  buttonGroup.setAttribute("Class", "button");


  pname.appendChild(nameLabel);
  pname.appendChild(nameInput);
  pname.appendChild(descLabel);
  pname.appendChild(descInput);
  pname.appendChild(catLabel);
  pname.appendChild(catInput);
  pname.appendChild(priceLabel);
  pname.appendChild(priceInput);
  pname.appendChild(stockLabel);
  pname.appendChild(stockInput);
 
  buttonGroup.appendChild(applyBtn);
  buttonGroup.appendChild(deleteBtn);
  pname.appendChild(buttonGroup)

  pdet.appendChild(pname);
  pcard.appendChild(pdet);

  plist.appendChild(pcard);
}





function load5() {

  load(function(value){
   
    if(value.length){
    for(let i of value){  
      appendProd(i)
      prodDetail.push(i)
    }}
    else{

      lm=document.getElementById("loadMore")
      lm.innerText="No product left to see"
      return
    }
  })
}
load5()


/////////////////////////////////////////
////////////////////////////////////////
function applyChanges(arg) {
  let TargId = arg.parentNode.parentNode.parentNode.parentNode.id;
  let Targ = arg.parentNode.parentNode;
  var inputElements = Targ.querySelectorAll('input');

  var product = {
    id: TargId,
    name: inputElements[0].value,
    description: inputElements[1].value,
    category: inputElements[2].value,
    price: inputElements[3].value,
    stock: inputElements[4].value
  };

  if (!Number.isInteger(Number(product.stock))) {
    let message = document.getElementById("message");
    message.innerText = "Invalid stock format. Stock should be an integer.";
    message.style.display = "block";
    message.style.background = "#ff0000";

    setTimeout(() => {
      message.style.display = "none";
    }, 1600);
    return;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(product.price)) {
    let message = document.getElementById("message");
    message.innerText = "Invalid price format. Price should be a decimal number with up to two decimal places.";
    message.style.display = "block";
    message.style.background = "#ff0000";

    setTimeout(() => {
      message.style.display = "none";
    }, 1600);
    return;
  }

  admHome(product, function () {
    let message = document.getElementById("message");

    message.innerText = "Changes have been applied";
    message.style.display = "block";
    message.style.background = "#00ff00";

    setTimeout(() => {
      message.style.display = "none";
    }, 1600);
  });
}


function deleteProduct(arg){
  let Targ= arg.parentNode.parentNode.parentNode.parentNode;
  let TargId = Targ.id
let data={"id":TargId}
  admDel(data,function(){
    let message = document.getElementById("message");
Targ.remove();
  message.innerText = 'Product Deleted from dataBase';
  message.style.display = "block";
  message.style.background = '#ff0000';

  setTimeout(() => {
    message.style.display = "none";
  }, 1600);
})
}

function admDel(data,callback){
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/deleteProduct");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onload = function() {
    if (xhr.status === 200) {
      callback();
    }

  };

  xhr.send(JSON.stringify(data));
}


function admHome(value,callback){

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onload = function() {
    if (xhr.status === 200) {
      callback();
    }

  };

  xhr.send(JSON.stringify(value));


}
