let title = document.getElementById('Titre');
let price = document.getElementById('Price');
let ads = document.getElementById('Ads');
let taxes = document.getElementById('Taxes');
let discount = document.getElementById('Discount');
let total = document.getElementById('totat');
let amout = document.getElementById('Amout');
let category = document.getElementById('Category');
let creat = document.getElementById('creat');
let search = document.getElementById('search');
let mood='creat';
let emo;
let mooda='title'

function gettotal(){
    if(price.value != 0){
        let result = (+price.value + +ads.value + +taxes.value ) - +discount.value;
        total.innerHTML = result;
        total.style.background='green'
    }else{
        total.innerHTML='';
        total.style.background='red';
        
    }
}
let dataproduct

if(localStorage.producte != null){
    dataproduct = JSON.parse(localStorage.producte)
}else{
    dataproduct=[]
}

creat.onclick = function(){
    let newproduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        ads:ads.value,
        taxes:taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        amout:amout.value,
        category:category.value.toLowerCase()
    }
    total.style.background='red'
    if(mood=='creat'){
    if(newproduct.amout > 1){
        for(let i = 0; i<newproduct.amout;i++){
            dataproduct.push(newproduct)
        }
    }else{
        dataproduct.push(newproduct)
    }}else{
        dataproduct[ emo]=newproduct;
        creat.innerHTML='creat';
        amout.style.display='block'
    }
   dataproduct.push(newproduct);
   localStorage.setItem('producte', JSON.stringify(dataproduct))
   cleandata();
   showdata()
}

function cleandata(){
    title.value='';
    price.value='';
    ads.value='';
    taxes.value='';
    discount.value='';
    total.innerHTML='';
    amout.value='';
    category.value='';
}

function showdata(){
    let table = '';
    for(i=0;i<dataproduct.length; i++){
       
         table +=`
         <tr>
         <td>${i+1}</td>
         <td>${dataproduct[i].title}</td>
         <td>${dataproduct[i].price}</td>
         <td>${dataproduct[i].ads}</td>
         <td>${dataproduct[i].discount}</td>
         <td>${dataproduct[i].total}</td>
         <td>${dataproduct[i].category}</td>
         <td><button onclick="update(${i})">UPDATE</button></td>
         <td><button onclick="delet(${i})">DELET</button></td>
     </tr>`
        
    }
    document.getElementById('tbody').innerHTML=table;
    let deletaa = document.getElementById('DeletAll');
    if(
        dataproduct != null
    ){
        deletaa.innerHTML = `<button onclick="deletall()"> dellet all (${dataproduct.length}) </button>`
    }
}
showdata();

function delet(i){
  dataproduct.splice(i,1);
  localStorage.producte = JSON.stringify(dataproduct);
  showdata();
}
function deletall(){
    dataproduct.splice(0);
    localStorage.clear();
    showdata();
}
function update(i){
  title.value = dataproduct[i].title;
  price.value = dataproduct[i].price;
  ads.value= dataproduct[i].ads;
  taxes.value=dataproduct[i].taxes;
  discount.value = dataproduct[i].discount;
  amout.value = dataproduct[i].amout;
  category.value = dataproduct[i].category;
  gettotal();
  creat.innerHTML='Update';
  mood='update';
  emo = i;
  amout.style.display='none'
  scroll({
    top:0,
    behavior:'smooth'
  })
}


function searchmood(id){
  if(id=='searcht'){
    mooda='title'
    search.placeholder='Search By Title'
  }else{
    mooda='category';
    search.placeholder='Search By Category'
  }
  search.focus()
}

function searchtdata(value){
    let table='';
    if(mooda=='title'){
     for(i=0;i<dataproduct.length;i++){
        if(dataproduct[i].title.includes(value.toLowerCase())){
          table += `
          <tr>
          <td>${i+1}</td>
          <td>${dataproduct[i].title}</td>
          <td>${dataproduct[i].price}</td>
          <td>${dataproduct[i].ads}</td>
          <td>${dataproduct[i].discount}</td>
          <td>${dataproduct[i].total}</td>
          <td>${dataproduct[i].category}</td>
          <td><button onclick="update(${i})">UPDATE</button></td>
          <td><button onclick="delet(${i})">DELET</button></td>
      </tr>`
        }
     }
    }else{
        for(i=0;i<dataproduct.length;i++){
            if(dataproduct[i].category.includes(value.toLowerCase())){
              table += `
              <tr>
              <td>${i+1}</td>
              <td>${dataproduct[i].title}</td>
              <td>${dataproduct[i].price}</td>
              <td>${dataproduct[i].ads}</td>
              <td>${dataproduct[i].discount}</td>
              <td>${dataproduct[i].total}</td>
              <td>${dataproduct[i].category}</td>
              <td><button onclick="update(${i})">UPDATE</button></td>
              <td><button onclick="delet(${i})">DELET</button></td>
          </tr>`
            }
         }
    }
    document.getElementById('tbody').innerHTML = table

}