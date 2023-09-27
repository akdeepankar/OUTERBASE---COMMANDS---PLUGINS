var privileges = [
    'cellValue',
    'configuration',
]

// Template for the plugin cell's HTML structure.
var templateCell_$PLUGIN_ID = document.createElement('template')
templateCell_$PLUGIN_ID.innerHTML = `
<style>
    .container {
        display: flex;
        align-items: center;
    }

    .sound-button {
        cursor: pointer;
        margin-left: 8px;
        font-size: 24px;
    }
</style>

<div class="container">
    <span class="sound-button">&#x1F50A;</span>
    <span id="text"></span>
</div>
`

// This is the configuration object that Outerbase passes to your plugin.
// Define all of the configuration options that your plugin requires here.
class OuterbasePluginConfig_$PLUGIN_ID {
    constructor(object) {
        // No custom properties needed in this plugin configuration.
    }
}

class OuterbasePluginCell_$PLUGIN_ID extends HTMLElement {
    static get observedAttributes() {
        return privileges
    }

    config = new OuterbasePluginConfig_$PLUGIN_ID({})

    constructor() {
        super()

        // The shadow DOM is a separate DOM tree that is attached to the element.
        // This allows us to encapsulate our styles and markup. It also prevents
        // styles from the parent page from leaking into our plugin.
        this.shadow = this.attachShadow({ mode: 'open' })
        this.shadow.appendChild(templateCell_$PLUGIN_ID.content.cloneNode(true))
    }

    // SpeechSynthesisUtterance instance to store the active speech
    activeUtterance = null;

    // Lifecycle callback when the element is connected to the DOM.
    connectedCallback() {
        // Parse the configuration object from the `configuration` attribute
        // and store it in the `config` property.
        this.config = new OuterbasePluginConfig_$PLUGIN_ID(
            JSON.parse(this.getAttribute('configuration'))
        )

        // Seting the text content of the cell
        const textElement = this.shadow.querySelector('#text')
        textElement.textContent = this.getAttribute('cellvalue')

        // click event listener to the sound button
        const soundButton = this.shadow.querySelector('.sound-button')
        soundButton.addEventListener('click', () => {
            if (this.activeUtterance) {
                // If an active utterance exists, it stop it
                this.activeUtterance.onend = null; // Remove onend event listener
                window.speechSynthesis.cancel(); // Cancel the active speech
                this.activeUtterance = null; // Clear the active utterance
                soundButton.textContent = '🔊'; // Change button icon to "music"
            } else {
                // If no active utterance, speak the text
                this.activeUtterance = this.speakText(textElement.textContent);
                this.activeUtterance.onend = () => {
                    // Clear the active utterance when speech ends
                    this.activeUtterance = null;
                    soundButton.textContent = '🔊'; // Change button icon to "music"
                };
                soundButton.textContent = '🔇'; // Change button icon to "music off"
            }
        })
    }

    // Function to speak the given text using the Web Speech API
    speakText(text) {
        if ('speechSynthesis' in window) {
            const synthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            synthesis.speak(utterance);
            return utterance;
        } else {
            alert('Text-to-speech is not supported in this browser.');
            return null;
        }
    }
}

// DO NOT change the name of this variable or the classes defined in this file.
// Changing the name of this variable will cause your plugin to not work properly
// when installed in Outerbase.
window.customElements.define('outerbase-plugin-cell-$PLUGIN_ID', OuterbasePluginCell_$PLUGIN_ID)
