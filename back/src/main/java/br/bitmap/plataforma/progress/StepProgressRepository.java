package br.bitmap.plataforma.progress;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StepProgressRepository extends JpaRepository<StepProgress, Long> {

    Optional<StepProgress> findByUserIdAndStepId(Long userId, Long stepId);

    List<StepProgress> findByUserIdAndStepTopicId(Long userId, Long topicId);
}
