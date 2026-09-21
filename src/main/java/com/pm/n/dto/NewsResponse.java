package com.pm.n.dto;

import lombok.Data;

@Data
public class NewsResponse {
    private Long id;
    private String title;
    private String content;
    private String imageUrl;
    private Long authorId;
    private String authorUsername;
}