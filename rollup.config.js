import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/power-flow-card.js',
  output: {
    dir: 'dist',
    format: 'es',
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
