# Sofar Power Flow Card

A custom power flow visualization card for Sofar inverters in Home Assistant.

## Installation

### HACS (Recommended)
1. Open HACS in your Home Assistant instance
2. Click on "Frontend" section
3. Click the "+ Explore & Download Repositories" button
4. Search for "Sofar Power Flow Card"
5. Click Download
6. Restart Home Assistant

### Manual Installation
1. Download `power-flow-card.js` from the latest release
2. Copy it to `config/www/power-flow-card/` directory
3. Add the following to your `configuration.yaml`:

```yaml
lovelace:
  resources:
    - url: /local/power-flow-card/power-flow-card.js
      type: module
```

## Configuration

Add the card to your dashboard with this configuration:

```yaml
type: custom:sofar-power-flow-card
entities:
  solar: sensor.pv1_power
  grid: sensor.activepowerpcc
  home: sensor.activepowerloadsys
  battery: sensor.battery_1_power
  batteryLevel: sensor.battery_1_soc
```

### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| entities | object | required | Entity mappings |
| solar | string | required | Solar power sensor |
| grid | string | required | Grid power sensor |
| home | string | required | Home consumption sensor |
| battery | string | optional | Battery power sensor |
| batteryLevel | string | optional | Battery level sensor |

## Support

For bugs or feature requests, please [open an issue](https://github.com/yourusername/sofar-power-flow-card/issues).

