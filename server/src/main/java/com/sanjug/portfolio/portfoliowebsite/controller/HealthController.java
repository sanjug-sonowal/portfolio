package com.sanjug.portfolio.portfoliowebsite.controller;

import com.sanjug.portfolio.portfoliowebsite.dto.HealthResponseDto;
import com.sanjug.portfolio.portfoliowebsite.service.HealthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class HealthController {
    
    private final HealthService healthService;
    
    @GetMapping("/health")
    public ResponseEntity<HealthResponseDto> health() {
        HealthResponseDto response = healthService.checkHealth();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}

