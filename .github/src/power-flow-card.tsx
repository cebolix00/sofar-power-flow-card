import { LitElement, html, css } from 'lit';
import { styles } from './styles';
import { formatPower, formatEnergy } from './utils';

class SofarPowerFlowCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
    };
  }

  static get styles() {
    return [styles];
  }

  setConfig(config) {
    if (!config.entities) {
      throw new Error('Please define entities');
    }
    this.config = config;
  }

  render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    const solarPower = this._getValue('solar');
    const gridPower = this._getValue('grid');
    const batteryPower = this._getValue('battery');
    const homePower = this._getValue('home');
    const batteryLevel = this._getValue('batteryLevel');

    return html`
      <ha-card>
        <div class="card-content">
          <div class="power-flow">
            <!-- Solar Section -->
            <div class="power-source solar">
              <ha-icon icon="mdi:solar-power"></ha-icon>
              <span class="power-value">${formatPower(solarPower)}</span>
            </div>

            <!-- Grid Section -->
            <div class="power-source grid">
              <ha-icon icon="mdi:transmission-tower"></ha-icon>
              <span class="power-value">${formatPower(gridPower)}</span>
              <span class="status">${gridPower < 0 ? 'Exporting' : 'Importing'}</span>
            </div>

            <!-- Battery Section -->
            <div class="power-source battery">
              <ha-icon icon="mdi:battery-${Math.round(batteryLevel/10)*10}"></ha-icon>
              <span class="power-value">${formatPower(batteryPower)}</span>
              <span class="level">${batteryLevel}%</span>
            </div>

            <!-- Home Section -->
            <div class="power-sink home">
              <ha-icon icon="mdi:home"></ha-icon>
              <span class="power-value">${formatPower(homePower)}</span>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  _getValue(entityType) {
    const entityId = this.config.entities[entityType];
    if (!entityId) return 0;
    
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return 0;
    
    return Number(stateObj.state) || 0;
  }
}

customElements.define('sofar-power-flow-card', SofarPowerFlowCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "sofar-power-flow-card",
  name: "Sofar Power Flow Card",
  description: "Power flow visualization for Sofar inverters"
});
