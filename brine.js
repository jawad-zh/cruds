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
let dataproduct;
let mooda='title'

function getTotale(){
    if(price.value != 0){
        let result = (+price.value + +ads.value + +taxes.value )- +discount.value;
        total.innerHTML = result;
        total.style.background='green'
    }else{
        total.innerHTML='';
        total.style.background='red'
    }
}
if(localStorage.productt != null){
    dataproduct = JSON.parse(localStorage.productt)
}else{
    dataproduct=[]
}

creat.onclick = function (){
    let newproduct = {
        title:title.value,
        price:price.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        amout:amout.value,
        category:category.value
    }
  dataproduct.push(newproduct);
  localStorage.setItem('productt', JSON.stringify(dataproduct))
  cleandata()
  showdata()
}

function cleandata(){
 title.value='';
 price.value='';
 ads.value='';
 discount.value='';
 total.innerHTML='';
 amout.value='';
 category.value=''
}
function showdata(){
    let table='';
    for(  i =0 ;i<dataproduct.length;i++){
        
            table+=`
            <tr>
            <td>${i+1}</td>
            <td>${dataproduct[i].title}</td>
            <td>${dataproduct[i].price}</td>
            <td>${dataproduct[i].ads}</td>
            <td>${dataproduct[i].discount}</td>
            <td>${dataproduct[i].total}</td>
            <td>${dataproduct[i].category}</td>
            <td><button> UPDATE </button></td>
            <td><button onclick=" deletedata(${i})"> delet </button></td>
        </tr>`
        
    }
    document.getElementById('tbody').innerHTML = table
    let deletalle = document.getElementById('DeletAll');
    if(dataproduct.length>0){
        deletalle.innerHTML =`
        <button onclick="deletalldata()"> DELET ALL(${i}) </button>`
    }else{
        deletalle.innerHTML=''
    }
}
 showdata();

 function deletedata(i){
   dataproduct.splice(i,1);
   localStorage.productt = JSON.stringify(dataproduct)
   showdata()
 }
 function deletalldata(){
  dataproduct.splice(0);
  localStorage.clear();
  showdata()
 }
 function getmooda(id){
    if(id=="searcht"){
         mooda='title'
         search.placeholder='SEARCH BY TITLE';

    }else{
        mooda='category';
        search.placeholder='SEARCH BY CATEGORY '
    }
  search.focus()
 }

 function getsearch(value){
    let table='';
    if(mooda=='title'){
        for(let i = 0; i<dataproduct.length ; i++){
            if(dataproduct[i].title.includes(value)){
                table +=`
                <tr>
                <td>${i+1}</td>
                <td>${dataproduct[i].title}</td>
                <td>${dataproduct[i].price}</td>
                <td>${dataproduct[i].ads}</td>
                <td>${dataproduct[i].discount}</td>
                <td>${dataproduct[i].total}</td>
                <td>${dataproduct[i].category}</td>
                <td><button> UPDATE </button></td>
                <td><button onclick=" deletedata(${i})"> delet </button></td>
            </tr>`
            }
        }
    }else {
        for(let i = 0; i<dataproduct.length ; i++){
            if(dataproduct[i].category.includes(value)){
                table +=`
                <tr>
                <td>${i+1}</td>
                <td>${dataproduct[i].title}</td>
                <td>${dataproduct[i].price}</td>
                <td>${dataproduct[i].ads}</td>
                <td>${dataproduct[i].discount}</td>
                <td>${dataproduct[i].total}</td>
                <td>${dataproduct[i].category}</td>
                <td><button> UPDATE </button></td>
                <td><button onclick=" deletedata(${i})"> delet </button></td>
            </tr>`
            }
        }
         
    }
    document.getElementById('tbody').innerHTML=table
 }

 