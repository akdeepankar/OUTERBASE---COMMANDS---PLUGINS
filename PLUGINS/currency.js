// Define privileges for this plugin.
var privileges = ['cellValue', 'configuration'];

// Create a template for the plugin cell's HTML structure.
var templateCell_$PLUGIN_ID = document.createElement('template');
templateCell_$PLUGIN_ID.innerHTML = `
<div class="container">
    <span id="converted-value"></span>
</div>
`;

// This is the configuration object that Outerbase passes to your plugin.
// Define all of the configuration options that your plugin requires here.
class OuterbasePluginConfig_$PLUGIN_ID {
    constructor(object) {
        this.apiKey = object.apiKey || ''; // Your API key for the currency exchange rate service
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

    // This Function will Allows us to fetch the exchange rates and convert the currency.
    async convertCurrency(value) {
        try {
            // Fetching the  real-time exchange rates using an API.
            const response = await fetch(
                `https://api.exchangerate-api.com/v4/latest/USD`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }

            const data = await response.json();

            // Converting the currency value to INR.
            const inrValue = value * data.rates.INR;

            return inrValue.toFixed(2); // Round to 2 decimal places.
        } catch (error) {
            console.error('Currency conversion error:', error);
            return value; // Returning the original value on error.
        }
    }

    // Lifecycle callback when the element is connected to the DOM.
    connectedCallback() {
        // Parsing the cell value and convert it to INR.
        const cellValue = this.getAttribute('cellvalue');
        this.convertCurrency(parseFloat(cellValue)).then((inrValue) => {
            // It will Display the converted INR value in the cell.
            const convertedValueElement = this.shadow.querySelector('#converted-value');
            convertedValueElement.textContent = `₹ ${inrValue}`;
        });
    }
}

// Define the custom element for the plugin cell.
window.customElements.define('outerbase-plugin-cell-$PLUGIN_ID', OuterbasePluginCell_$PLUGIN_ID);
