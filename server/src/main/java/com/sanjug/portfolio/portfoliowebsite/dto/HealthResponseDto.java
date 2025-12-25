package com.sanjug.portfolio.portfoliowebsite.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HealthResponseDto {
    private String status;
    private String message;
    private LocalDateTime timestamp;
    private Map<String, Object> details;
}

