if (!customElements.get("sofar-power-flow-card")) {
  const loadLit = async () => {
    if (!window.LitElement) {
      await import("https://unpkg.com/lit@2.7.0/dist/all.js");
    }
    const { LitElement, html, css } = window.Lit;

    class SofarPowerFlowCard extends LitElement {
      static get properties() {
        return {
          hass: { type: Object },
          config: { type: Object }
        };
      }

      static get styles() {
        return css`
          :host {
            display: block;
            padding: 16px;
          }
          .card-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .power-flow {
            display: grid;
            grid-template-areas:
              "solar  .      ."
              ".      home   ."
              "battery grid  .";
            gap: 20px;
            margin: 20px 0;
          }
          .power-item {
            text-align: center;
            padding: 10px;
            border-radius: 8px;
            background: var(--ha-card-background, var(--card-background-color, white));
            box-shadow: var(--ha-card-box-shadow, none);
          }
          .power-value {
            font-size: 1.2em;
            font-weight: bold;
          }
          .battery-level {
            font-size: 0.9em;
            color: var(--secondary-text-color);
          }
        `;
      }

      setConfig(config) {
        if (!config.entities) {
          throw new Error('Please define entities');
        }

        if (!config.entities.solar || !config.entities.grid || !config.entities.home) {
          throw new Error('Required entities: solar, grid, home');
        }

        this.config = config;
      }

      render() {
        if (!this.hass || !this.config) {
          return html``;
        }

        const solar = this.hass.states[this.config.entities.solar];
        const grid = this.hass.states[this.config.entities.grid];
        const home = this.hass.states[this.config.entities.home];
        const battery = this.config.entities.battery ? this.hass.states[this.config.entities.battery] : null;
        const batteryLevel = this.config.entities.batteryLevel ? this.hass.states[this.config.entities.batteryLevel] : null;

        return html`
          <ha-card>
            <div class="card-content">
              <div class="power-flow">
                <div class="power-item" style="grid-area: solar;">
                  <div>Solar</div>
                  <div class="power-value">${solar ? `${Math.round(solar.state)}W` : 'N/A'}</div>
                </div>
                
                <div class="power-item" style="grid-area: home;">
                  <div>Home</div>
                  <div class="power-value">${home ? `${Math.round(home.state)}W` : 'N/A'}</div>
                </div>
                
                <div class="power-item" style="grid-area: grid;">
                  <div>Grid</div>
                  <div class="power-value">${grid ? `${Math.round(grid.state)}W` : 'N/A'}</div>
                </div>
                
                ${battery ? html`
                  <div class="power-item" style="grid-area: battery;">
                    <div>Battery</div>
                    <div class="power-value">${Math.round(battery.state)}W</div>
                    ${batteryLevel ? html`
                      <div class="battery-level">${Math.round(batteryLevel.state)}%</div>
                    ` : ''}
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
      description: "Power flow visualization for Sofar inverters"
    });
  };

  loadLit();
}
