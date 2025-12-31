package com.sanjug.portfolio.portfoliowebsite.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

/**
 * DataSource configuration optimized for AWS Lambda.
 * Configures connection pool with fast timeouts to prevent Gateway timeouts.
 */
@Configuration
public class DataSourceConfig {
    
    @Value("${spring.datasource.url}")
    private String jdbcUrl;
    
    @Value("${spring.datasource.username}")
    private String username;
    
    @Value("${spring.datasource.password}")
    private String password;
    
    @Value("${spring.datasource.driver-class-name}")
    private String driverClassName;
    
    @Bean
    @Primary
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(ensureTimeoutParameters(jdbcUrl));
        config.setUsername(username);
        config.setPassword(password);
        config.setDriverClassName(driverClassName);
        
        // Optimized for Lambda - fast timeouts, small pool
        config.setConnectionTimeout(3000); // 3 seconds
        config.setMaximumPoolSize(2);
        config.setMinimumIdle(0); // Don't keep idle connections in Lambda
        config.setIdleTimeout(300000); // 5 minutes
        config.setMaxLifetime(600000); // 10 minutes
        config.setInitializationFailTimeout(2000); // Fail fast if can't connect
        
        return new HikariDataSource(config);
    }
    
    /**
     * Ensures JDBC URL has timeout parameters for fast connection failures.
     */
    private String ensureTimeoutParameters(String url) {
        if (url == null || url.isEmpty()) {
            return url;
        }
        
        // If URL already has parameters, check if timeout params exist
        if (url.contains("?")) {
            String baseUrl = url.split("\\?")[0];
            String params = url.split("\\?")[1];
            
            // Add timeout params if not present
            if (!params.contains("connectTimeout")) {
                params += "&connectTimeout=3";
            }
            if (!params.contains("socketTimeout")) {
                params += "&socketTimeout=5";
            }
            if (!params.contains("loginTimeout")) {
                params += "&loginTimeout=3";
            }
            
            return baseUrl + "?" + params;
        } else {
            // No parameters, add them
            return url + "?connectTimeout=3&socketTimeout=5&loginTimeout=3";
        }
    }
}

