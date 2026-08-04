package br.bitmap.plataforma.step;

import br.bitmap.plataforma.progress.StepProgress;
import br.bitmap.plataforma.progress.StepProgressRepository;
import br.bitmap.plataforma.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/steps")
@RequiredArgsConstructor
public class StepController {

    private final StepRepository stepRepository;
    private final StepProgressRepository stepProgressRepository;

    public record SubmitRequest(String answer) {
    }

    public record SubmitResponse(boolean correct, String correctAnswer) {
    }

    @PostMapping("/{id}/submit")
    public SubmitResponse submit(@PathVariable Long id, @RequestBody SubmitRequest request, @AuthenticationPrincipal User user) {
        Step step = stepRepository.findById(id).orElseThrow();
        boolean correct = step.getCorrectAnswer().equals(request.answer());

        StepProgress progress = stepProgressRepository.findByUserIdAndStepId(user.getId(), id)
                .orElseGet(() -> StepProgress.builder().user(user).step(step).build());
        progress.setCorrect(progress.isCorrect() || correct);
        stepProgressRepository.save(progress);

        return new SubmitResponse(correct, step.getCorrectAnswer());
    }
}
