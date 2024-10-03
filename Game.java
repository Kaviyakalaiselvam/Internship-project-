package com.example.stonepaperscissors.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String player1;
    private String player2;
    private int player1Score;
    private int player2Score;
    private String winner;

    public Game() {
    }

    public Game(String player1, String player2, int player1Score, int player2Score, String winner) {
        this.player1 = player1;
        this.player2 = player2;
        this.player1Score = player1Score;
        this.player2Score = player2Score;
        this.winner = winner;
    }

   
}
