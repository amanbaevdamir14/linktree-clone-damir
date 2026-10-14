package com.example.linktree.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "links")
public class Link {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String url;
    private Integer orderIndex;

    public Link() {}

    public Link(String title, String url, Integer orderIndex) {
        this.title = title;
        this.url = url;
        this.orderIndex = orderIndex;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getUrl() { return url; }
    public Integer getOrderIndex() { return orderIndex; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setUrl(String url) { this.url = url; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
}
