'use strict';

Movie.all = [];

let tableHeader = ['#' , 'Name' , 'Image' , 'Release'];

function Movie(name, cat, release){
this.name = name;
this.cat = cat;
this.release = release;
this.moviePath = '';
Movie.all.push(this);    
}

Movie.prototype.toLowerCase = function() {
this.cat = this.cat.toLowerCase;    
}

Movie.prototype.path = function(){
    this.moviePath = `./img/${this.cat}.png`;
}

getDataFromLocal();

const formElement = document.getElementById('form');
formElement.addEventListener('submit' , function(event) {
    event.preventDefault();

let newName = event.target.name.value;
let newCat = event.target.cat.value;
let newRelease = event.target.release.value;
formElement.reset();

const nMovie = new Movie(newName , newCat , newRelease);

nMovie.toLowerCase();
nMovie.path();
localStorage.setItem('movieData' , JSON.stringify(Movie.all));

const divElement = document.getElementById('tableDiv');

divElement.innerHTML = '';

getDataFromLocal();
})

function getDataFromLocal(){
    let localData = localStorage.getItem('movieData');

    if(localData){
        Movie.all = JSON.parse(localData);
        renderData();
    }
}


function renderData(){
   const divElement = document.getElementById('tableDiv');
   const tableElement = document.createElement('table');
   divElement.appendChild(tableElement);
   tableElement.setAttribute('id' , 'tableData')
   
 const trHeadElement = document.createElement('tr');
 tableElement.appendChild(trHeadElement);
 
 for (let i = 0 ; i < tableHeader.length ; i++){

 const thElement = document.createElement('th');
 trHeadElement.appendChild(thElement);
 trHeadElement.textContent = tableHeader[i];

 }
 for (let j = 0 ; j < Movie.all.length ; j++){

 const trDataElement = document.createElement('tr');
 tableElement.appendChild(trDataElement);
 const tdDeleteElement = document.createElement('td');
 
 trDataElement.appendChild(tdDeleteElement);
 tdDeleteElement.textContent = 'X';
 tdDeleteElement.setAttribute('onClick' , 'deleteMe(this)');

 const tdImageElement = document.createElement('img');
 tdImageElement.src = Movie.all[j].moviePath;
 trDataElement.appendChild(tdImageElement);


 const tdNameElement = document.createElement('td');
 trDataElement.appendChild(tdNameElement);
 tdNameElement.textContent = Movie.all[j].name;

 const tdReleaseElement = document.createElement('td');
 trDataElement.appendChild(tdReleaseElement);
 tdReleaseElement.textContent = Movie.all[j].release
 }
}

function deleteMe(z){
const tableElement = document.getElementById('tableData');

let tableRowIndex = z.parentNode.rowIndex;
tableElement.deleteRow(tableRowIndex);
Movie.all.splice(tableRowIndex-1,1);
localStorage.setItem('movieData'.JSON.stringify(Movie.all));

const divElement = document.getElementById('tableDiv');
divElement.innerHTML = '';
getDataFromLocal();
}

function clearLocalStorage(){
localStorage.clear();
window.location.reload('Refresh');    
}







