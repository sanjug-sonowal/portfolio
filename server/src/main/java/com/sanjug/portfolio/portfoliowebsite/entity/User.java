package com.sanjug.portfolio.portfoliowebsite.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 255)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false, length = 255)
    private String name;
    
    @Column(length = 20)
    private String phone;
    
    @Column(name = "job_title", length = 255)
    private String jobTitle;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    @Column(name = "linkedin_url", length = 500)
    private String linkedinUrl;
    
    @Column(name = "github_url", length = 500)
    private String githubUrl;
    
    @Column(name = "leetcode_url", length = 500)
    private String leetcodeUrl;
    
    @Column(name = "interview_ready", nullable = false)
    @Builder.Default
    private Boolean interviewReady = false;
    
    @Column(name = "immediate_joiner", nullable = false)
    @Builder.Default
    private Boolean immediateJoiner = false;
    
    @Column(name = "open_to_work", nullable = false)
    @Builder.Default
    private Boolean openToWork = false;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (interviewReady == null) interviewReady = false;
        if (immediateJoiner == null) immediateJoiner = false;
        if (openToWork == null) openToWork = false;
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

