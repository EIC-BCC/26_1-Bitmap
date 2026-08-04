package br.bitmap.plataforma.progress;

import br.bitmap.plataforma.step.Step;
import br.bitmap.plataforma.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Progresso de tópico/trilha é sempre derivado a partir daqui (sem tabela própria). */
@Entity
@Table(name = "step_progress")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StepProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "step_id")
    private Step step;

    private boolean correct;
}
