package br.bitmap.plataforma.step;

import br.bitmap.plataforma.topic.Topic;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/** Sempre múltipla escolha. */
@Entity
@Table(name = "steps")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Step {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;

    @Lob
    private String statement;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "step_options", joinColumns = @JoinColumn(name = "step_id"))
    @Column(name = "option_text")
    @OrderColumn(name = "option_order")
    @Builder.Default
    private List<String> options = new ArrayList<>();

    /** Índice (como string) da alternativa correta em `options`. */
    private String correctAnswer;

    private int orderIndex;
}
