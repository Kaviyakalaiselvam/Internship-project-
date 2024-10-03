package com.example.stonepaperscissors.controller;

import com.example.stonepaperscissors.model.Game;
import com.example.stonepaperscissors.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {
    @Autowired
    private GameRepository gameRepository;

    @PostMapping
    public Game saveGame(@RequestBody Game game) {
        return gameRepository.save(game);
    }

    @GetMapping
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }
}
