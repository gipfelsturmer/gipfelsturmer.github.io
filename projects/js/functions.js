function disableAndExecute() {
  // Disable the button when clicked
  document.getElementById("upload-button").disabled = true;

  // Call your functions here (uploadImage and storeHeight)
  uploadMountainGuide();

  // Re-enable the button after 5 seconds
  setTimeout(function () {
    document.getElementById("upload-button").disabled = false;
  }, 5000);
}


function uploadMountainGuide() {

    // Disable the upload button
    document.getElementById("upload-button").disabled = true;

    // Get a reference to the Firestore database
    var db = firebase.firestore();

    var storage = firebase.storage();

    // Get the user's input values
    var enteredCode = document.getElementById("code").value;
    var correctCode = document.getElementById("correct-code").value;

    if (enteredCode !== correctCode) {
      // Display an error message and return to prevent form submission
      document.getElementById("error-message").style.display = "block";
      document.getElementById("code").classList.add("error");
      document.getElementById("code").value = "";
      alert("Falscher Code. Bitte kontaktiere uns unter: gipfelstuermerapp@gmail.com");
      event.preventDefault();
      return;
    } else {
      // Hide the error message in case it was displayed previously
      document.getElementById("error-message").style.display = "none";
      document.getElementById("code").classList.remove("error");
    }

    // Function to handle form submission
    document.getElementById("create-form").addEventListener("submit", function (event) {
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

      // Get the file input element
      var fileInput = document.getElementById("image-file");

      // Get the selected file
      var file = fileInput.files[0];

      // Generate a random number between 1 and 100000 (adjust as needed)
      var randomCounter = Math.floor(Math.random() * 100000) + 1;

      // Create a storage reference for the image file
      var storageRef = storage.ref().child("mountain_guide_images/" + elementName + "_" + guideName + "_" + randomCounter.toString());

      // Upload the file to Firebase Storage
      var uploadTask = storageRef.put(file);

      // Monitor the upload progress (optional)
      uploadTask.on(
        "state_changed",
        function (snapshot) {
          // Observe the state change (optional)
          // You can use this to show upload progress if needed
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        function (error) {
          // Handle unsuccessful uploads
          console.error("Error uploading image: ", error);
        },
        function () {
          // Handle successful uploads
          // Get the download URL of the uploaded image
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            // Set the data for the document including the download URL
            db.collection("mountains_bergfuehrer")
              .doc(name_id)
              .set(
                {
                  normalroute: {
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
                        image_url: downloadURL, // Save the download URL in the document
                        url: url
                      })
                    }
                  },
                { merge: true }
              )
              .then(function () {
                alert("Bergführer erfolgreich hinzugefügt!");
                document.getElementById("create-form").reset();
                location.reload();
              })
              .catch(function (error) {
                console.error("Error writing document: ", error);
              });

              // here new
              // Re-enable the upload button after 5 seconds
              setTimeout(function () {
                document.getElementById("upload-button").disabled = false;
              }, 5000); // 5000 milliseconds = 5 seconds
              // until here new
          });
        }
      );
    })
}

function getAndDisplayData() {
  var db = firebase.firestore();
  var mountainContainer = document.getElementById('mountain-container');
  var numPersonsSelect = document.getElementById('numPersons');
  var selectedNumPersons = parseInt(numPersonsSelect.value);

  db.collection('mountains_bergfuehrer').get()
    .then(function(querySnapshot) {
      mountainContainer.innerHTML = ''; // Clear the existing content

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

          var guideImage = document.createElement('img');
          guideImage.src = guide.image_url;
          guideImage.alt = guide.name;
          offer.appendChild(guideImage);

          var guideName = document.createElement('p');
          guideName.textContent = guide.name;
          guideName.classList.add('guide-name');
          offer.appendChild(guideName);

          // Now, let's filter the displayed prices based on the selectedNumPersons
          if (selectedNumPersons === 1 && guide.price_one_person !== -1) {
            // Display only the price for 1 person
            var costOne = document.createElement('p');
            costOne.textContent = 'Preis (1 Person): ' + guide.price_one_person + ' EUR';
            offer.appendChild(costOne);
          } else if (selectedNumPersons === 2 && guide.price_two_person !== -1) {
            // Display only the price for 2 persons
            var costTwo = document.createElement('p');
            costTwo.textContent = 'Preis (2 Personen): ' + guide.price_two_person + ' EUR';
            offer.appendChild(costTwo);
          } else if (selectedNumPersons === 3 && guide.price_three_person !== -1) {
            // Display only the price for 3 persons
            var costThree = document.createElement('p');
            costThree.textContent = 'Preis (3 Personen): ' + guide.price_three_person + ' EUR';
            offer.appendChild(costThree);
          } else if (selectedNumPersons === 4 && guide.price_four_person !== -1) {
            // Display only the price for 4 persons
            var costFour = document.createElement('p');
            costFour.textContent = 'Preis (4 Personen): ' + guide.price_four_person + ' EUR';
            offer.appendChild(costFour);
          }

          var numDays = document.createElement('p');
          numDays.textContent = 'Dauer der Tour: ' + guide.days + ' Tage';
          offer.appendChild(numDays);

          var hutIncluded = document.createElement('p');
          hutIncluded.textContent = 'Hütte inklusive: ' + (guide.hut ? 'Ja' : 'Nein');
          offer.appendChild(hutIncluded);


          var detailsButton = document.createElement('button');
            detailsButton.textContent = 'Details';
            detailsButton.style.backgroundColor = 'lightblue';
            detailsButton.addEventListener('click', function() {
              // Redirect to the offer.html page passing any necessary information
              window.location.href = 'offer';
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
