//Sign up

const scis=  document.querySelector('.scispath');
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

scis.addEventListener('click',e =>{
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