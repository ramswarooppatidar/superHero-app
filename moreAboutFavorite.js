// localStorage.setItem('selectedSuperhero', JSON.stringify({ comics, name, dimgUrl }));
const moreAbout = JSON.parse(localStorage.getItem("selectedSuperhero")) || {};

const head = document.querySelector("#moreAbout h1");
head.textContent=""+ moreAbout['name'];

const imgEl = document.querySelector("#image");
const Ul_El = document.querySelector("#about");
const imgTag = document.createElement('img');
imgTag.src = moreAbout['imgUrl'];

const comicsString = moreAbout['comics']
const comicsArray = comicsString.split(',');
console.log(Array.isArray(comicsArray));

comicsArray.forEach(element => {
   const li_comic = document.createElement('li');
   li_comic.textContent = element;
   console.log(element);
   Ul_El.appendChild(li_comic);
});
imgEl.appendChild(imgTag);