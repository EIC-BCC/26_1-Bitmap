package br.bitmap.plataforma.seed;

import br.bitmap.plataforma.step.Step;
import br.bitmap.plataforma.step.StepRepository;
import br.bitmap.plataforma.topic.Topic;
import br.bitmap.plataforma.topic.TopicRepository;
import br.bitmap.plataforma.topic.TopicType;
import br.bitmap.plataforma.user.User;
import br.bitmap.plataforma.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

/** Popula o H2 em memória com um usuário de demonstração e a trilha "Teoria dos Conjuntos". */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TopicRepository topicRepository;
    private final StepRepository stepRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        User demo = User.builder()
                .name("Aluno Demonstração")
                .email("aluno@exemplo.com")
                .passwordHash(passwordEncoder.encode("senha123"))
                .build();
        userRepository.save(demo);

        Topic t1 = topicRepository.save(Topic.builder()
                .title("Introdução a Conjuntos")
                .type(TopicType.THEORETICAL)
                .orderIndex(1)
                .theoreticalContent("""
                        Um **conjunto** é uma coleção não ordenada de elementos distintos.

                        Notação: A = {1, 2, 3}. Dizemos que 2 ∈ A (2 pertence a A) e 5 ∉ A (5 não pertence a A).

                        O conjunto vazio, denotado por ∅ ou {}, é o conjunto que não possui elementos.
                        """)
                .build());

        stepRepository.save(Step.builder()
                .topic(t1)
                .statement("Dado A = {2, 4, 6}, o elemento 4 pertence a A?")
                .options(List.of("Verdadeiro", "Falso"))
                .correctAnswer("0")
                .orderIndex(1)
                .build());

        stepRepository.save(Step.builder()
                .topic(t1)
                .statement("Qual símbolo representa o conjunto vazio?")
                .options(List.of("∅", "∈", "∪", "∩"))
                .correctAnswer("0")
                .orderIndex(2)
                .build());

        Topic t2 = topicRepository.save(Topic.builder()
                .title("Operações entre Conjuntos")
                .type(TopicType.PRACTICAL)
                .orderIndex(2)
                .theoreticalContent("""
                        **União (A ∪ B)**: elementos que estão em A ou em B.

                        **Interseção (A ∩ B)**: elementos que estão em A e em B ao mesmo tempo.

                        **Diferença (A − B)**: elementos que estão em A, mas não em B.
                        """)
                .build());

        stepRepository.save(Step.builder()
                .topic(t2)
                .statement("Se A = {1, 2, 3} e B = {2, 3, 4}, qual é A ∩ B?")
                .options(List.of("{1, 4}", "{2, 3}", "{1, 2, 3, 4}", "∅"))
                .correctAnswer("1")
                .orderIndex(1)
                .build());

        stepRepository.save(Step.builder()
                .topic(t2)
                .statement("Se A = {1, 2, 3} e B = {2, 3, 4}, qual é A ∪ B?")
                .options(List.of("{1, 2, 3, 4}", "{2, 3}", "{1}", "∅"))
                .correctAnswer("0")
                .orderIndex(2)
                .build());

        Topic t3 = topicRepository.save(Topic.builder()
                .title("Revisão: Conjuntos")
                .type(TopicType.REVIEW)
                .orderIndex(3)
                .theoreticalContent("Revise os conceitos de pertinência, união, interseção e diferença antes de continuar.")
                .build());

        stepRepository.save(Step.builder()
                .topic(t3)
                .statement("A operação A − B resulta nos elementos que estão apenas em A?")
                .options(List.of("Verdadeiro", "Falso"))
                .correctAnswer("0")
                .orderIndex(1)
                .build());
    }
}
