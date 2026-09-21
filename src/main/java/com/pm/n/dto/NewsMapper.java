package com.pm.n.dto;

import com.pm.n.entity.News;
import org.springframework.stereotype.Component;

@Component
public class NewsMapper {

    public NewsResponse toResponse(News news) {
        NewsResponse dto = new NewsResponse();
        dto.setId(news.getId());
        dto.setTitle(news.getTitle());
        dto.setContent(news.getContent());
        dto.setImageUrl(news.getImageUrl());
        dto.setCreatedAt(news.getCreatedAt());

        if (news.getAuthor() != null) {
            dto.setAuthorId(news.getAuthor().getId());
            dto.setAuthorUsername(news.getAuthor().getUsername());
        }
        return dto;
    }

    public News toEntity(CreateNewsRequest req) {
        News news = new News();
        news.setTitle(req.getTitle());
        news.setContent(req.getContent());
        news.setImageUrl(req.getImageUrl());
        return news;
    }
}