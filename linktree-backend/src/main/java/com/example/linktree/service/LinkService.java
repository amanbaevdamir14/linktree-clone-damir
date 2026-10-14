package com.example.linktree.service;

import com.example.linktree.dto.LinkDto;
import com.example.linktree.dto.LinkRequest;
import com.example.linktree.entity.Link;
import com.example.linktree.exception.LinkNotFoundException;
import com.example.linktree.repository.LinkRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class LinkService {
    private final LinkRepository repository;
    public LinkService(LinkRepository repository) { this.repository = repository; }

    public List<LinkDto> getLinks() {
        return repository.findAllByOrderByOrderIndexAsc().stream().map(this::toDto).toList();
    }

    @Transactional
    public LinkDto create(LinkRequest request) {
        int next = repository.findMaxOrderIndex() + 1;
        Link link = repository.save(new Link(request.title().trim(), request.url().trim(), next));
        return toDto(link);
    }

    @Transactional
    public LinkDto update(Long id, LinkRequest request) {
        Link link = repository.findById(id).orElseThrow(() -> new LinkNotFoundException(id));
        link.setTitle(request.title().trim());
        link.setUrl(request.url().trim());
        return toDto(repository.save(link));
    }

    @Transactional
    public void delete(Long id) {
        Link link = repository.findById(id).orElseThrow(() -> new LinkNotFoundException(id));
        repository.delete(link);
    }

    private LinkDto toDto(Link link) {
        return new LinkDto(link.getId(), link.getTitle(), link.getUrl(), link.getOrderIndex());
    }
}
