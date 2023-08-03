---
layout: about
title: Guide finden
permalink: /
subtitle:
news: False  # includes a list of news items
latest_posts: false  # includes a list of the newest posts
selected_papers: False # includes a list of papers marked as "selected={true}"
social: false  # includes social icons at the bottom of the page
---

<html>
  <head>
    <title>Bergführer finden</title>
    <link rel="stylesheet" type="text/css" href="../projects/css/style.css">
  </head>

  <script type="text/javascript" src="../projects/js/functions.js"></script>

  <body>

    <input type="text" id="filter-input" placeholder="Nach Berg suchen...">
    <br>
    <div>
      <br>
      <label for="numPersons">Select number of persons:</label>
      <select id="numPersons" onchange="getAndDisplayData()">
        <option value="1">1 person</option>
        <option value="2">2 persons</option>
        <option value="3">3 persons</option>
        <option value="4">4 persons</option>
      </select>
    </div>


    <div id="mountain-container">
      <div class="offer-container-wrapper">
        <div class="offer-container"></div>
      </div>
    </div>


    <script>
      // Add event listener for the filter input
      document.getElementById("filter-input").addEventListener("input", filterMountainNames);
    </script>

    <!-- Firebase SDK -->
    <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
    <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>

    <script type="module" src="../projects/js/firebase.js"></script>

    <script>
      window.addEventListener("load", function() {
          getAndDisplayData();
      });
    </script>
  </body>
</html>