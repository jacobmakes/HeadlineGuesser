
//Calculate users accuracy 
const acctext = document.querySelector('.acc');
const acccircle = document.querySelector('.acccircle');



//generate list of articles
const list = document.querySelector('.articlelist');

generatearticles();

function generatearticles(){ firebase.auth().onAuthStateChanged( user=>{
articles(user);})}

function articles(user){ //get with a limited number of entries NOTE: An extra function is required because firestore has shallow reads
//acccuracy
  firebase.firestore().collection('users').doc(user.uid).get().then(
    snapshot=>{
      let correct = snapshot.data().correct.total;
      let incorrect = snapshot.data().incorrect.total;
      let acc = correct/(correct+incorrect);
      acctext.textContent = Math.round(acc*100);
      acccolour(acc*100);
    }
  )


//articles
  console.log(user.uid);
  firebase.firestore().collection('users').doc(user.uid).collection('articles').orderBy("timestamp","desc")
    .get().then(function(querySnapshot) {
      querySnapshot.forEach((article) =>{
          let title = article.data().title;
          let created = article.data().created;
          let url = article.data().url;
console.log(article);
          let li = document.createElement("LI");                 // Create a <li> node
          let a = document.createElement("a");
          a.href = url;
          a.setAttribute("target", "_blank");
          let div = document.createElement("div"); 
          let h4 = document.createElement("h4"); 
          textnode = document.createTextNode(title); 
          list.appendChild(li); li.appendChild(a); a.appendChild(div); div.appendChild(h4); h4.appendChild(textnode);
      })

    }).catch(err => console.log('unable to fetch articles', err));

  
}//function


function acccolour(num){
  console.log('coloring in', num);
 if(num<70){acccircle.style.backgroundColor='var(--blue)'; return}
 if(num<80){acccircle.style.backgroundColor='var(--green)'; return;}
 if(num<90){acccircle.style.backgroundColor=`var(--orange)`;  return;}
 if(num>=98){acccircle.style.backgroundColor='var(--red)';
 acccircle.style.borderColor='var(--yellow)'; 
 streakDOM.style.color='var(--yellow)'; return;}

}

  //log out

const person=  document.querySelector('.person');
const signinbox=  document.querySelector('.signbox');
const logout=  document.querySelector('.logout');
const del=  document.querySelector('.del');
let signinboxopen=false;

let delclicks =0;

document.addEventListener('click',e =>{
  target = e.target;
  console.log(target);
  if(target == person){openbox();}else
  if(target == logout){logoutF();}else
  if(target == del){console.log('del clicked');}
  else{closebox();}
 });

function logoutF(){
  firebase.auth().signOut().then(()=>{
     console.log('user signed out');
     location.replace("/");    })
 }

del.onclick= ()=>{
if(delclicks==1){
  firebase.auth().currentUser.delete().then(function() {
    console.log('user deleted');
    location.replace("/");    
  }).catch(function(error) { //if user not authenitcated recently enough
    firebase.auth().signOut().then(()=>{
      console.log('user signed out');
      location.replace("/signindel.html");})
    

    console.error(error);
  });  
}else{
  del.textContent='sure?'
  delclicks++;
}

}


function openbox() {
console.log('open box');

  if(signinboxopen==false){
    signinbox.style.transform='scale(1,1)'
    signinboxopen=true;}
    else{
      closebox();
}}


function closebox() {
  signinbox.style.transform='scale(0,0)'
  signinboxopen=false;
  delclicks = 0;
  del.textContent='Delete Account';
  //console.log('close');
}