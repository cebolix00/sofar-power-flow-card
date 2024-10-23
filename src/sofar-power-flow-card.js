(() => {
    const html = window.customElements.get('home-assistant-main') 
        ? Object.getPrototypeOf(customElements.get('home-assistant-main')).prototype.html 
        : null;
    const css = window.customElements.get('home-assistant-main') 
        ? Object.getPrototypeOf(customElements.get('home-assistant-main')).prototype.css 
        : null;

    console.log('Loading Sofar Power Flow Card...');

    class SofarPowerFlowCard extends HTMLElement {
        constructor() {
            super();
            this._initialized = false;
        }

        connectedCallback() {
            if (this._initialized) return;
            this._initialized = true;

            const card = document.createElement('ha-card');
            const content = document.createElement('div');
            content.className = 'card-content';
            card.appendChild(content);
            this.appendChild(card);

            console.log('Sofar Power Flow Card initialized');
            this._content = content;
            this._render();
        }

        set hass(hass) {
            this._hass = hass;
            this._render();
        }

        setConfig(config) {
            if (!config.entities) {
                throw new Error('Please define entities');
            }
            if (!config.entities.solar || !config.entities.grid || !config.entities.home) {
                throw new Error('Required entities: solar, grid, home');
            }
            this._config = config;
        }

        _render() {
            if (!this._initialized || !this._config || !this._hass) return;

            const solar = this._hass.states[this._config.entities.solar];
            const grid = this._hass.states[this._config.entities.grid];
            const home = this._hass.states[this._config.entities.home];
            const battery = this._config.entities.battery ? this._hass.states[this._config.entities.battery] : null;
            const batteryLevel = this._config.entities.batteryLevel ? this._hass.states[this._config.entities.batteryLevel] : null;

            this._content.innerHTML = `
                <style>
                    .grid {
                        display: grid;
                        grid-template-areas:
                            "solar  .      ."
                            ".      home   ."
                            "battery grid  .";
                        gap: 16px;
                        padding: 16px;
                    }
                    .item {
                        padding: 16px;
                        background: var(--card-background-color);
                        border-radius: var(--ha-card-border-radius, 4px);
                        text-align: center;
                    }
                    .value {
                        font-size: 1.2em;
                        font-weight: bold;
                        margin-top: 8px;
                    }
                </style>
                <div class="grid">
                    <div class="item" style="grid-area: solar">
                        <div>Solar</div>
                        <div class="value">${solar ? Math.round(solar.state) + 'W' : 'N/A'}</div>
                    </div>
                    <div class="item" style="grid-area: home">
                        <div>Home</div>
                        <div class="value">${home ? Math.round(home.state) + 'W' : 'N/A'}</div>
                    </div>
                    <div class="item" style="grid-area: grid">
                        <div>Grid</div>
                        <div class="value">${grid ? Math.round(grid.state) + 'W' : 'N/A'}</div>
                    </div>
                    ${battery ? `
                        <div class="item" style="grid-area: battery">
                            <div>Battery</div>
                            <div class="value">${Math.round(battery.state)}W</div>
                            ${batteryLevel ? `<div>${Math.round(batteryLevel.state)}%</div>` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
        }
    }

    console.log('Defining sofar-power-flow-card custom element');
    customElements.define('sofar-power-flow-card', SofarPowerFlowCard);

    window.customCards = window.customCards || [];
    window.customCards.push({
        type: "sofar-power-flow-card",
        name: "Sofar Power Flow Card",
        description: "Power flow visualization for Sofar inverters",
    });
})();
