//TODO: Download table once rather than again each

const list = document.querySelector('.list');


const guardbtn = document.querySelector('.guardbtn');
const mailbtn = document.querySelector('.mailbtn');

guardbtn.addEventListener("click", () => rankedlist('guardian')); 
mailbtn.addEventListener("click", () => rankedlist('mail')); 


rankedlist('guardian');

function rankedlist(paper){ //get with a limited number of entries
  const clicked = document.querySelector('.tclicked');
  const notclicked = document.querySelector('.tnotclicked');

  clicked.classList.remove('tclicked');
  notclicked.classList.remove('tnotclicked');
  clicked.classList.add('tnotclicked');
  notclicked.classList.add('tclicked');

  firebase.firestore().collection(paper).orderBy('right', 'desc').limit(100).get()
    .then(function(querySnapshot) {
      var table = document.getElementById("mytbody");
      table.innerHTML = '';

      querySnapshot.forEach(function(doc) {
      let title = doc.data().title
      let score = (doc.data().right*100).toFixed(1)



      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = `${score}`;
      cell2.innerHTML = `${title}`;


    });
    console.log('list created for '+paper);

  
  }).catch(err => console.log('unable to create list', err));
  }