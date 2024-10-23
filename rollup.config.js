import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/sofar-power-flow-card.js',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    resolve({
      browser: true,
      dedupe: ['lit']
    }),
    terser()
  ],
};
