---
layout: page
title: Guide hinzufügen
permalink: /add_guide/
description:
nav: true
nav_order: 1
display_categories:
horizontal: false
---

<html>
<head>
  <title>Bergführer hinzufügen</title>
  <link rel="stylesheet" type="text/css" href="../projects/css/style.css">
</head>

<body>

  <script type="text/javascript" src="../projects/js/functions.js"></script>
  
  <form id="create-form" class="modern-form">
    <fieldset>
      <legend>Bergführer hinzufügen</legend>
      <div class="form-group">
        <label for="code">Gipfelstürmer Code (kontaktiere uns bei Interesse):</label>
        <input type="text" id="code">
        <span id="error-message" style="color: red; display: none;">Falscher Code</span>
        <input type="hidden" id="correct-code" value="bester-bergführer">
      </div>

      <div class="form-group">
        <label for="mountain-name">Berg Name:</label>
        <input type="text" id="mountain-name">
      </div>

      <div class="form-group">
        <label for="guide-name">Name Bergschule / Bergführer:</label>
        <input type="text" id="guide-name">
      </div>

      <div class="form-group">
        <label for="cost-one">Preis für 1 Person:</label>
        <input type="number" id="cost-one">
      </div>

      <div class="form-group">
        <label for="cost-two">Preis für 2 Personen:</label>
        <input type="number" id="cost-two">
      </div>

      <div class="form-group">
        <label for="cost-three">Preis für 3 Personen:</label>
        <input type="number" id="cost-three">
      </div>

      <div class="form-group">
        <label for="cost-four">Preis für 4 Personen:</label>
        <input type="number" id="cost-four">
      </div>

      <div class="form-group">
        <label for="num-days">Wie viele Tage?:</label>
        <input type="number" id="num-days">
      </div>

      <div class="form-group">
        <label for="hut">Hütte inklusive:</label>
        <input type="checkbox" id="hut">
      </div>

      <div class="form-group">
        <label for="image-file">Bild hochladen:</label>
        <input type="file" id="image-file">
      </div>

      <div class="form-group">
        <label for="url">Website link (URL):</label>
        <input type="text" id="url" required placeholder="https://www.example.de">
      </div>

      <div class="form-group">
        <label for="detailed-description">Beschreibung:</label>
        <input type="text" id="detailed-description">
      </div>

      <div class="form-group">
        <button type="submit" onclick="disableAndExecute()" id="upload-button">Bergführer hinzufügen</button>
      </div>
    </fieldset>
  </form>

  
  <!-- Firebase SDK -->
  <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
  <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>
  <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"></script>

  <script type="module" src="../projects/js/firebase.js"></script>

</body>