---
layout: page
title: Bergführer hinzufügen
description:
img: assets/img/matterhorn.jpg
importance: 2
category:
---

<html>
<head>
  <title>Bergführer hinzufügen</title>
</head>
<body>

  <script type="text/javascript" src="../js/functions.js"></script>
  
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
    <br><br>
    <label for="url">Website link (URL):</label>
    <input type="text" id="url" required>
    <br><br>

    <button type="submit" onclick="uploadMountainGuide()">Bergführer hinzufügen</button>
  </form>
  
  <!-- Firebase SDK -->
  <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
  <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>

  <script type="module" src="../js/firebase.js"></script>

</body>
