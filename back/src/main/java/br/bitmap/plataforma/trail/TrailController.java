package br.bitmap.plataforma.trail;

import br.bitmap.plataforma.progress.StepProgressRepository;
import br.bitmap.plataforma.step.StepRepository;
import br.bitmap.plataforma.topic.Topic;
import br.bitmap.plataforma.topic.TopicRepository;
import br.bitmap.plataforma.topic.TopicType;
import br.bitmap.plataforma.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** Existe apenas uma trilha: "Teoria dos Conjuntos". */
@RestController
@RequestMapping("/api/trail")
@RequiredArgsConstructor
public class TrailController {

    private static final String TITLE = "Teoria dos Conjuntos";
    private static final String DESCRIPTION = "Trilha introdutória de Matemática Discreta.";

    private final TopicRepository topicRepository;
    private final StepRepository stepRepository;
    private final StepProgressRepository stepProgressRepository;

    public record TopicItem(Long id, String title, TopicType type, int orderIndex, boolean completed) {
    }

    public record TrailResponse(String title, String description, int progressPercent, List<TopicItem> topics) {
    }

    @GetMapping
    public TrailResponse get(@AuthenticationPrincipal User user) {
        List<Topic> topics = topicRepository.findAllByOrderByOrderIndexAsc();

        List<TopicItem> items = topics.stream()
                .map(topic -> new TopicItem(topic.getId(), topic.getTitle(), topic.getType(), topic.getOrderIndex(),
                        isCompleted(user.getId(), topic.getId())))
                .toList();

        long completedCount = items.stream().filter(TopicItem::completed).count();
        int percent = topics.isEmpty() ? 0 : (int) Math.round(completedCount * 100.0 / topics.size());

        return new TrailResponse(TITLE, DESCRIPTION, percent, items);
    }

    private boolean isCompleted(Long userId, Long topicId) {
        var steps = stepRepository.findByTopicIdOrderByOrderIndexAsc(topicId);
        if (steps.isEmpty()) {
            return false;
        }
        long correctCount = stepProgressRepository.findByUserIdAndStepTopicId(userId, topicId).stream()
                .filter(p -> p.isCorrect())
                .count();
        return correctCount >= steps.size();
    }
}
