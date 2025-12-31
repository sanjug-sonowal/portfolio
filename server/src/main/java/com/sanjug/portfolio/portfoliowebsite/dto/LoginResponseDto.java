package com.sanjug.portfolio.portfoliowebsite.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginResponseDto {
    private String status;
    private Integer statusCode;
    private String message;
    private String token;
    private UserDto user;
    private LocalDateTime timestamp;
}

