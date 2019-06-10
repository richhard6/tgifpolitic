let statistics = {
  reps: 0,
  dem: 0,
  ind: 0,
  rPerVotes: 0,
  dPerVotes: 0,                                                                                          // voted with partty pct  entre el numero total 
  iPerVotes: 0,
}

let statisticsV2 = {
  numPartyV : 0,
  perPartyV : 0,
}


var members ;


fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
    headers: {
        'X-API-Key': 'OIYqnvh45TuPsczPNG4SxTAQpkAb5UixfCO3m4QT'
    }
}) 
 .then(function(res){
    return res.json();
} )
.then(function(json){
    
members = json.results[0].members;
nRepresented();
leastEngaged(); 
mostEngaged();

})





  function nRepresented() {
  
  let repuReps = document.getElementsByClassName("republicanReps")[0];
  let demoReps = document.getElementsByClassName("democratReps")[0];
  let indeReps = document.getElementsByClassName("independentReps")[0];
  let percentRepus = document.getElementsByClassName("repuPercent")[0];
  let percentDemos = document.getElementsByClassName("demoPercent")[0];
  let percentIndes = document.getElementsByClassName("indePercent")[0];
  let sumRep = 0;
  let sumDec = 0;
  let sumInd = 0;


   for (let i = 0; i < members.length; i++) {
    var partido = members[i].party;
    var percentAll = members[i].votes_with_party_pct;

    if (partido.includes("R")) {
        statistics.reps ++
        sumRep+= percentAll;
      
        
       

      }
      else if (partido.includes("D")) {
          statistics.dem ++
          sumDec+= percentAll;
      }
      else if (partido.includes("I")) {
          statistics.ind ++
          sumInd+= percentAll
      }
  
      repuReps.innerHTML = statistics.reps;
      demoReps.innerHTML = statistics.dem;
      indeReps.innerHTML = statistics.ind;
      percentRepus.innerHTML = (sumRep / statistics.reps).toFixed(2);
      percentDemos.innerHTML = (sumDec / statistics.dem).toFixed(2);
      percentIndes.innerHTML = (sumInd / statistics.ind).toFixed(2);

      
      statistics.rPerVotes = (sumRep / statistics.reps).toFixed(2);
      statistics.dPerVotes = (sumDec / statistics.dem).toFixed(2);
      statistics.iPerVotes = (sumInd / statistics.ind).toFixed(2);
      
    }
   }


   
   
   
   

  
   function compare(a,b) {
     a.custom = parseInt((a.votes_with_party_pct * a.total_votes) / 100);
     b.custom = parseInt((b.votes_with_party_pct * b.total_votes) / 100);
    if (a.custom < b.custom)
      return -1;
    if (a.custom > b.custom)
      return 1;
    return 0;
  }

  function compare1(a,b) {
    a.custom = parseInt((a.votes_with_party_pct * a.total_votes) / 100);
     b.custom = parseInt((b.votes_with_party_pct * b.total_votes) / 100);
    if (a.custom > b.custom)
      return -1;
    if (a.custom < b.custom)
      return 1;
    return 0;
  }






function leastEngaged () {

  let percentVotes = document.getElementById("leastEng");
  
  members.sort(compare);
  
  let nuevosMember = parseInt(members.length *(10/100));  
  let template = "";
  
  
  
  
  for (let i = 0; i < nuevosMember; i++) {
  
    let numPartyVotes = parseInt((members[i].votes_with_party_pct * members[i].total_votes) / 100);
    
   
  
    template += `                    
    <tr>
    <td>${members[i].last_name}, ${members[i].first_name}</td>
    <td>${numPartyVotes}</td>
   <td>${members[i].votes_with_party_pct}</td>
  </tr>`   
    percentVotes.innerHTML = template;
    
  }
  
  }



function mostEngaged () {

  let percentVotes = document.getElementById("elBody");
  
  members.sort(compare1);
  
  let nuevosMember = parseInt(members.length *(10/100));  
  let template = "";
  
  
  
  
  for (let i = 0; i < nuevosMember; i++) {
  
    let numPartyVotes = parseInt((members[i].votes_with_party_pct * members[i].total_votes) / 100);
    
   
  
    template += `                    
    <tr>
    <td>${members[i].last_name}, ${members[i].first_name}</td>
    <td>${numPartyVotes}</td>
   <td>${members[i].votes_with_party_pct}</td>
  </tr>`   
    percentVotes.innerHTML = template;
    
  }
  
  }
  
  