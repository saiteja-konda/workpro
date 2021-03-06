package dev.teja.projectboard.repository;

import dev.teja.projectboard.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
    @Override
    Iterable<Project> findAll();

    Iterable<Project> findByProjectLeader(String username);

    Project findByProjectIdentifier(String project);
}
