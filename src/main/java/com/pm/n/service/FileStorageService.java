package com.pm.n.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final String UPLOAD_DIR = "C:/Users/Makvay/Desktop/N/uploads";

    public String store(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Файл пустой");
        }

        Path dir = Paths.get(UPLOAD_DIR);
        Files.createDirectories(dir);

        String original = file.getOriginalFilename();
        String ext = (original != null && original.contains("."))
                ? original.substring(original.lastIndexOf("."))
                : "";
        String filename = UUID.randomUUID() + ext;

        file.transferTo(dir.resolve(filename));

        return filename;
    }
}