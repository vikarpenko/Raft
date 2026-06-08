package org.naukma.raft.repository;

import org.naukma.raft.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Collection;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByWorkspace_IdInOrderByStartTimeAsc(Collection<Long> workspaceIds);

    void deleteByWorkspace_Id(Long workspaceId);
}
