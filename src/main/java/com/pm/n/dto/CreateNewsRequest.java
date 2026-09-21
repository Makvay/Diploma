package com.pm.n.dto;

import lombok.Data;

@Data
public class CreateNewsRequest {
    private String title;
    private String content;
    private String imageUrl;
    private Long authorId;
}