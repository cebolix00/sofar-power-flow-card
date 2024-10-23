import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/sofar-power-flow-card.js',  // Update this line
  output: {
    dir: 'dist',
    format: 'es',
    filename: 'sofar-power-flow-card.js'  // Make sure this matches
  },
  plugins: [
    resolve(),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
};
