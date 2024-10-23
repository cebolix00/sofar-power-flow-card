# Sofar Power Flow Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE)

A custom power flow visualization card for Sofar inverters in Home Assistant.

## Installation

### HACS (Recommended)
1. Make sure [HACS](https://hacs.xyz/) is installed
2. Add this repository as a custom repository in HACS
   - Click on the menu icon in the top right corner and select "Custom repositories"
   - Add URL `https://github.com/YOURUSERNAME/sofar-power-flow-card`
   - Select category "Lovelace"
3. Click Install
4. Restart Home Assistant

### Manual Installation
1. Download `sofar-power-flow-card.js` from the latest release
2. Copy it to `config/www/` directory
3. Add the following to your `configuration.yaml`:

```yaml
lovelace:
  resources:
    - url: /local/sofar-power-flow-card.js
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

## Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| entities | object | required | Entity mappings |
| solar | string | required | Solar power sensor |
| grid | string | required | Grid power sensor |
| home | string | required | Home consumption sensor |
| battery | string | optional | Battery power sensor |
| batteryLevel | string | optional | Battery level sensor |

[releases-shield]: https://img.shields.io/github/release/YOURUSERNAME/sofar-power-flow-card.svg
[releases]: https://github.com/YOURUSERNAME/sofar-power-flow-card/releases
[license-shield]: https://img.shields.io/github/license/YOURUSERNAME/sofar-power-flow-card.svg