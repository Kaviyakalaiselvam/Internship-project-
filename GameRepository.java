

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.stonepaperscissors.model.Game;

public interface GameRepository extends JpaRepository<Game, Long> {
}
