 // Retrieve favorites from localStorage
 const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
 const favoritesList = document.getElementById("favorites-list");
 console.log(favorites);

 
 favorites.forEach(hero => {
         // Check if the hero object has a name property
         if (hero.name) {
         // If the name property is not present, create and append the image and information divs
         const li = document.createElement("li");
         li.classList.add("outer");

         // Create div for the image
         const imageDiv = document.createElement("div");
         imageDiv.classList.add("image");
         const img = document.createElement("img");
         img.src = hero.imgSrc;
         imageDiv.appendChild(img);

         // Append the imageDiv to the li element
         li.appendChild(imageDiv);

         // Create div for the information
         const infoDiv = document.createElement("div");
         infoDiv.classList.add("info");

         // Create ul element
         const ul_El = document.createElement("ul");

         // Create li elements and set their content
         const li_El = document.createElement("li");
         li_El.textContent = "ID         : " + hero.id;

         const li2_El = document.createElement("li");
         li2_El.textContent = "Name      : " + hero.name;

         const li3_El = document.createElement("li");
         li3_El.textContent = "Description: " + hero.description;

         //insert button
         const li4_El = document.createElement("li");
         const btn_El = document.createElement("button");
         btn_El.classList.add("remove")
         btn_El.textContent="remove from favorites"
         btn_El.onclick = removeFromFavorites;
         li4_El.appendChild(btn_El);

         // Append li elements to ul element
         ul_El.appendChild(li_El);
         ul_El.appendChild(li2_El);
         ul_El.appendChild(li3_El);
         ul_El.appendChild(li4_El);

         // Append ul element to infoDiv
         infoDiv.appendChild(ul_El);

         // Append the infoDiv to the li element
         li.appendChild(infoDiv);

         // Append the li element to the favoritesList
         favoritesList.appendChild(li);
 }
});

function removeFromFavorites() {
  // Get the parent li element of the clicked button
const liToRemove = this.parentElement.parentElement.parentElement.parentElement;
liToRemove.remove();
console.log(liToRemove);
// Remove the li element from the local storage
const val = liToRemove.querySelector(".info").querySelector("ul")
         .querySelector("li").textContent.split(":")[1].trim();;
console.log(typeof val, val);

// Retrieve the favorites from localStorage
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
 favorites.forEach((item, index) => {
 console.log(item['id']);
 if (item['id'] === val) {
     favorites.splice(index, 1); // Remove the item at the current index
 // Optionally, you can also remove the corresponding DOM element here
 }
});
localStorage.setItem('favorites', JSON.stringify(favorites));

}

// Attach event listeners for remove buttons
const btnEls = document.querySelectorAll(".remove");
btnEls.forEach(btnEl => {
btnEl.addEventListener("click", removeFromFavorites);
});