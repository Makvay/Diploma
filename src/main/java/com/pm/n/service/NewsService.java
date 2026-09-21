package com.pm.n.service;

import com.pm.n.dto.CreateNewsRequest;
import com.pm.n.dto.NewsMapper;
import com.pm.n.dto.NewsResponse;
import com.pm.n.entity.News;
import com.pm.n.entity.NewsStatus;
import com.pm.n.entity.User;
import com.pm.n.repository.NewsRepository;
import com.pm.n.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NewsService {

    private final NewsRepository newsRepository;
    private final UserRepository userRepository;
    private final NewsMapper newsMapper;

    public NewsService(NewsRepository newsRepository,
                       UserRepository userRepository,
                       NewsMapper newsMapper) {
        this.newsRepository = newsRepository;
        this.userRepository = userRepository;
        this.newsMapper = newsMapper;
    }

    @Transactional(readOnly = true)
    public List<NewsResponse> getAllNews() {
        return newsRepository.findAll()
                .stream()
                .map(newsMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public NewsResponse getNewsById(Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found"));
        return newsMapper.toResponse(news);
    }

    @Transactional
    public NewsResponse suggestNews(CreateNewsRequest request, Long userId) {
        User author = userRepository.findById(userId)
                .orElseThrow(()-> new RuntimeException("User not foung"));
        News news = newsMapper.toEntity(request);
        news.setAuthor(author);
        news.setStatus(NewsStatus.PENDING);

        return newsMapper.toResponse(newsRepository.save(news));
    }

    @Transactional
    public NewsResponse createNews(CreateNewsRequest req) {
        News news = newsMapper.toEntity(req);

        if (req.getAuthorId() != null) {
            User author = userRepository.findById(req.getAuthorId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            news.setAuthor(author);
        }

        return newsMapper.toResponse(newsRepository.save(news));
    }

    @Transactional
    public void deleteNews(Long id) {
        newsRepository.deleteById(id);
    }
}