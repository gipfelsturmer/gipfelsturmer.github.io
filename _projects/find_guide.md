---
layout: page
title: Bergführer finden
description:
img: assets/img/matterhorn.jpg
importance: 1
category:
---

<html>
<head>
  <title>Bergführer finden</title>
  <link rel="stylesheet" type="text/css" href="../css/style.css">
</head>
<script type="text/javascript" src="../js/functions.js"></script>
<body onload="getAndDisplayData()">
  	<script type="text/javascript">
        window.addEventListener("load", function() {
            getAndDisplayData();
        });
    </script>

  <input type="text" id="filter-input" placeholder="Nach Berg suchen...">

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

  <script type="module" src="../js/firebase.js"></script>
</body>
