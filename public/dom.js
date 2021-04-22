const button1 = document.querySelector('.mailimg');
const button2 = document.querySelector('.guardimg');
const streakDOM = document.querySelector('.streak');
const scorecircle = document.querySelector('.scorecircle');
// const accDOM = document.querySelector('.acc');
const paper1 = 'mail';
const paper2 = 'guardian';


// let acc; //accuracy
let correct = 0; 
let attempts =0;
let streak = 0;
let newschoice; //for the randomly generated one or two
streakDOM.textContent = streak;

 function LAUNCH(){
     Promise.all([
    getFromLaunch('mail'),
    getFromLaunch('guardian')]).then(() =>{

    randomserve(paper1,paper2);
    console.log('launched');
    }).catch((err)=>console.log(err, 'fail'))
}
LAUNCH();   

 function randomserve(paperA,paperB) {
     newschoice = (Math.floor(Math.random()*2)+1).toString();
     console.log('newsc',newschoice)
     if(newschoice === '1') {newheadline(paperA);}
     if(newschoice === '2') {newheadline(paperB);}


  //  accDOM.textContent = (correct/attempts)*100;


}
   console.log('87');
document.addEventListener('click',checkclick);


function checkclick(e){
    const target = e.target;
//console.log(target, 'rect answer', newschoice)
    let clickedpaper;
    let otherpaper
    if(target == button1){
            clickedpaper=paper1;
            otherpaper=paper2;
            if(newschoice==1){correctanswer(clickedpaper,otherpaper);}
            else{wronganswer(clickedpaper,otherpaper);}
        }
if(target == button2){
    clickedpaper=paper2;
    otherpaper=paper1;
    if(newschoice==2){correctanswer(clickedpaper,otherpaper);}
    else{wronganswer(clickedpaper,otherpaper);}
        }

        if(target == button1 || target == button2){
        if(newschoice==1){count[paper1]++;}
        if(newschoice==2){count[paper2]++;}

//download more
        if(count[paper1] >headlinelist[paper1].length-10){getFromAdvanced(paper1);console.log('added')} 
        if(count[paper2] >headlinelist[paper2].length-10){getFromAdvanced(paper2)}
}

}
function correctanswer(paperclicked,otherpaper) {
  //increment paper counts
if(headlinelist[paperclicked][count[paperclicked]]){ //check non null
    db.collection(paperclicked).where('title', "==",headlinelist[paperclicked][count[paperclicked]] ) //get article by headline
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.set( //TODO Understand .ref
            {correct:{[otherpaper]: firebase.firestore.FieldValue.increment(1),
            total: firebase.firestore.FieldValue.increment(1)
            }},{merge:true}
          )
        })
      })     
    }
//increment user counts;
if(auth.currentUser){
  db.collection('users').doc(auth.currentUser.uid).set(
          {correct:{[paperclicked]: firebase.firestore.FieldValue.increment(1),
            total:firebase.firestore.FieldValue.increment(1)},
        },{merge:true}
        ).then(()=>console.log('user guessed '+paperclicked +'correctly'))
        .catch(function(error) {
          console.error('Error writing new message users database', error);
        })
      }

        createflyer(1);
    attempts++;
    correct++;
    streak++;
    streakDOM.textContent = streak;
    streakcolour(streak);
        randomserve(paper1,paper2);
        console.log('c',newschoice)

}
function wronganswer(paperclicked,otherpaper) {
    if(headlinelist[otherpaper][count[otherpaper]]){
        db.collection(otherpaper).where('title', "==",headlinelist[otherpaper][count[otherpaper]] )
        .get().then(querySnapshot => { //console.log('countstuff',headlinelist[otherpaper],count,querySnapshot);
            querySnapshot.forEach(doc => {
              doc.ref.set( //TODO Understand .ref
                {incorrect:{[paperclicked]: firebase.firestore.FieldValue.increment(1),
                total: firebase.firestore.FieldValue.increment(1)
                }},{merge:true}
              )
            })
          })
        }
          //updating individual users scores
          if(auth.currentUser){
        db.collection('users').doc(auth.currentUser.uid).set(
          {incorrect:{[paperclicked]: firebase.firestore.FieldValue.increment(1),
          total:firebase.firestore.FieldValue.increment(1)}},{merge:true}
        ).then(()=>console.log('user guessed '+paperclicked +'incorrectly'))
        .catch(function(error) {
          console.error('Error writing new message users database', error);
        })
      }
        createflyer(0);
    attempts++;
    streak=0;
    streakDOM.textContent = streak;
    streakcolour(streak);
    randomserve(paper1,paper2);
    console.log('w',newschoice)
}
const game = document.querySelector('.game');

