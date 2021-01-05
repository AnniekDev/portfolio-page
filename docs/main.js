
const hamburgerButton = document.querySelector(".header__hamburger-btn")
navMenu = document.querySelector(".navigation")
closeNavButton = document.querySelector(".navigation__close-menu")


function showNavMenu(){
    navMenu.classList.add("open");
    bodyScrollingToggle();
}

function hideNavMenu(){
    navMenu.classList.remove("open");
    bodyScrollingToggle();
}

hamburgerButton.addEventListener("click", showNavMenu);
closeNavButton.addEventListener("click", hideNavMenu);

document.addEventListener("click", (event) => {
   if(event.target.classList.contains("navigation__link")){
       /*make sure event.target.hash has a value before overriding default*/
        if(event.target.hash !==""){
           /*prevent default anchor click*/
            event.preventDefault();
            const hash = event.target.hash;
            //deactivate existing active 'section'
            document.querySelector(".section.active").classList.add("hide");
            document.querySelector(".section.active").classList.remove("active");
            //activate new 'section'
            document.querySelector(hash).classList.add("active");
            document.querySelector(hash).classList.remove("hide");
            /* deactivate existing active nav menu link */
            navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
            navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
            /* activate new navigation menu link */
            event.target.classList.add("active", "inner-shadow");
            event.target.classList.remove("outer-shadow", "hover-in-shadow");
            //hide navigation menu
            hideNavMenu();
       }
   } 
})




/* portfolio */
const filterContainer = document.querySelector(".portfolio__filter"),
portfolioItemsContainer = document.querySelector(".portfolio__list"),
portfolioItems = document.querySelectorAll(".portfolio__item"),
popup = document.querySelector(".portfolio__popup"),
closeButton = popup.querySelector(".portfolio__pp-close"),
projectDetailsContainer = popup.querySelector(".portfolio__pp-details"),
projectDetailsButton = popup.querySelector(".project-details-btn");
let itemIndex, screenshots;


function bodyScrollingToggle(){
    document.body.classList.toggle("hidden-scrolling");
}

function popupSlideshow (){
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".portfolio__pp-img");
    /*activate loader until the popupimg loaded */
    popup.querySelector(".portfolio__pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
        // deactivate loader after popupImg is loaded
        popup.querySelector(".portfolio__pp-loader").classList.remove("active");
    }
}

function popupDetails(){
    //if there are no details
    if(!portfolioItems[itemIndex].querySelector(".portfolio__item-details")){
        projectDetailsButton.style.display = 'none';
        return; /*function stops here*/
    }
    projectDetailsButton.style.display = 'block';
    //get project details
    const details = portfolioItems[itemIndex].querySelector(".portfolio__item-details").innerHTML;
    //set project details
    popup.querySelector(".portfolio__project-details").innerHTML = details;
    //get project title
    const title = portfolioItems[itemIndex].querySelector(".portfolio__item-title").innerHTML;
    //set project title
    popup.querySelector(".portfolio__pp-details-title h2").innerHTML = title;
    //get category
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    //set category
    popup.querySelector(".portfolio__category").innerHTML = category; 
}


function popUpDetailsToggle(){
    if(projectDetailsContainer.classList.contains("active")){
        projectDetailsContainer.classList.remove("active");
        projectDetailsContainer.style.maxHeight = 0 + "px"
        projectDetailsButton.querySelector("i").classList.remove("fa-minus");
        projectDetailsButton.querySelector("i").classList.add("fa-plus");
    } else{
        projectDetailsButton.querySelector("i").classList.remove("fa-plus");
        projectDetailsButton.querySelector("i").classList.add("fa-minus");
        projectDetailsContainer.classList.add("active");
        projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
        popup.scrollTo(0,projectDetailsContainer.offsetTop);
    }
}

function popupToggle(){
    popup.classList.toggle("open");
    bodyScrollingToggle();
}
 

    /* filter portfolio items */
    filterContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains ("portfolio__filter-item") && 
        !event.target.classList.contains("active")){
          //  deactivate existing active 'filter-item'
          filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
          //activate new filter item
          event.target.classList.add("active","outer-shadow");
          const target = event.target.getAttribute("data-target");
          portfolioItems.forEach((item) => {
          if(target === item.getAttribute("data-category") || target ==='all'){
              item.classList.remove("hide");
              item.classList.add("show");
          }else{
            item.classList.remove("show");
            item.classList.add("hide");
            }
          })
        }
    })

    portfolioItemsContainer.addEventListener("click", (event) =>{
        if(event.target.closest(".portfolio__item-inner")){
            const portfolioItem = event.target.closest(".portfolio__item-inner").parentElement;
            // get portfolioItem index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
           screenshots = portfolioItems[itemIndex].querySelector(".portfolio__item-img img").getAttribute("data-screenshots");
          // viewProjectButton = portfolioItems[itemIndex].querySelector(".btn-view-project").getAttribute("data-button");
             //convert screenshot into array
             screenshots = screenshots.split(",");
          //viewProjectButton = viewProjectButton.split(",");
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })
        
    closeButton.addEventListener("click", () => {
        popupToggle();
    })

    

    projectDetailsButton.addEventListener("click",  () => {
        popUpDetailsToggle();
    }) 

   
