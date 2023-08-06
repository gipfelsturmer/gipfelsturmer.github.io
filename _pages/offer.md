---
layout: page
title: Bergführer Angebot
permalink: /offer/
description:
nav: false
nav_order:
display_categories:
horizontal: false
---

<html>
<head>
  <link rel="stylesheet" type="text/css" href="../projects/css/style.css">
  <style>
    /* CSS styling for the guide image */
    #details-container img {
      max-width: 200px; /* Adjust this value to control the maximum width of the image */
      max-height: 200px; /* Adjust this value to control the maximum height of the image */
    }

    #details-container {
        display: flex;
        flex-wrap: wrap;
        }

        .vertical-container {
            flex: 1;
            max-width: 300px;
            margin: 10px;
            border: 1px solid #ccc;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            }

        .horizontal-container {
        flex: 1;
        display: flex;
        align-items: center; /* Align the description vertically in the middle */
        margin: 10px;
        padding: 10px;
        }
  </style>
</head>
<body>
    <script>
        // Retrieve the userId from localStorage
        var guide = JSON.parse(localStorage.getItem('selectedMountain'));
        var selectedNumPersons = localStorage.getItem('selectedNumPersons')
    </script>

  <div id="details-container">
    <!-- Offer details will be displayed here -->
  </div>

  <script>
    function displayOfferDetails(guide, selectedNumPersons) {
        var detailsContainer = document.getElementById('details-container');

        // Create a vertical container div for the guide details
        var verticalContainer = document.createElement('div');
        verticalContainer.classList.add('vertical-container');
        detailsContainer.appendChild(verticalContainer);

        // Create a horizontal container div for the description
        var horizontalContainer = document.createElement('div');
        horizontalContainer.classList.add('horizontal-container');
        detailsContainer.appendChild(horizontalContainer);

        // Guide Image
        var guideImage = document.createElement('img');
        guideImage.src = guide.image_url;
        guideImage.alt = guide.name;
        verticalContainer.appendChild(guideImage);

        // Guide Name
        var guideName = document.createElement('p');
        guideName.textContent = guide.name;
        verticalContainer.appendChild(guideName);

        // Now, let's filter the displayed prices based on the selectedNumPersons
        if (selectedNumPersons == 1 && guide.price_one_person !== -1) {
            // Display only the price for 1 person
            var costOne = document.createElement('p');
            costOne.textContent = 'Preis (1 Person): ' + guide.price_one_person + ' EUR';
            verticalContainer.appendChild(costOne);
        } else if (selectedNumPersons == 2 && guide.price_two_person !== -1) {
            // Display only the price for 2 persons
            var costTwo = document.createElement('p');
            costTwo.textContent = 'Preis (2 Personen): ' + guide.price_two_person + ' EUR';
            verticalContainer.appendChild(costTwo);
        } else if (selectedNumPersons == 3 && guide.price_three_person !== -1) {
            // Display only the price for 3 persons
            var costThree = document.createElement('p');
            costThree.textContent = 'Preis (3 Personen): ' + guide.price_three_person + ' EUR';
            verticalContainer.appendChild(costThree);
        } else if (selectedNumPersons == 4 && guide.price_four_person !== -1) {
            // Display only the price for 4 persons
            var costFour = document.createElement('p');
            costFour.textContent = 'Preis (4 Personen): ' + guide.price_four_person + ' EUR';
            verticalContainer.appendChild(costFour);
        }

        // Duration of the Tour
        var numDays = document.createElement('p');
        numDays.textContent = 'Dauer der Tour: ' + guide.days + ' Tage';
        verticalContainer.appendChild(numDays);

        // Hut Inclusion
        var hutIncluded = document.createElement('p');
        hutIncluded.textContent = 'Hütte inklusive: ' + (guide.hut ? 'Ja' : 'Nein');
        verticalContainer.appendChild(hutIncluded);

        var urlButton = document.createElement('button');
        urlButton.textContent = 'Buchen';
        urlButton.style.backgroundColor = 'lightblue';
        urlButton.style.width = '150px'; // Adjust the width as needed
        urlButton.style.height = '40px'; // Adjust the height as needed
        urlButton.addEventListener('click', function() {
            window.open(guide.url, '_blank');
        });
        verticalContainer.appendChild(urlButton);

        // Detailed Description
        var detailed_description = document.createElement('p');
        detailed_description.textContent = guide.detailed_description;
        horizontalContainer.appendChild(detailed_description);
        }


  </script>

  <script>
      window.addEventListener("load", function() {
            displayOfferDetails(guide, selectedNumPersons);
        });
        
    </script>
</body>
</html>
