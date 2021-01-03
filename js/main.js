/* portfolio */
(() => {
    const filterContainer = document.querySelector(".portfolio__filter"),
    portfolioItemsContainer = document.querySelector(".portfolio__list"),
    portfolioItems = document.querySelectorAll(".portfolio__item"),
    popup = document.querySelector(".portfolio__popup"),
    prevButton = popup.querySelector(".portfolio__pp-prev"),
    nextButton = popup.querySelector(".portfolio__pp-next"),
    closeButton = popup.querySelector(".portfolio__pp-close"),
    projectDetailsContainer = popup.querySelector(".portfolio__pp-details"),
    projectDetailsButton = popup.querySelector(".project-details-btn");
    let itemIndex, slideIndex, screenshots;

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
            console.log(screenshots);
            //convert screenshot into array
            screenshots = screenshots.split(",");
            slideIndex = 0;
            popupToggle();
        }
    })
        
    function popupToggle(){
        popup.classList.toggle("open");
    }

})();