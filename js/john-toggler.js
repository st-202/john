//First declare the variables that we could need
//For tabs
let items = null;
let tabButtonsZone = null;
let tabButtons = null;
let currentItem = 0;

//For lights
let lightsOn = true;
let title;
let card;
let toggleIcon;


/**
 * Remember that we declarated the javascript link in the top of the document !
 * If we try to catch some element (tag) about the HTML thathas not been read before,
 * the JS never could find them. This is important!
 * Or declare the <script src="js/john-toggler.js"></script> at the bottom of the HTML body
 * Or use a listener like I do here to teach you
 */

window.onload = function() {
    //We catch the element where we will paint the buttons
    tabButtonsZone = document.getElementById('john-tab-buttons');
    //We catch the items
    items = document.getElementsByClassName('john-item');
    //For every item, we catch the title (inside an h5 tag) and paint inside the buttonsZone
    for (let i = 0; i < items.length; i++) {
        let itemTitle = items[i].getElementsByTagName('h5')[0].textContent;
        let node = createButtonHtmlNode(itemTitle, i);
        tabButtonsZone.appendChild(node);
        if (i == 0) { //if is the first item (default current tab) show it
            items[i].style.display = 'block';
        }
    }
    //After load all buttons, we catch them and set in a global varialbe;
    tabButtons = tabButtonsZone.getElementsByTagName('button');


    //TO TOGGLE LIGHTS, WE CATCH THE ELEMENTS WHAT WE WILL CHANGE THE STYLE
    lightsOn = true
    toogleIcon = document.getElementById('lights-mode');
    card = document.getElementById('john-card');
}

/**
 * This is the function "onclick" in the toggleLigts icon
 */
function toggleLights() {
    //First, change the value of the boolean
    lightsOn = !lightsOn;
    //Second, manage the items (I made with ternary functions, is the same than an if/else)
    document.body.style.backgroundColor = (lightsOn) ? '#fff' : '#333';
    document.body.style.color = (lightsOn) ? '#212529;' : '#999';
    card.style.backgroundColor = (lightsOn) ? '#fff' : '#444';
    toogleIcon.setAttribute('class', (lightsOn) ? 'fas fa-toggle-off' : 'fas fa-toggle-on');
    //We render the button with the new colors
    changeButtonColor();
}

function toggleCurrentTab(id) {
    currentItem = id;
    changeButtonColor();
    changeContent();
}

function changeButtonColor() {
    let classDependsOnLightsMode;
    for (let i = 0; i < tabButtons.length; i++) {
        if (i == currentItem) {
            classDependsOnLightsMode = (lightsOn) ? 'btn-outline-success active' : 'btn-success active';
        } else {
            classDependsOnLightsMode = (lightsOn) ? 'btn-outline-secondary' : 'btn-secondary';
        }
        tabButtons[i].setAttribute('class', `btn btn-sm ${classDependsOnLightsMode}`);
    }
}

function changeContent() {
    for (let i = 0; i < items.length; i++) {
        if (i == currentItem) {
            items[i].style.display = 'block';
        } else {
            items[i].style.display = 'none';
        }
    }

    /* We could made it with ternary rules, (less code lines and more clean)
    for (let i = 0; i < items.length; i++) {
         items[i].style.display = (i == currentItem)? 'block' : 'none';
    }
    */
}

function createButtonHtmlNode(text, id) {
    //Create a node with tag button (<button>)
    let newNode = document.createElement('button');
    //Set attributes to the node (like the class, id, style...)
    if (id == 0) { //if is the first item (default current tab) show it
        newNode.setAttribute('class', 'btn btn-sm btn-outline-success')
    } else {
        newNode.setAttribute('class', 'btn btn-sm btn-outline-secondary')
    }
    newNode.setAttribute('style', 'margin:0 .35em')
        // newNode.setAttribute('id', `item-${id}`)
    newNode.setAttribute('onclick', `toggleCurrentTab('${id}')`)
        //Create the contentText for the tab
    let newNodeText = document.createTextNode(text);
    //Append the contentText inside the new Node
    newNode.appendChild(newNodeText);
    //Return the node full created to be appended to the tabButtonsZone
    return newNode;
}