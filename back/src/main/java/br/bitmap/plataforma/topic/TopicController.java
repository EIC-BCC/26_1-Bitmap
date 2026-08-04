package br.bitmap.plataforma.topic;

import br.bitmap.plataforma.progress.StepProgressRepository;
import br.bitmap.plataforma.step.Step;
import br.bitmap.plataforma.step.StepRepository;
import br.bitmap.plataforma.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@RequiredArgsConstructor
public class TopicController {

    private final TopicRepository topicRepository;
    private final StepRepository stepRepository;
    private final StepProgressRepository stepProgressRepository;

    public record StepItem(Long id, String statement, List<String> options, int orderIndex, boolean answeredCorrectly) {
    }

    public record TopicResponse(Long id, String title, TopicType type, String theoreticalContent, List<StepItem> steps) {
    }

    @GetMapping("/{id}")
    public TopicResponse get(@PathVariable Long id, @AuthenticationPrincipal User user) {
        Topic topic = topicRepository.findById(id).orElseThrow();
        List<Step> steps = stepRepository.findByTopicIdOrderByOrderIndexAsc(id);

        List<StepItem> items = steps.stream()
                .map(step -> new StepItem(
                        step.getId(),
                        step.getStatement(),
                        step.getOptions(),
                        step.getOrderIndex(),
                        stepProgressRepository.findByUserIdAndStepId(user.getId(), step.getId())
                                .map(p -> p.isCorrect()).orElse(false)))
                .toList();

        return new TopicResponse(topic.getId(), topic.getTitle(), topic.getType(), topic.getTheoreticalContent(), items);
    }
}
