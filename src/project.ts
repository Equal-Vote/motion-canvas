import {makeProject} from '@motion-canvas/core';

import condorcet from './scenes/condorcet?scene';
import spoiler from './scenes/spoiler?scene';
import spoiler2000 from './scenes/spoiler2000?scene';
import monotonicity from './scenes/monotonicity?scene';
import claims from './scenes/claims?scene';
import allElections from './scenes/allElections?scene';
import equalVoteOutro from './scenes/equalVoteOutro?scene';
import states from './scenes/states?scene';
import parties from './scenes/parties?scene';

export default makeProject({
  scenes: [
    equalVoteOutro,
    //condorcet,
    //spoiler,
    //spoiler2000,
    //monotonicity,
    //claims,
    //allElections,
    //states,
    //parties
  ],
});
