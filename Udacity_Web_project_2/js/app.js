/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 */

/**
 * Start Helper Functions - NONE
*/

/**
 * Define Global Variables 
 */
 let globalButtonArray = [];  //Use to store navigation buttons 
 
/**
 * Begin Main Functions
 */
main(); //Code execution starts here.

/**
* To dynamically build the navigation buttons, get the number of existing ".landing__container" classes and then insert the required number of unordered list items 
* (each with an embedded button element for visual clarity) into the navigation menu as a horizontal unordered list of button elements.   
*/
function main(evt) {
    const navList = document.getElementById('navbar__list');
    navList.insertAdjacentHTML('afterbegin', '<p><bold><em>Click a "Section" button to scroll to a particular section:</em></bold></p>');
    
    for (let i = 1; i <= document.querySelectorAll(".landing__container").length; i++) {  //for "length" ref: https://stackoverflow.com/questions/20040825/check-how-many-li-there-are-in-a-ul-with-javascript/20040849   (section 7 answer) */
        const liNavButton = document.createElement('li');
        const navbutton = document.createElement("button");
        navbutton.innerHTML = 'Section ' + i;
        globalButtonArray.push(navbutton); //Save buttons into a Global array for later access in the setBubbleBackground function to change background for active button 
        liNavButton.appendChild(navbutton);
        navList.appendChild(liNavButton);
    } 

    //For efficiency, add the event listener to the buttons parent element (and not to each button), and have one separate setBubbleBackground function (see further below).
    //Moreover, also for efficency, use the "true" parmeter to invoke the listener at the capturing phase, instead of waiting to go to the "at target" and "bubbling" phases.   
    navList.addEventListener('click', setBubbleBackground, true);  
}

/**
* This function - called from clicking one of the navigation buttons generated above - removes the floating bubbles background from all sections, and then resets
* the bubbles background for the clicked navigation button in question - so the user knows which section class is active. Scrolling to the selected section is then run.
*/
function setBubbleBackground(evt) {
    for (let i = 1; i <= document.querySelectorAll(".landing__container").length; i++) {
        document.querySelector('#section' + i).classList.remove("your-active-class");
        document.querySelector('#section' + i).style.opacity = 0.09;  //Fade out the text on non active sections. 
    }
        
    document.querySelector('#section' + evt.target.textContent.substring(8)).classList.add("your-active-class");  //ref: https://stackoverflow.com/questions/51642432/easy-way-to-set-active-class-with-javascript/51642512
    document.querySelector('#section' + evt.target.textContent.substring(8)).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"}); //ref: https://stackoverflow.com/questions/3163615/how-to-scroll-an-html-page-to-a-given-anchor
    document.querySelector('#section' + evt.target.textContent.substring(8)).style.opacity = 1; //Hightlight the text on the selected section to mark it as active.
       
    //Set the specific navigation button to "active" for the user selected section, via accessing the nav buttons stored in global array "globalButtonArray". 
    for (let i = 0; i < globalButtonArray.length; i++) {
         if (i + 1 == evt.target.textContent.substring(8)) {
            globalButtonArray[i].style.background = 'lightGray';
            globalButtonArray[i].style.color = 'blue';
         }
         else {
            globalButtonArray[i].style.background = 'lightcyan';
            globalButtonArray[i].style.color = 'black';
         } 
    }
}

/**
 * End Main Functions
 */