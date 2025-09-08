const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("all-plants-container").classList.add("hidden");
  } else {
    document.getElementById("all-plants-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// defult all plants
const allPlants = () => {
  manageSpinner(true);

  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      displayAllPlants(data.plants);
      manageSpinner(false);
      
    });

  const categorieBtn = document.querySelectorAll(".categorie-btn");

  for (const btn of categorieBtn) {
    btn.classList.remove("active");
  }
  document.getElementById("all-plants-btn").classList.add("active");
  
};
allPlants();

// display all defult plants
const displayAllPlants = (plants) => {
  const allPlantsContainer = document.getElementById("all-plants-container");
  allPlantsContainer.innerHTML = "";
  for (const plant of plants) {
    const creatDiv = document.createElement("div");
    creatDiv.innerHTML = `
         <div class="card bg-base-100 shadow-sm p-3 space-y-3 w-full h-[420px] flex flex-col justify-between">
           <figure>
             <img class="rounded-md w-full h-48 object-cover"
             src="${plant.image}" />
             </figure>
             <div class="card-body p-0 flex flex-col justify-between flex-1">
               <div>
            <h2 onClick="loadPlantDetails(${plant.id})" class="card-title">${plant.name}</h2>
            <p class="text-justify line-clamp-3">
                ${plant.description}
            </p>
        </div>
        <div>
            <div class="card-actions flex justify-between mt-3">
                <div class="badge rounded-xl font-semibold text-[#15803D] bg-[#DCFCE7] py-3">
                    ${plant.category}
                </div>
                <h2 class="font-semibold">
                    <i class="fa-solid fa-bangladeshi-taka-sign "></i><span>${plant.price}</span>
                </h2>
            </div>
            <button onClick="addToCard(${plant.id})" class="btn bg-[#15803D] w-full rounded-xl text-white mt-3">
                Add To Cart
            </button>
                </div>
               </div>
            </div>

        
        `;
    allPlantsContainer.appendChild(creatDiv);
  }
};

// categories
const allCategories = () => {
  manageSpinner(true);

  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      displayAllCategories(data.categories);
      manageSpinner(false);
    });
};
allCategories();
// display all categories
const displayAllCategories = (categories) => {
  const allCategoriesContainer = document.getElementById(
    "all-categories-container"
  );
  for (const item of categories) {
    const creatUl = document.createElement("ul");
    creatUl.innerHTML = `
    <ul class="w-full ">


    
    
                        <li id="click-btn${item.id}" onclick="plantsByCategories(${item.id})" class="hover:bg-[#15803D] hover:text-white cursor-pointer py-2 rounded-md text-[16px] pl-2 w-full hover:transition-all categorie-btn mt-2">
                            ${item.category_name}
                        </li>
                    </ul>
    `;
    allCategoriesContainer.appendChild(creatUl);
  }
};

// plants by categories
const plantsByCategories = (plants) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${plants}`;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      displayAllPlants(data.plants);
      const categorieBtn = document.querySelectorAll(".categorie-btn");

      for (const btn of categorieBtn) {
        btn.classList.remove("active");
      }
      document.getElementById("all-plants-btn").classList.remove("active");
      const activeBtn = document.getElementById(`click-btn${plants}`);
      activeBtn.classList.add("active");
      manageSpinner(false);
    });
};

// loadPlantDetails / modal part
const loadPlantDetails = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      displayPlantDetails(data.plants);
      manageSpinner(false);
    });
};

// display loadPlantDetails / modal
const displayPlantDetails = (plant) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
   <div class="   space-y-2  flex flex-col justify-between">
          <h2 class="card-title font-bold text-2xl">${plant.name}</h2>
           
            
             <figure>
             <img class="rounded-md w-full h-48 object-cover"
             src="${plant.image}" />
             </figure>
             <p class="">
                    <span class="font-bold">Categorie </span>: <span class="text-[#15803D]">${plant.category}</span>
                    </p>
            <h2 class="font-semibold">
                   <span class="font-bold">Price</span>: <i class="fa-solid fa-bangladeshi-taka-sign text-[#15803D]"></i><span class="text-[#15803D]">${plant.price}</span>
                </h2>        
                
            <p class="text-justify ">
               <span class="font-bold">Description</span>: <span class="text-[#15803D]">${plant.description}</span>
            </p>
     </div>
        
  `;
  document.getElementById("my_modal").showModal();
};

// add to card
const addToCard = (plant) => {
  const url = `https://openapi.programming-hero.com/api/plant/${plant}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCard(data.plants));
};

const displayCard = (card) => {
  const cardContainer = document.getElementById("card-container");
  const creatEl = document.createElement("div");
  creatEl.id = "cart-item-" + card.id; // unique id দিলাম

  creatEl.innerHTML = `
   <div class="flex justify-between gap-2 items-center bg-[#F0FDF4] p-2 rounded-md mt-2">
        <div>
            <h2 class="text-[14px]">${card.name}</h2>
            <h2 class="flex items-center text-[#8C8C8C]">
                <i class="fa-solid fa-bangladeshi-taka-sign"></i><span class="text-[14px]">${card.price}</span>
            </h2>
        </div>
        <i onClick=" hideCard(${card.id}, ${card.price})" 
           class="fa-solid fa-xmark text-[#8C8C8C] cursor-pointer"></i>
    </div>
  `;
  alert(`${card.name} Added to cart successfully!`);
  cardContainer.appendChild(creatEl);

  const priceElement = document.getElementById("price");
  const currentPrice = parseInt(priceElement.innerText);
  priceElement.innerText = currentPrice + parseInt(card.price);
};

const hideCard = (id, price) => {
  const item = document.getElementById("cart-item-" + id);
  if (item) {
    item.remove();
  }

  const priceElement = document.getElementById("price");
  const currentPrice = parseInt(priceElement.innerText);
  priceElement.innerText = currentPrice - parseInt(price);
};
