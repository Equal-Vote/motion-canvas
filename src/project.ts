import {makeProject} from '@motion-canvas/core';

import condorcet from './scenes/condorcet?scene';
import spoiler from './scenes/spoiler?scene';
import monotonicity from './scenes/monotonicity?scene';
import claims from './scenes/claims?scene';
import allElections from './scenes/allElections?scene';

export default makeProject({
  scenes: [
    allElections,
    //condorcet,
    //spoiler,
    //monotonicity,
    //claims
  ],
});
