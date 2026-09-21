package com.pm.n.controller;

import com.pm.n.dto.CreateNewsRequest;
import com.pm.n.dto.NewsResponse;
import com.pm.n.service.FileStorageService;
import com.pm.n.service.NewsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;
    private final FileStorageService fileStorageService;

    public NewsController(NewsService newsService, FileStorageService fileStorageService) {
        this.newsService = newsService;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    public List<NewsResponse> getAllNews() {
        return newsService.getAllNews();
    }

    @GetMapping("/{id}")
    public NewsResponse getNewsById(@PathVariable Long id) {
        return newsService.getNewsById(id);
    }

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        String filename = fileStorageService.store(file);
        return "/uploads/" + filename;
    }

    @PostMapping
    public NewsResponse createNews(@RequestBody CreateNewsRequest req) {
        return newsService.createNews(req);
    }

    @DeleteMapping("/{id}")
    public void deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
    }
}