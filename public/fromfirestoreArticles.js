const list = document.querySelector('.articlelist');


generatearticles();

function generatearticles(){ firebase.auth().onAuthStateChanged( user=>{
articles(user);})}

function articles(user){ //get with a limited number of entries

  console.log(user.uid);
  firebase.firestore().collection('users').doc(user.uid).get()
    .then(function(querySnapshot) {
      console.log(Object.entries(querySnapshot.data().articles));
      Object.entries(querySnapshot.data().articles).forEach(function(article) { //If something breaks with updates it will probably be this
          let title = article[1]['title'];
          let created = article[1]['created'];
          let url = article[1]['url'];

          let li = document.createElement("LI");                 // Create a <li> node
          let a = document.createElement("a");
          a.href = url;
          let div = document.createElement("div"); 
          let h4 = document.createElement("h4"); 
          textnode = document.createTextNode(title); 
          list.appendChild(li); li.appendChild(a); a.appendChild(div); div.appendChild(h4); h4.appendChild(textnode);


    });

  
  }).catch(err => console.log('unable to fetch articles', err));
  }