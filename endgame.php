<?php
session_start();
$winner = isset($_SESSION['winner']) ? $_SESSION['winner'] : 'brak';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Koniec Gry</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Koniec Gry</h1>
    <p>Gracz <?php echo $winner; ?> wygrywa!</p>
    <button onclick="window.location.href='index.html'">Zagraj ponownie</button>
</body>

</html>