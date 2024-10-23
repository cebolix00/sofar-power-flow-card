import { css } from 'lit';

export const styles = css`
  :host {
    --card-padding: 16px;
  }

  .card-content {
    padding: var(--card-padding);
  }

  .power-flow {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    align-items: center;
  }

  .power-source {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    background: rgba(var(--rgb-primary-color), 0.1);
  }

  .solar { color: var(--warning-color, #ffa726); }
  .grid { color: var(--info-color, #2196f3); }
  .battery { color: var(--success-color, #4caf50); }
  .home { color: var(--primary-color, #9b9b9b); }

  ha-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
  }

  .power-value {
    font-size: 1.2em;
    font-weight: bold;
  }

  .status, .level {
    font-size: 0.9em;
    opacity: 0.8;
  }
`;
