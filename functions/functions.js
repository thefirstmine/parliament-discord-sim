const PARLIAMENT_SEATS = 101;

function weightedRandom(prob) {
  let i, sum=0, r=Math.random();
  for (i in prob) {
    sum += prob[i];
    if (r <= sum) return i;
  }
}

function pick_one(list){
  // wrapper function for picking one item in a uniform distribution 
  let weight = 1/list.length, dict = {};
  for(item of list){
    dict[item] = weight;
  }
  return weightedRandom(dict);
}

function weightedRandomDistrib(min,max,mean,varianceFactor) {
  let prob = [], seq = [];
  for(let i=min;i<max;i++) {
    prob.push(Math.pow(max-Math.abs(mean-i),varianceFactor));
    seq.push(i);
  }
  return chance.weighted(seq, prob);
}

function createMinisters(list,issues){
  let minister, issue, stance=0, stances={};
  for (minister in list){
    for (issue in issues) {
      stances[issue] = Math.random();
    }
    let loyalty = Math.random(), disloyalty = 1 - loyalty;
    stances["loyalty"] = loyalty;
    stances["disloyalty"] = disloyalty;
    stances["party"] = "";
    list[minister] = stances
    stances = {}
  }
  return list
}

function createParties(parties, issues){
  let partyName, issue, stances={};
  for (partyName in parties){
    let representation = parties[partyName];
    for (issue in issues) {
      stances[issue] = Math.random();
    }
    stances["ministers"] = PARLIAMENT_SEATS * representation;
    parties[partyName] = stances
    stances = {}
  }
  return parties
}

function assignToParties(ministers, parties){
  // equation: newStance = oldStance * disloyalty + partyStance * loyalty
  for (minister in ministers){
      let stance, stances = ministers[minister];
      
      let partyNames = Object.keys(parties);
      let partyName = pick_one(partyNames), partyStance = parties[partyName];
      if(parties[partyName]["ministers"] > 0 ) {
        for(issue in stances){
          let loyalty = stances["loyalty"], disloyalty = stances["disloyalty"];
          if( !(issue == "disloyalty" && issue == "loyalty" && issue == "party" )){
            ministers[minister][issue] = stances[issue] * disloyalty + partyStance[issue] * loyalty;
          }
        }
        ministers["minister"]["party"] = partyName;
        parties[partyName]["ministers"] -= 1;
      }   
  }
}