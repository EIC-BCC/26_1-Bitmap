package br.bitmap.plataforma.step;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StepRepository extends JpaRepository<Step, Long> {

    List<Step> findByTopicIdOrderByOrderIndexAsc(Long topicId);
}
