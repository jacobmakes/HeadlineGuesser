const button1 = document.querySelector('.mailimg');
const button2 = document.querySelector('.guardimg');
const streakDOM = document.querySelector('.streak');
const accDOM = document.querySelector('.acc');
const paper1 = 'mail';
const paper2 = 'guardian';


let acc; //accuracy
let correct = 0; 
let attempts =0;
let streak = 0;
let newschoice; //for the randomly generated one or two
streakDOM.textContent = streak;

 function LAUNCH(){
     Promise.all([
    getFromLaunch('guardian'),
    getFromLaunch('mail')]).then(() =>{

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


   accDOM.textContent = (correct/attempts)*100;


}
   console.log('87');
document.addEventListener('click',checkclick);


function checkclick(e){
    const target = e.target;
console.log(target, 'rect answer', newschoice)
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
if(headlinelist[paperclicked][count[paperclicked]]){
    db.collection(paperclicked).where('title', "==",headlinelist[paperclicked][count[paperclicked]] )
    .get().then(querySnapshot => { console.log('countstuff',headlinelist[paperclicked],count,querySnapshot);
        querySnapshot.forEach(doc => {
          doc.ref.set( //TODO Understand .ref
            {correct:{[otherpaper]: firebase.firestore.FieldValue.increment(1),
            total: firebase.firestore.FieldValue.increment(1)
            }},{merge:true}
          )
        })
      })
    }
    attempts++;
    correct++;
    streak++;
    streakDOM.textContent = streak;
        randomserve(paper1,paper2);
        console.log('c',newschoice)

}
function wronganswer(paperclicked,otherpaper) {
    if(headlinelist[otherpaper][count[otherpaper]]){
        db.collection(otherpaper).where('title', "==",headlinelist[otherpaper][count[otherpaper]] )
        .get().then(querySnapshot => { console.log('countstuff',headlinelist[otherpaper],count,querySnapshot);
            querySnapshot.forEach(doc => {
              doc.ref.set( //TODO Understand .ref
                {incorrect:{[paperclicked]: firebase.firestore.FieldValue.increment(1),
                total: firebase.firestore.FieldValue.increment(1)
                }},{merge:true}
              )
            })
          })
        }

    attempts++;
    streak=0;
    streakDOM.textContent = streak;
    randomserve(paper1,paper2);
    console.log('w',newschoice)
}
