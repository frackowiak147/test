<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'saveShips') {
        $player = $_POST['player'];
        $ships = $_POST['ships'];
        $_SESSION["player{$player}Ships"] = $ships;
    } elseif ($action === 'makeMove') {
        $player = $_POST['player'];
        $move = $_POST['move'];
        $opponent = $player == 1 ? 2 : 1;

        $opponentShips = $_SESSION["player{$opponent}Ships"];
        if (in_array($move, $opponentShips)) {
            $_SESSION["player{$player}Hits"][] = $move;
        } else {
            $_SESSION["player{$player}Misses"][] = $move;
            $_SESSION['currentTurn'] = $opponent;
        }
    } elseif ($action === 'endGame') {
        $winner = $_POST['winner'];
        $_SESSION['winner'] = $winner;
    }
}
?>