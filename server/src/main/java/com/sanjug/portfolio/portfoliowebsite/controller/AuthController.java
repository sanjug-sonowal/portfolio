package com.sanjug.portfolio.portfoliowebsite.controller;

import com.sanjug.portfolio.portfoliowebsite.dto.LoginRequestDto;
import com.sanjug.portfolio.portfoliowebsite.dto.LoginResponseDto;
import com.sanjug.portfolio.portfoliowebsite.dto.RegisterRequestDto;
import com.sanjug.portfolio.portfoliowebsite.dto.RegisterResponseDto;
import com.sanjug.portfolio.portfoliowebsite.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthenticationService authenticationService;
    
    @PostMapping({"/v1/auth/login", "/api/v1/auth/login"})
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto request) {
        LoginResponseDto response = authenticationService.login(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @PostMapping({"/v1/auth/register", "/api/v1/auth/register"})
    public ResponseEntity<RegisterResponseDto> register(@Valid @RequestBody RegisterRequestDto request) {
        RegisterResponseDto response = authenticationService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

