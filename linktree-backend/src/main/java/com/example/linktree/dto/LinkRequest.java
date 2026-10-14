package com.example.linktree.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record LinkRequest(
    @NotBlank(message = "Название не должно быть пустым")
    @Size(max = 50, message = "Название не должно быть длиннее 50 символов")
    String title,

    @NotBlank(message = "URL не должен быть пустым")
    @Size(max = 2048, message = "URL не должен быть длиннее 2048 символов")
    @Pattern(regexp = "^https?://.+", message = "URL должен начинаться с http:// или https://")
    String url
) {}
