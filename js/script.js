var bookName=document.getElementById("bookName");
var bookUrl=document.getElementById("bookUrl");
let addProductBtn=document.getElementById("addProductBtn");
let updateProductBtn=document.getElementById("updateProductBtn");
let deleteAllBtn=document.getElementById("deleteAllBtn");
let searchInput=document.getElementById("searchInput");
let temp;
var bookList
if(localStorage.getItem("bookList")== null ){
    var bookList=[];
}else{
    bookList= JSON.parse( localStorage.getItem("bookList"));
    displayBook(bookList);
}
checklength()

function addProduct(){

   if(valdiateBookName() && valdiateBookUrl()){ 
    
  
    var book={
        name: bookName.value,
        url: bookUrl.value,
        }

    bookList.push(book)
    displayBook(bookList)
    clearForm()
    localStorage.setItem("bookList",JSON.stringify(bookList))
    checklength()
    }
}

function updateProduct(){

    addProductBtn.classList.replace("d-none", "d-block")

    updateProductBtn.classList.replace("d-block","d-none")

    if(valdiateBookName() && valdiateBookUrl()){ 
    
  
        var book={
            name: bookName.value,
            url: bookUrl.value,
            }
    
        bookList[temp]=book;
        displayBook(bookList)
        clearForm()
        localStorage.setItem("bookList",JSON.stringify(bookList))
        }

        }


function displayBook(books){

    cartona=``
 
    for(i=0 ; i<books.length ; i++){

        cartona+=`<tr> <td>${i+1}</td>
        <td>${books[i].newName?books[i].newName:books[i].name } </td>
        
        <td>  <a href="${books[i].url}" target="_blank" class="btn btn-sm btn-warning">Visit Link</a></td>
        <td>  <button onclick="getUpdatedProduct(${i})" class=" btn btn-info btn-sm">Update</button></td>
        <td>  <button onclick="deleteBook(${i})" class=" btn btn-danger btn-sm">Delete</button></td>
         </tr>`

    }
    document.getElementById('tbody').innerHTML= cartona;
}


function clearForm(){
    bookName.value=""
    bookUrl.value=""
}

function deleteBook(index){
    
    bookList.splice(index,1)

    localStorage.setItem("bookList",JSON.stringify(bookList))
    checklength()
    displayBook(bookList)
}
function checklength(){
if(bookList.length>1){
    deleteAllBtn.classList.replace("d-none", "d-block")
    // searchInput.removeAttribute("disabled")
}else{
    deleteAllBtn.classList.replace("d-block", "d-none")
    // searchInput.setAttribute("disabled","disabled")

}}
function deleteAll(){
    bookList.splice(0)
    localStorage.setItem("bookList",JSON.stringify(bookList))
    displayBook(bookList)
    checklength()
}

function getUpdatedProduct(index){
    addProductBtn.classList.add("d-none")

    updateProductBtn.classList.replace("d-none","d-block")
    bookName.value=bookList[index].name;
    bookUrl.value=bookList[index].url;
    temp=index;
    scroll({
        top:0,
        behavior:"smooth",
    })

}

// searchInput.addEventListener("input",function(){
//     searchBook()
    
// })

function searchBook() {
    let searchKey=searchInput.value
    
    var foundedBooks=[]
   
     for(i=0;i<bookList.length;i++){

    if(bookList[i].name.toLowerCase().includes(searchKey.toLowerCase())){
    
    bookList[i].newName=bookList[i].name.toLowerCase().replace(searchKey.toLowerCase(),`<span class="text-danger" >${searchKey}</span>`)
    
    foundedBooks.push(bookList[i])
      
    }
    
}
        displayBook(foundedBooks) 
     
}


function valdiateBookName(){

    var regex= /^[A-Z][a-z]{3,}$/
    
        if (regex.test(bookName.value) == true){
            bookName.style.border="none"
            wrongBookName.classList.replace("d-block", "d-none")
            return true;
        }else{
            bookName.style.border="2px solid red"
            wrongBookName.classList.replace("d-none", "d-block")
            return false;
           
        }
    }
function valdiateBookUrl (){

        var regex= /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    
        if (regex.test(bookUrl.value) == true){
            bookUrl.style.border="none"
            wrongUrl.classList.replace("d-block", "d-none")
            return true;
        }else{
            bookUrl.style.border="2px solid red"
            wrongUrl.classList.replace("d-none", "d-block")
            return false;
           
        }
    } 



















    