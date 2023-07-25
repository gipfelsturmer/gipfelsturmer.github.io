function uploadMountainGuide() {
    // Get a reference to the Firestore database
    var db = firebase.firestore();

    // Function to handle form submission
    document.getElementById("create-form").addEventListener("submit", function(event) {
      event.preventDefault();

      // Get the user's input values
      var code = document.getElementById("code").value;
      var elementName = document.getElementById("mountain-name").value;
      var guideName = document.getElementById("guide-name").value;
      var costOne = parseInt(document.getElementById("cost-one").value);
      var costTwo = parseInt(document.getElementById("cost-two").value);
      var costThree = parseInt(document.getElementById("cost-three").value);
      var costFour = parseInt(document.getElementById("cost-four").value);
      var numDays = parseInt(document.getElementById("num-days").value);
      var hut = document.getElementById("hut").checked;
      var url = document.getElementById("url").value;
      
      var name_id = elementName.toLowerCase().replace(/\s/g, '_');

      // Set the data for the document
      db.collection('mountains_bergfuehrer').doc(name_id).set(
        {normalroute: 
          {
          name: elementName,
          mountain_id: name_id,
          route_id: "normalroute",
          glacier_average_difficulty: 3,
          climbing_average_difficulty: 3,
          overall_average_difficulty: 3,
          description: " ",
          mountain_guides: firebase.firestore.FieldValue.arrayUnion(
            {
              name: guideName,
              price_one_person: costOne,
              price_two_person: costTwo,
              price_three_person: costThree,
              price_four_person: costFour,
              days: numDays,
              hut: hut,
              url: url
            })
          }
      },
      { merge: true }
      )
      .then(function() {
        // console.log("Document successfully written!");
        alert("Bergführer erfolgreich hinzugefügt!");
        // Reset form inputs after successful submission
        document.getElementById("create-form").reset();
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    });
}


function getAndDisplayData() {
  var db = firebase.firestore();
  var mountainContainer = document.getElementById('mountain-container');

  db.collection('mountains_bergfuehrer').get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var mountain = doc.data().normalroute;
        var guides = mountain.mountain_guides;

        var container = document.createElement('div');
        container.classList.add('mountain-container');

        var mountainName = document.createElement('h3');
        mountainName.classList.add('mountain-name');
        mountainName.textContent = mountain.name;
        container.appendChild(mountainName);

        var offerContainer = document.createElement('div');
        offerContainer.classList.add('offer-container');

        guides.forEach(function(guide) {
          var offer = document.createElement('div');
          offer.classList.add('offer');

          var guideName = document.createElement('p');
          guideName.textContent = guide.name;
          guideName.classList.add('guide-name');
          offer.appendChild(guideName);

          if (guide.price_one_person !== -1) {
            var costOne = document.createElement('p');
            costOne.textContent = 'Preis (1 Person): ' + guide.price_one_person + ' EUR';
            offer.appendChild(costOne);
          }

          if (guide.price_two_person !== -1) {
            var costTwo = document.createElement('p');
            costTwo.textContent = 'Preis (2 Personen): ' + guide.price_two_person + ' EUR';
            offer.appendChild(costTwo);
          }

          if (guide.price_three_person !== -1) {
            var costThree = document.createElement('p');
            costThree.textContent = 'Preis (3 Personen): ' + guide.price_three_person + ' EUR';
            offer.appendChild(costThree);
          }

          if (guide.price_four_person !== -1) {
            var costFour = document.createElement('p');
            costFour.textContent = 'Preis (4 Personen): ' + guide.price_four_person + ' EUR';
            offer.appendChild(costFour);
          }

          var numDays = document.createElement('p');
          numDays.textContent = 'Dauer der Tour: ' + guide.days;
          offer.appendChild(numDays);

          var hutIncluded = document.createElement('p');
          hutIncluded.textContent = 'Hütte inklusive: ' + (guide.hut ? 'Ja' : 'Nein');
          offer.appendChild(hutIncluded);


          var detailsButton = document.createElement('button');
            detailsButton.textContent = 'Details';
            detailsButton.style.backgroundColor = 'lightblue';
            detailsButton.addEventListener('click', function() {
              // Redirect to the offer.html page passing any necessary information
              window.location.href = 'offer.html';
            });
            offer.appendChild(detailsButton);

          var urlButton = document.createElement('button');
          urlButton.textContent = 'Buchen';
          urlButton.style.backgroundColor = 'lightblue';
          urlButton.addEventListener('click', function() {
            window.open(guide.url, '_blank');
          });

          offer.appendChild(urlButton);

          offerContainer.appendChild(offer);
        });

        container.appendChild(offerContainer);
        mountainContainer.appendChild(container);
      });
      document.body.appendChild(mountainContainer);
    })
    .catch(function(error) {
      console.error('Error getting documents: ', error);
    });
}
  
function filterMountainNames() {
  var filterInput = document.getElementById("filter-input");
  var filterValue = filterInput.value.toLowerCase();
  var mountainContainers = document.getElementsByClassName("mountain-container");

  Array.from(mountainContainers).forEach(function(container) {
    var mountainName = container.querySelector("h3").textContent.toLowerCase();

    if (mountainName.includes(filterValue)) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  });
}