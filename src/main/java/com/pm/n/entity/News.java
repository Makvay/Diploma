package com.pm.n.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.IdGeneratorType;

@Data
@Entity
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;


}
