package com.sanjug.portfolio.portfoliowebsite.service.impl;

import com.sanjug.portfolio.portfoliowebsite.constants.HealthConstants;
import com.sanjug.portfolio.portfoliowebsite.dto.HealthResponseDto;
import com.sanjug.portfolio.portfoliowebsite.service.HealthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HealthServiceImpl implements HealthService {
    
    private final DataSource dataSource;
    
    @Value("${spring.datasource.url:}")
    private String dataSourceUrl;
    
    @Override
    public HealthResponseDto checkHealth() {
        Map<String, Object> details = buildHealthDetails();
        details.put("database", checkDatabaseConnection());
        
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
    
    private Map<String, Object> checkDatabaseConnection() {
        Map<String, Object> dbStatus = new HashMap<>();
        
        String dbType = extractDbType(dataSourceUrl);
        dbStatus.put("configured", dbType);
        
        try (Connection connection = dataSource.getConnection()) {
            boolean isValid = connection.isValid(5);
            String dbProduct = connection.getMetaData().getDatabaseProductName();
            String dbVersion = connection.getMetaData().getDatabaseProductVersion();
            
            dbStatus.put("status", isValid ? "connected" : "disconnected");
            dbStatus.put("database", dbProduct);
            dbStatus.put("version", dbVersion);
        } catch (Exception e) {
            dbStatus.put("status", "error");
            dbStatus.put("error", e.getMessage());
        }
        
        return dbStatus;
    }
    
    private String extractDbType(String url) {
        if (url == null || url.isEmpty()) {
            return "default (H2)";
        }
        if (url.contains("postgresql")) {
            return "PostgreSQL";
        } else if (url.contains("h2")) {
            return "H2";
        }
        return "unknown";
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

