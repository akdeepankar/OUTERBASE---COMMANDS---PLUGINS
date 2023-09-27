// Define privileges for this plugin.
var privileges = ['cellValue'];

// Create a template for the plugin cell's HTML structure.
var templateCell_$PLUGIN_ID = document.createElement('template');
templateCell_$PLUGIN_ID.innerHTML = `
<div class="container">
    <div id="rating" class="rating"></div>
</div>
<style>
    .container {
        display: flex;
        align-items: center;
    }

    .rating {
        font-size: 24px;
        display: flex;
    }

    .star {
        color: #FFD700; /* Gold color for stars */
        cursor: pointer;
    }
</style>
`;

// This is the configuration object that Outerbase passes to your plugin.
// Define all of the configuration options that your plugin requires here.
class OuterbasePluginConfig_$PLUGIN_ID {
    constructor(object) {
        // No custom properties needed in this plugin configuration.
    }
}

// Define the main plugin cell class.
class OuterbasePluginCell_$PLUGIN_ID extends HTMLElement {
    static get observedAttributes() {
        return privileges;
    }

    config = new OuterbasePluginConfig_$PLUGIN_ID({});

    constructor() {
        super();

        // Create a shadow DOM for encapsulation.
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(templateCell_$PLUGIN_ID.content.cloneNode(true));
    }

    // Function to set the star rating based on the numeric value.
    setStarRating(value) {
        // Select the rating container element.
        const ratingElement = this.shadow.querySelector('#rating');

        // Create stars based on the value.
        for (let i = 1; i <= value; i++) {
            const starElement = document.createElement('span');
            starElement.classList.add('star');
            starElement.textContent = '★'; // Filled star
            ratingElement.appendChild(starElement);
        }
    }

    // Lifecycle callback when the element is connected to the DOM.
    connectedCallback() {
        // Parse the cell value and set the star rating.
        const cellValue = this.getAttribute('cellvalue');
        const numericValue = parseInt(cellValue);

        if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 5) {
            this.setStarRating(numericValue);
        }
    }
}

// Define the custom element for the plugin cell.
window.customElements.define('outerbase-plugin-cell-$PLUGIN_ID', OuterbasePluginCell_$PLUGIN_ID);
