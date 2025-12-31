package com.sanjug.portfolio.portfoliowebsite.controller;

import com.sanjug.portfolio.portfoliowebsite.dto.HealthResponseDto;
import com.sanjug.portfolio.portfoliowebsite.service.HealthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class HealthController {
    
    private final HealthService healthService;
    
    @GetMapping({"/v1/health", "/api/v1/health"})
    public ResponseEntity<HealthResponseDto> health() {
        HealthResponseDto response = healthService.checkHealth();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}

