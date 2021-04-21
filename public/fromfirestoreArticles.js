const list = document.querySelector('.articlelist');

//TODO order by user creation
generatearticles();

function generatearticles(){ firebase.auth().onAuthStateChanged( user=>{
articles(user);})}

function articles(user){ //get with a limited number of entries

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
  