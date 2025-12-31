package com.sanjug.portfolio.portfoliowebsite.service;

import com.sanjug.portfolio.portfoliowebsite.dto.LoginRequestDto;
import com.sanjug.portfolio.portfoliowebsite.dto.LoginResponseDto;
import com.sanjug.portfolio.portfoliowebsite.dto.RegisterRequestDto;
import com.sanjug.portfolio.portfoliowebsite.dto.RegisterResponseDto;

public interface AuthenticationService {
    LoginResponseDto login(LoginRequestDto request);
    RegisterResponseDto register(RegisterRequestDto request);
}

