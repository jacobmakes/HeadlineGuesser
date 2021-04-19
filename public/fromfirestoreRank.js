const list = document.querySelector('.list');

rankedlist('guardian');

function rankedlist(paper){ //get with a limited number of entries


  firebase.firestore().collection(paper).orderBy('right', 'desc').limit(20).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
      let title = doc.data().title
      let score = (doc.data().right*100).toFixed(1)


      var table = document.getElementById("mytbody");
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = `${score}`;
      cell2.innerHTML = `${title}`;


    });
    console.log('list created for '+paper);

  
  }).catch(err => console.log('unable to create list', err));
  }