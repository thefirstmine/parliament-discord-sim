function weightedRandom(prob) {
  let i, sum=0, r=Math.random();
  for (i in prob) {
    sum += prob[i];
    if (r <= sum) return i;
  }
}

function equal_choice(list){
  
}

function weightedRandomDistrib(min,max,mean,varianceFactor) {
  let prob = [], seq = [];
  for(let i=min;i<max;i++) {
    prob.push(Math.pow(max-Math.abs(mean-i),varianceFactor));
    seq.push(i);
  }
  return chance.weighted(seq, prob);
}

function createMinisters(list,issues,parties){
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

function updateMinister(minister, parties){
  let loyalty = minister["loyalty"], disloyalty = minister["disloyalty"], party;
  
}