import {makeProject} from '@motion-canvas/core';

import condorcet from './scenes/condorcet?scene';
import spoiler from './scenes/spoiler?scene';
import monotonicity from './scenes/monotonicity?scene';

export default makeProject({
  scenes: [
    condorcet,
    spoiler,
    monotonicity,
  ],
});