//floating scores.
function createflyer(winlose){
  let flyer;
  let icon;
  if(winlose){flyer='plusone'; icon ='plus_one';}
  else{flyer='negone'; icon = 'exposure_neg_1'}
  let span = document.createElement("span");
  span.setAttribute("class", 'material-icons flyer '+flyer);
  textnode = document.createTextNode(icon); 
  span.appendChild(textnode);
  game.appendChild(span);


  setTimeout(()=>{    span.style.transform='translateY(-30vh)';  span.style.opacity='0';  }, 20)
  setTimeout(()=>{  span.remove()}, 6000)
}



//Streak updater

function streakcolour(num){
  console.log('coloring in', num);
 if(num<7){scorecircle.style.backgroundColor='var(--blue)'; return}
 if(num<15){scorecircle.style.backgroundColor='var(--green)'; return;}
 if(num<100){scorecircle.style.backgroundColor=`hsl(${30-30*((num-15)/85)}, 91%, 60%)`;  return;}
 if(num>=100){scorecircle.style.backgroundColor='var(--red)';
 scorecircle.style.borderColor='var(--yellow)'; 
 streakDOM.style.color='var(--yellow)'; return;}

}


//Sign up

const scissors=  document.querySelector('.scispath');
const person=  document.querySelector('.person');
const signinbox=  document.querySelector('.signbox');
const signup=  document.querySelector('.signup'); //not used
const signin=  document.querySelector('.signin'); //notused
let signinboxopen=false;


person.addEventListener('click',e =>{
 if(firebase.auth().currentUser && firebase.auth().currentUser?.providerData.length != 0){    //user logged in go to collection
  window.location.href = "/articles.html";

 }else{ //open sign in box
  openbox();
 }
});

scissors.addEventListener('click',e =>{
  if(firebase.auth().currentUser && firebase.auth().currentUser?.providerData.length != 0){    //user  logged in add to collection
 addtoarticles();
 
  }else{ //open sign in box
   openbox();
  }
 });


function openbox() {
  if(signinboxopen==false){
    signinbox.style.transform='scale(1,1)'
    signinboxopen=true;}
    else{
    signinbox.style.transform='scale(0,0)'
    signinboxopen=false;}
}

function gotosignin(){

}
const artsaved=  document.querySelector('.added');

function addtoarticles() { //adds The article to the users saved articles
 //get article from current headline
 db.collection(currentpaper).where('title', "==",headlinetext ) //get article by headline
 .get().then(querySnapshot => {
  querySnapshot.forEach(doc => {

    doc.ref.set( //adds saved to document database
      {saved: firebase.firestore.FieldValue.increment(1)},{merge:true})

        let title =doc.data().title;
    let url =doc.data().url;
    let created =doc.data().created;
    let paper = currentpaper



    //add article to users database
db.collection('users').doc(auth.currentUser.uid).collection('articles').doc(doc.id).set(
{title:title,url:url,created:created,paper:paper,
  timestamp: firebase.firestore.FieldValue.serverTimestamp()
},{merge:true}

 )


})//end for each

     
 }).then( ()=>{//produce article saved message
 artsaved.style.display='grid',
 artsaved.style.opacity='1';
 setTimeout(()=>{  artsaved.style.opacity='0'}, 2000)
 setTimeout(()=>{  artsaved.style.display='none'}, 3000)
 console.log('article added')
 }

 ).catch(function(error) {
  console.error('Error writing new message users database', error);
})

}
