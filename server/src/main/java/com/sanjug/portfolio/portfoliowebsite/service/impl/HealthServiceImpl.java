package com.sanjug.portfolio.portfoliowebsite.service.impl;

import com.sanjug.portfolio.portfoliowebsite.constants.HealthConstants;
import com.sanjug.portfolio.portfoliowebsite.dto.HealthResponseDto;
import com.sanjug.portfolio.portfoliowebsite.service.HealthService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class HealthServiceImpl implements HealthService {
    
    @Override
    public HealthResponseDto checkHealth() {
        Map<String, Object> details = buildHealthDetails();
        
        return HealthResponseDto.builder()
                .status(HealthConstants.STATUS_UP)
                .message(HealthConstants.DEFAULT_MESSAGE)
                .timestamp(LocalDateTime.now())
                .details(details)
                .build();
    }
    
    private Map<String, Object> buildHealthDetails() {
        Map<String, Object> details = new HashMap<>();
        details.put("application", HealthConstants.APPLICATION_NAME);
        details.put("version", getApplicationVersion());
        details.put("environment", getEnvironment());
        return details;
    }
    
    private String getApplicationVersion() {
        Package pkg = this.getClass().getPackage();
        return pkg != null && pkg.getImplementationVersion() != null 
            ? pkg.getImplementationVersion() 
            : "unknown";
    }
    
    private String getEnvironment() {
        String env = System.getProperty("spring.profiles.active");
        return env != null ? env : "default";
    }
}

