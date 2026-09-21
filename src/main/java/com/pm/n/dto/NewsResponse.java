package com.pm.n.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NewsResponse {
    private Long id;
    private String title;
    private String content;
    private String imageUrl;
    private LocalDateTime createdAt;
    private Long authorId;
    private String authorUsername;
}