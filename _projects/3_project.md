---
layout: page
title: Bergführer hinzufügen
description:
img: assets/img/matterhorn.jpg
importance: 4
category:
---

<html>
<head>
  <title>Bergführer hinzufügen</title>
</head>
<body>
  <h2></h2>
  <form id="create-form">
    <label for="mountain-name">Berg Name:</label>
    <input type="text" id="mountain-name" required>
    <br><br>
    <label for="guide-name">Name Bergschule / Bergführer:</label>
    <input type="text" id="guide-name" required>
    <br><br>
    <label for="cost-one">Preis für 1 Person:</label>
    <input type="number" id="cost-one" required>
    <br><br>
    <label for="cost-two">Preis für 2 Personen:</label>
    <input type="number" id="cost-two" required>
    <br><br>
    <label for="cost-three">Preis für 3 Personen:</label>
    <input type="number" id="cost-three" required>
    <br><br>
    <label for="cost-four">Preis für 4 Personen:</label>
    <input type="number" id="cost-four" required>
    <br><br>
    <label for="num-days">Wie viele Tage?:</label>
    <input type="number" id="num-days" required>
    <br><br>
    <label for="hut">Hütte inklusive:</label>
    <input type="checkbox" id="hut">
    <br><br>
    <label for="certified">Staatlich geprüfter Bergführer:</label>
    <input type="checkbox" id="certified">
    <br><br>
    <label for="url">Website link (URL):</label>
    <input type="text" id="url" required>
    <br><br>

    <button type="submit">Bergführer hinzufügen</button>
  </form>
  
  <!-- Firebase SDK -->
  <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
  <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>

  <script type="module">
    const firebaseConfig = {
        apiKey: "AIzaSyCBN7n7N-vKM1tJQ-OInnzotS3RShVOrXs",
        authDomain: "gipfelstuermer-6b1ca.firebaseapp.com",
        projectId: "gipfelstuermer-6b1ca",
        storageBucket: "gipfelstuermer-6b1ca.appspot.com",
        messagingSenderId: "475301182415",
        appId: "1:475301182415:web:56dc41f911c467771070ba",
        measurementId: "G-RB1NLHHYCY"
    };

    firebase.initializeApp(firebaseConfig);
    // console.log("Successfully initialized Firebase");
    // Get a reference to the Firestore database
    var db = firebase.firestore();

    // Function to handle form submission
    document.getElementById("create-form").addEventListener("submit", function(event) {
      event.preventDefault();

      // Get the user's input values
      var elementName = document.getElementById("mountain-name").value;
      var guideName = document.getElementById("guide-name").value;
      var costOne = parseInt(document.getElementById("cost-one").value);
      var costTwo = parseInt(document.getElementById("cost-two").value);
      var costThree = parseInt(document.getElementById("cost-three").value);
      var costFour = parseInt(document.getElementById("cost-four").value);
      var numDays = parseInt(document.getElementById("num-days").value);
      var hut = document.getElementById("hut").checked;
      var certified = document.getElementById("certified").checked;
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
              certified: certified,
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
  </script>
</body>
