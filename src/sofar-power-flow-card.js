const CARD_VERSION = '1.0.0';

console.info(
  `%c SOFAR-POWER-FLOW-CARD %c ${CARD_VERSION} `,
  'color: white; background: blue; font-weight: 700;',
  'color: blue; background: white; font-weight: 700;',
);

class SofarPowerFlowCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    if (!config.entities) {
      throw new Error('Please define entities');
    }

    if (!config.entities.solar || !config.entities.grid || !config.entities.home) {
      throw new Error('Required entities: solar, grid, home');
    }

    this.config = config;
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  render() {
    if (!this.config || !this._hass) return;

    const solar = this._hass.states[this.config.entities.solar];
    const grid = this._hass.states[this.config.entities.grid];
    const home = this._hass.states[this.config.entities.home];
    const battery = this.config.entities.battery ? this._hass.states[this.config.entities.battery] : null;
    const batteryLevel = this.config.entities.batteryLevel ? this._hass.states[this.config.entities.batteryLevel] : null;

    this.shadowRoot.innerHTML = `
      <ha-card>
        <style>
          .container { padding: 16px; }
          .grid {
            display: grid;
            grid-template-areas:
              "solar  .      ."
              ".      home   ."
              "battery grid  .";
            gap: 16px;
          }
          .item {
            padding: 8px;
            border-radius: 4px;
            background: var(--card-background-color);
            text-align: center;
          }
          .value {
            font-size: 1.2em;
            font-weight: bold;
          }
        </style>
        <div class="container">
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
        </div>
      </ha-card>
    `;
  }
}

customElements.define('sofar-power-flow-card', SofarPowerFlowCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "sofar-power-flow-card",
  name: "Sofar Power Flow Card",
  description: "Power flow visualization for Sofar inverters",
  preview: false,
  documentationURL: "https://github.com/cebolix00/sofar-power-flow-card"
});
