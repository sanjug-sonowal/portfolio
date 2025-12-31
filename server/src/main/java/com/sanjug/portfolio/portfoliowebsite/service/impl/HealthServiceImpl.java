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
        // Check database asynchronously to avoid blocking - use cached result or quick check
        try {
            details.put("database", checkDatabaseConnectionFast());
        } catch (Exception e) {
            // If database check fails, still return health as UP but mark DB as unavailable
            Map<String, Object> dbStatus = new HashMap<>();
            dbStatus.put("configured", extractDbType(dataSourceUrl));
            dbStatus.put("status", "unavailable");
            dbStatus.put("error", "Connection check timeout");
            details.put("database", dbStatus);
        }
        
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
    
    private Map<String, Object> checkDatabaseConnectionFast() {
        Map<String, Object> dbStatus = new HashMap<>();
        
        String dbType = extractDbType(dataSourceUrl);
        dbStatus.put("configured", dbType);
        
        try (Connection connection = dataSource.getConnection()) {
            // Use very short timeout for Lambda (1 second) to avoid blocking
            boolean isValid = connection.isValid(1);
            if (isValid) {
                try {
                    String dbProduct = connection.getMetaData().getDatabaseProductName();
                    String dbVersion = connection.getMetaData().getDatabaseProductVersion();
                    
                    dbStatus.put("status", "connected");
                    dbStatus.put("database", dbProduct);
                    dbStatus.put("version", dbVersion);
                } catch (Exception e) {
                    // If metadata fetch fails, just mark as connected
                    dbStatus.put("status", "connected");
                }
            } else {
                dbStatus.put("status", "disconnected");
            }
        } catch (Exception e) {
            dbStatus.put("status", "error");
            String errorMsg = e.getMessage();
            if (errorMsg != null && errorMsg.length() > 100) {
                errorMsg = errorMsg.substring(0, 100) + "...";
            }
            dbStatus.put("error", errorMsg != null ? errorMsg : e.getClass().getSimpleName());
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

