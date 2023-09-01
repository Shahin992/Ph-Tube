let cardsData = [];

const Category = async () => {
    const loadCategory = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const CategoryList = await loadCategory.json();
    const categoryContainer = document.getElementById('tabContainer')
    const categorylist = document.createElement('div')
    CategoryList.data.forEach((Category) => {
  
        const div = document.createElement('div');
        div.innerHTML = 
        `
        <a onclick ="getcategoryId('${Category.category_id}')" class="tab btn ml-3  lg:py-3 lg:px-8 text-xl lg:text-2xl font-semibold lg:font-bold">${Category.category}</a>
        
        `
        categoryContainer.appendChild(div);
    });
}


const getcategoryId = async (categoryId) => {
     const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
       const data = await response.json();
       cardsData = data.data;
      cardContainer.innerHTML = "";


       const getError = document.getElementById('ErrorContener')
      if (data.data.length === 0) {
        getError.innerHTML='';
        const error = document.createElement('div');
        cardContainer.classList.add('flex', 'flex-col', 'gap-10', 'justify-center', 'items-center'); 
        error.innerHTML = `
            <div class= " text-content-center flex flex-col gap-5 justify-center items-center">
            <img src="./Image/Icon.png" alt="">
            <h3 class=" text-2xl lg:text-4xl font-semibold text-center">Oops!! Sorry, <br> There is no content here</h3>
            </div> 
        `;
        getError.appendChild(error);
       
    }

      data.data.forEach((card) => {
       
        getError.innerHTML='';
  
       const CreatCard = document.createElement('div')
       CreatCard.innerHTML =  `
       <div class="  card h-[430px] bg-base-100 shadow-xl">
       <figure>
       <div class=" relative pb-10 w-9/12">
         <img class="w-full h-[200px] pb-3" src="${card.thumbnail}" />
         <div class="absolute bottom-[60px] px-2 w-auto right-2 pr-6 lg:pr-8 bg-gray-700 text-white">
           ${
             card.others.posted_date
               ? secondsToHourMinute(card.others.posted_date)
               : ""
           }
         </div>
       </div>
     </figure>
         

         <div class="card-body">
         <div class="flex justify-start gap-5 items-center">
         <div>
             <div>
               <div>
                 <img class="w-14 h-16 rounded-full"
                   src="${card.authors[0].profile_picture}"/>
               </div>
             </div>
           </div>
         <h2 class="card-title text-2xl font-bold">
             ${card.title}
             </h2>
       </div>
       <div class="flex">
         
          <div class="pb-2 flex gap-5 text-2xl font-semibold">
            <h6>${card.authors[0].profile_name}</h6>
            ${card.authors[0].verified ? '<img src="./Image/fi_10629607.svg" alt="">' : ''}
          </div>
          
        </div>

           <h3> Total Views: ${card.others.views ? card.others.views : ''} </h3>
           <div class="card-footer flex justify-between mt-8">
             
           </div>
         </div>
       </div>
       `
       cardContainer.appendChild(CreatCard);

   })


  
}

const sortByViewsDescending = () => {
  cardsData.sort((a, b) => {
    const parseViewCount = (viewCount) => {
      const viewNumber = parseFloat(viewCount);
      const multiplier = viewCount.includes("k") ? 1000 : 1;
      return viewNumber * multiplier;
    };
    const viewsA = parseViewCount(a.others.views);
    const viewsB = parseViewCount(b.others.views);
    return viewsB - viewsA;
  });

  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";
  cardsData.forEach((card) => {
    const CreatCard = document.createElement("div");
    CreatCard.innerHTML = `
       <div class="  card h-[430px] bg-base-100 shadow-xl">
       <figure>
       <div class=" relative pb-10 w-9/12">
         <img class="w-full h-[200px] pb-3" src="${card.thumbnail}" />
         <div class="absolute bottom-[60px] px-2 w-auto right-2 pr-6 lg:pr-8 bg-gray-700 text-white">
           ${
             card.others.posted_date
               ? secondsToHourMinute(card.others.posted_date)
               : ""
           }
         </div>
       </div>
     </figure>

     <div class="card-body">
     <div class="flex justify-start gap-5 items-center">
     <div>
         <div>
           <div>
             <img class="w-14 h-16 rounded-full"
               src="${card.authors[0].profile_picture}"/>
           </div>
         </div>
       </div>

       <h2 class="card-title text-2xl font-bold">
       ${card.title}
       </h2>
 </div>
 <div class="flex">
   
    <div class="pb-2 flex gap-5 text-2xl font-semibold">
      <h6>${card.authors[0].profile_name}</h6>
      ${
        card.authors[0].verified
          ? '<img src="./Image/fi_10629607.svg" alt="">'
          : ""
      }
    </div>
    
  </div>
  <h3> Total Views: ${card.others.views ? card.others.views : ""} </h3>
           <div class="card-footer flex justify-between mt-8">
             
           </div>
         </div>
       </div>
       `;
    cardContainer.appendChild(CreatCard);
  });
};


const sort = document.getElementById("sort");
sort.addEventListener("click", sortByViewsDescending);
function secondsToHourMinute(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours} hrs ${minutes} min ago`;
}



Category();
getcategoryId("1000")