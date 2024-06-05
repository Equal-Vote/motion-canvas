import {makeScene2D, Circle, Rect, Line, Txt} from '@motion-canvas/2d';
import {all, createRef, delay, easeInCubic, easeOutCubic, easeOutQuad, makeRef, range, useLogger, waitFor, waitUntil} from '@motion-canvas/core';
import { BKGGRAY, DKGRAY, RED, TitleFont, WHITE } from '../constants';
import { Election } from '../components/Election';

export default makeScene2D(function* (view) {
  let elections: Election[] = [];

  /* per starvoting.org/rcv_accuracy report + aspen*/
  let electionCount=463;

  /*
  Majority failures (per report) + Minneapolis_11072017_Ward3CityCouncil compromise failure
  */
  let anyFailureCount=131;

  /* per starvoting.org/rcv_accuracy report + aspen*/
  let competitiveCount=89;

  /*
  Burlington, Moab, Alaska
  */
  let condorcetFailureCount=3;

  /*
  SanFrancisco_11032020_BOARDOFSUPERVISORSDISTRICT7
  Oakland_11082022_Schoolboarddistrict4
  PierceCounty_11042008_CountyExecutiveMember
  Burlington_03032009_Mayor
  Oakland_11022010_Mayor
  Berkeley_11082016_CityCouncilDistrict2
  Minneapolis_11072017_Ward3CityCouncil
  Minneapolis_11022021_CityCouncilWard2
  Moab_11022021_CityCouncil
  Alaska_08162022_HouseofRepresentativesSpecial
  Aspen
  */
  let failuresOtherThanMajority=11;

  let threeOrMoreCandidates=327;

  let electionSize=50;
  let electionGap=10;
  let electionColumns=30;
  let electionX = -((electionColumns-1)*(electionSize+electionGap)) / 2;
  let electionY = -((Math.ceil(electionCount/electionColumns)-1)*(electionSize+electionGap)) / 2;

  view.add(
    <>
      {range(electionCount).map(i => 
        <Election
          ref={makeRef(elections, i)}
          size={electionSize}
          position={[
            electionX+((i%electionColumns)*(electionSize+electionGap)),
            electionY+(Math.floor(i/electionColumns)*(electionSize+electionGap))
          ]}
          opacity={0}
          scale={.8}
        />
      )}
    </>
  );

  yield* waitFor(1)
  // randomly spawn elections
  yield* all(...elections.map((election, i) => delay(Math.random(), all(election.opacity(1, .1), election.scale(1, .1)))));
  //yield* all(...elections.map((election, i) => delay(.08*((i % electionColumns) + Math.floor(i / electionColumns)), all(election.opacity(1, .1), election.scale(1, .2)))));
  yield* waitFor(.2)
  // majority failures (assuming that this also includes all other failures)
  yield* all(...elections.slice(0, anyFailureCount).map((election, i) => delay(.05*((i % electionColumns) + Math.floor(i / electionColumns)), election.redX())));
  yield* waitFor(.2)
  yield* all(...elections.slice(failuresOtherThanMajority, anyFailureCount).reverse().map((election, i) => delay(.005*i, election.grayX())));
  yield* waitFor(.2)
  yield* all(...elections.slice(condorcetFailureCount, failuresOtherThanMajority).reverse().map((election, i) => delay(.1*i, election.grayX())));
  yield* waitFor(.2)
  yield* all(...elections.slice(condorcetFailureCount, anyFailureCount).map((election, i) => election.invisibleX()));
  yield* waitFor(.2)
  yield* all(...elections.slice(threeOrMoreCandidates).reverse().map((election, i) => delay(.08*Math.floor((i+2) / electionColumns), election.uncompetitive())));
  yield* waitFor(.2)
  yield* all(...elections.slice(competitiveCount,threeOrMoreCandidates).reverse().map((election, i) => delay(.08*Math.floor((i+2) / electionColumns), election.uncompetitive())));
  yield* waitFor(.2)
});
