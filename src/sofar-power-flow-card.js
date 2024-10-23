class SofarPowerFlowCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
        <ha-card>
          <div class="card-content" style="padding: 16px;">
            <div style="display: grid; grid-template-areas:
                'solar  .      .'
                '.      home   .'
                'battery grid  .';
              gap: 20px; margin: 20px 0;">
              
              <div style="grid-area: solar; text-align: center; padding: 10px; border-radius: 8px; background: var(--ha-card-background, var(--card-background-color, white)); box-shadow: var(--ha-card-box-shadow, none);">
                <div>Solar</div>
                <div class="power-value" style="font-size: 1.2em; font-weight: bold;"></div>
              </div>
              
              <div style="grid-area: home; text-align: center; padding: 10px; border-radius: 8px; background: var(--ha-card-background, var(--card-background-color, white)); box-shadow: var(--ha-card-box-shadow, none);">
                <div>Home</div>
                <div class="power-value" style="font-size: 1.2em; font-weight: bold;"></div>
              </div>
              
              <div style="grid-area: grid; text-align: center; padding: 10px; border-radius: 8px; background: var(--ha-card-background, var(--card-background-color, white)); box-shadow: var(--ha-card-box-shadow, none);">
                <div>Grid</div>
                <div class="power-value" style="font-size: 1.2em; font-weight: bold;"></div>
              </div>
              
              <div style="grid-area: battery; text-align: center; padding: 10px; border-radius: 8px; background: var(--ha-card-background, var(--card-background-color, white)); box-shadow: var(--ha-card-box-shadow, none);">
                <div>Battery</div>
                <div class="power-value" style="font-size: 1.2em; font-weight: bold;"></div>
                <div class="battery-level" style="font-size: 0.9em; color: var(--secondary-text-color);"></div>
              </div>
            </div>
          </div>
        </ha-card>
      `;
      this.content = true;
    }

    const config = this._config;
    if (!config || !hass) return;

    // Update values
    const solar = hass.states[config.entities.solar];
    const grid = hass.states[config.entities.grid];
    const home = hass.states[config.entities.home];
    const battery = config.entities.battery ? hass.states[config.entities.battery] : null;
    const batteryLevel = config.entities.batteryLevel ? hass.states[config.entities.batteryLevel] : null;

    // Update DOM
    this.querySelector('[style*="grid-area: solar"] .power-value').textContent = 
      solar ? `${Math.round(solar.state)}W` : 'N/A';
    
    this.querySelector('[style*="grid-area: home"] .power-value').textContent = 
      home ? `${Math.round(home.state)}W` : 'N/A';
    
    this.querySelector('[style*="grid-area: grid"] .power-value').textContent = 
      grid ? `${Math.round(grid.state)}W` : 'N/A';

    const batteryElement = this.querySelector('[style*="grid-area: battery"]');
    if (battery) {
      batteryElement.style.display = 'block';
      batteryElement.querySelector('.power-value').textContent = 
        `${Math.round(battery.state)}W`;
      
      if (batteryLevel) {
        batteryElement.querySelector('.battery-level').textContent = 
          `${Math.round(batteryLevel.state)}%`;
      }
    } else {
      batteryElement.style.display = 'none';
    }
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

  getCardSize() {
    return 4;
  }
}

customElements.define('sofar-power-flow-card', SofarPowerFlowCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "sofar-power-flow-card",
  name: "Sofar Power Flow Card",
  description: "Power flow visualization for Sofar inverters"
});
