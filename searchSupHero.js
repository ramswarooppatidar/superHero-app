
const publicKey = "a952ee9dc0b37d14f7a1d5726dc25a91";
const privateKey = "b227d2c1452233d7181f74dd94fe475fe25bc2ac";
const timeStamp = new Date().getTime().toString(); // Current timestamp in milliseconds

const hashValue = timeStamp + privateKey + publicKey; // Note: Order should be timestamp + privateKey + publicKey
const hash = CryptoJS.MD5(hashValue).toString();
console.log(hash);
let word ="a";

function fetchSuperHeroes(word){
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${word}&apikey=${publicKey}&ts=${timeStamp}&hash=${hash}`;
    return fetch(apiUrl)
    .then((resp)=>{
        if(!resp.ok){
            return new Error("faild to fatch superhero")
        }
        return resp.json();
    })
    .then(data=>data.data.results)
    .catch(error=>{
        console.error("Error fetching superheroes:", error);
        return [];
    })
}
function displaySuperHeros(heros){
    const itemsEl = document.querySelector("#items");
    const listContainer = itemsEl.querySelector('div ul');
    //refrece previouse search result
      listContainer.innerHTML='';
    for(let key in heros){
        const hero = heros[key]
        // console.log(hero);
        if (hero.thumbnail.path.includes('image_not_available')) {
            continue; // Skip this item
        } 
        /**
         * <img id="superHeroImage" src="${hero.thumbnail['path']}.${hero.thumbnail['extension']}">
             <img onclick="moreAboutSuperHero('${hero}')" src="${hero.thumbnail['path']}.${hero.thumbnail['extension']}">
         * <img onclick="moreAboutSuperHero('${hero.id}', '${hero.name}')" src="${hero.thumbnail['path']}.${hero.thumbnail['extension']}">
         */  
        const comicName = hero.comics.items.map(ele=> ele.name);
        console.log(JSON.stringify(comicName));

        const imgUrl = `${hero.thumbnail['path']}.${hero.thumbnail['extension']}`
        const newHTML =`
        
            <li>
                <div id="outer">
                <div id="image">
                <img onclick="moreAboutSuperHero('${comicName}','${hero.name}','${imgUrl}')" 
                src="${hero.thumbnail['path']}.${hero.thumbnail['extension']}">
                </div>         
                <div id="detail">           
                <p class="hidden-data-2">${hero.name}</p> 
                <p class="hidden-data-1">${hero.id}</p>
                <p class="hidden-data-3 desc">${hero.description}</p>
                <p class="li-btn"><button onclick="addFav(event)"><i class="fas fa-star"></i> Favorite</button></p>
                <p class="hidden-data" data-hero='${JSON.stringify(hero)}'></p>
                </div>
                </div>
            </li>         
         `
        //  const superHeroImage = document.querySelector('#superHeroImage');
        //  superHeroImage.onclick = function(){
        //     moreAboutSuperHero(hero);
        //  }

         if(newHTML === null){
            console.log("null incounter");
         }
         listContainer.insertAdjacentHTML('beforeend', newHTML);

    }
}
function serchHerosByInputTag(){
    const searchBtn = document.querySelector("#btn");
    searchBtn.addEventListener("click",()=>{
    const textSearched = document.querySelector("#input");
    console.log("value is ",textSearched.value);
    word = textSearched.value;
    textSearched.value="";

    fetchSuperHeroes(word)
    .then(heroes=> displaySuperHeros(heroes))
    .catch(error=> console.error("error :", error));
})
}
function addFav(event) {
    const btn = event.target; // Get the clicked button
    const heroElement = btn.closest("li"); // Find the parent <li> element
   
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Extract hero data from the elements
    const id_ = heroElement.querySelector(".hidden-data-1").textContent;
    const name_ = heroElement.querySelector(".hidden-data-2").textContent;
    const description_ = heroElement.querySelector(".hidden-data-3").textContent;
    const heroImgSrc = heroElement.querySelector("img").getAttribute("src"); // Fetch the src attribute of the img


    // Construct heroData object
    const heroData = {
        imgSrc: heroImgSrc,
        id: id_,
        name: name_,
        description: description_
    };

    // Check if a hero with similar ID already exists in favorites
    const isSimilarIdFound = favorites.some(existingHero => existingHero.id === id_);

    // If a similar ID is not found, add the heroData to favorites
    if (!isSimilarIdFound) {
        favorites.push(heroData);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
        console.log("A hero with similar ID already exists in favorites.");
    }

    btn.innerHTML = '<i class="fas fa-star"></i> Added to Favorites';
    btn.style.backgroundColor = 'red';
    btn.style.fontSize = '20px';
    btn.style.color="white"
}
function moreAboutSuperHero(comics, name, imgUrl ){
//    const hero = JSON.parse(hero);
   console.log("event trigger ");
   console.log("comics detail ", comics);
   console.log("dimgUrl ", imgUrl);
  // Store superhero information in localStorage
  localStorage.setItem('selectedSuperhero', JSON.stringify({ comics, name, imgUrl }));
  // Redirect to moreAbout.html
  window.location.href = 'moreAboutFavorite.html';
}
serchHerosByInputTag();











