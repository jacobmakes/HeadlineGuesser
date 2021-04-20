const db = firebase.firestore();
const auth = firebase.auth();
const headline = document.querySelector('.headlinetext');
const paperpic = document.querySelector('#paper');
auth.onAuthStateChanged( (user) =>{
if(user==null){
auth.signInAnonymously().then(
  ()=>{
    console.log('anon sign in')
  }).catch((err)=> console.log(err))
}
}//if
)


const headlinelist = {
mail:[],
guardian:[]

}

let count = {mail:0,
              guardian:0 }

//TODO: font size adjust to headline length
function newheadline(paper){
let headlinetext= headlinelist[paper][count[paper]];
let papertop = paperpic.getBoundingClientRect().top;  //only used in calc of bluetop
let paperbottom = paperpic.getBoundingClientRect().bottom; //only used in calc of bluetop
let bluetop= papertop+(paperbottom-papertop)*(301/619);

let fontS = 50;

headline.style.opacity = '0';
headline.style.fontSize = '50px';
headline.innerText = headlinetext;
let hlbottom = headline.getBoundingClientRect().bottom;



//console.table(hlbottom);
//console.log('bluttop',bluetop);

while(hlbottom>bluetop && fontS >12){
          fontS--;
          headline.style.fontSize = fontS+'px';
          hlbottom = headline.getBoundingClientRect().bottom;

 //console.log('smaller',fontS)
}
headline.style.opacity = '1';




  count[paper]++;


}


const d = new Date();
const mins = d.getUTCMinutes();
const randselector = Math.ceil(mins/10);
const randchoice = 'random'+randselector;  //this function chooses rand1, rand2 or rand3.. etc based on time
let lastVisible = {mail:null, guardian:null};

async function getFromLaunch(paper){ //get with a limited number of entries
const bigrandom= Math.floor(Math.random() * 2147483646/4) + 1;
 await db.collection(paper).where(`random.${randchoice}`, ">=",bigrandom)
 .orderBy(`random.${randchoice}`).limit(20).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.data().webTitle);
      headlinelist[paper].push(doc.data().title);

    });
    console.log(headlinelist[paper], paper);

    lastVisible[paper] = querySnapshot.docs[querySnapshot.docs.length-1];
    console.log(" Launch last", lastVisible[paper].data().title);
  
  }).catch(err => console.log('wrong'));

  return 
  }



function getFromAdvanced(paper){ //get with a limited number of entries
      if(lastVisible[paper]==null){getFromLaunch();}else{
        console.log('starting at '+lastVisible[paper].data().title);
      db.collection(paper).orderBy(`random.${randchoice}`).startAt(lastVisible[paper]).limit(20).get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.data().webTitle);
          headlinelist[paper].push(doc.data().title);
            console.log(doc.data().title);
        });
        console.log('getfromadvanced run for '+paper);
        console.log(querySnapshot.docs.length, 'reteived');
          if(querySnapshot.docs.length < 20){gameover();}

        if(querySnapshot.docs[querySnapshot.docs.length-1]){
        lastVisible[paper] = querySnapshot.docs[querySnapshot.docs.length-1];
        let lv=JSON.stringify(lastVisible);
        localStorage.setItem('lv',lv);}
        else{console.log('SORRY RUN OUT',paper);}
        localStorage.setItem(lastVisible);
        console.log("last", lastVisible[paper].data().title);
      
      }).catch(err => console.log('wrong'));
    }
      }

function gameover(){
console.log('GAME OVER');
//TODO: Write the players accuracy.
}
