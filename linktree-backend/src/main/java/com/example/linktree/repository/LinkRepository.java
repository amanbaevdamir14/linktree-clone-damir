package com.example.linktree.repository;

import com.example.linktree.entity.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface LinkRepository extends JpaRepository<Link, Long> {
    List<Link> findAllByOrderByOrderIndexAsc();
    @Query("select coalesce(max(l.orderIndex), 0) from Link l")
    Integer findMaxOrderIndex();
}
