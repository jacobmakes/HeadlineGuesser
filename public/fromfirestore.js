const db = firebase.firestore();
const headline = document.querySelector('.headlinetext');


const headlinelist = {
mail:[],
guardian:[]

}

let count = {mail:0,
              guardian:0 }

//TODO: font size adjust to headline length
function newheadline(paper){
  headline.innerText = headlinelist[paper][count[paper]];
  count[paper]++;


}


const d = new Date();
const mins = d.getUTCMinutes();
const randselector = Math.ceil(mins/10);
const randchoice = 'random'+randselector;  //this function chooses rand1, rand2 or rand3.. etc based on time
let lastVisible = {mail:null, guardian:null};

async function getFromLaunch(paper){ //get with a limited number of entries

 await db.collection(paper).orderBy(`random.${randchoice}`).limit(20).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.data().webTitle);
      headlinelist[paper].push(doc.data().title);

    });
    console.log(headlinelist[paper], paper);

    lastVisible[paper] = querySnapshot.docs[querySnapshot.docs.length-1];
    console.log(" Launch last", lastVisible);
  
  }).catch(err => console.log('wrong'));

  return 
  }



function getFromAdvanced(paper){ //get with a limited number of entries


      db.collection(paper).orderBy(`random.${randchoice}`).startAt(lastVisible[paper]).limit(20).get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.data().webTitle);
          headlinelist[paper].push(doc.data().title);

        });
        console.log('getfromadvanced run for '+paper);

        if(querySnapshot.docs[querySnapshot.docs.length-1]){
        lastVisible[paper] = querySnapshot.docs[querySnapshot.docs.length-1];}
        else{console.log('SORRY RUN OUT',paper);}
        console.log("last", lastVisible);
      
      }).catch(err => console.log('wrong'));
      }
