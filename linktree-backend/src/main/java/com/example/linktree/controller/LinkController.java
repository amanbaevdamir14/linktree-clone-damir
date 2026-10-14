package com.example.linktree.controller;

import com.example.linktree.dto.LinkDto;
import com.example.linktree.dto.LinkRequest;
import com.example.linktree.service.LinkService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/links")
public class LinkController {
    private final LinkService service;
    public LinkController(LinkService service) { this.service = service; }

    @GetMapping public List<LinkDto> getLinks() { return service.getLinks(); }

    @PostMapping
    public ResponseEntity<LinkDto> create(@Valid @RequestBody LinkRequest request) {
        LinkDto created = service.create(request);
        return ResponseEntity.created(URI.create("/api/links/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public LinkDto update(@PathVariable Long id, @Valid @RequestBody LinkRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
