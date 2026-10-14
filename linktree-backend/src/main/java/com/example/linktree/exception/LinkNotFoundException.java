package com.example.linktree.exception;

public class LinkNotFoundException extends RuntimeException {
    public LinkNotFoundException(Long id) { super("Ссылка с id " + id + " не найдена"); }
}
