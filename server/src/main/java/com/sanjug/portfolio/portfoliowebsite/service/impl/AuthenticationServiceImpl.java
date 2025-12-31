package com.sanjug.portfolio.portfoliowebsite.service.impl;

import com.sanjug.portfolio.portfoliowebsite.constants.AuthConstants;
import com.sanjug.portfolio.portfoliowebsite.dto.LoginRequestDto;
import com.sanjug.portfolio.portfoliowebsite.dto.LoginResponseDto;
import com.sanjug.portfolio.portfoliowebsite.dto.RegisterRequestDto;
import com.sanjug.portfolio.portfoliowebsite.dto.RegisterResponseDto;
import com.sanjug.portfolio.portfoliowebsite.dto.UserDto;
import com.sanjug.portfolio.portfoliowebsite.entity.User;
import com.sanjug.portfolio.portfoliowebsite.exception.DuplicateEmailException;
import com.sanjug.portfolio.portfoliowebsite.repository.UserRepository;
import com.sanjug.portfolio.portfoliowebsite.service.AuthenticationService;
import com.sanjug.portfolio.portfoliowebsite.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    
    @Override
    public LoginResponseDto login(LoginRequestDto request) {
        User user = findUserByEmail(request.getEmail());
        validatePassword(request.getPassword(), user.getPassword());
        String token = jwtService.generateToken(user.getEmail(), user.getId());
        
        return buildLoginResponse(user, token);
    }
    
    @Override
    public RegisterResponseDto register(RegisterRequestDto request) {
        validateEmailNotExists(request.getEmail());
        String encodedPassword = encodePassword(request.getPassword());
        User user = createUser(request, encodedPassword);
        userRepository.save(user);
        
        return buildRegisterResponse();
    }
    
    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(AuthConstants.INVALID_CREDENTIALS));
    }
    
    private void validateEmailNotExists(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new DuplicateEmailException(AuthConstants.EMAIL_ALREADY_EXISTS);
        }
    }
    
    private void validatePassword(String rawPassword, String encodedPassword) {
        if (!passwordEncoder.matches(rawPassword, encodedPassword)) {
            throw new RuntimeException(AuthConstants.INVALID_CREDENTIALS);
        }
    }
    
    private String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
    
    private User createUser(RegisterRequestDto request, String encodedPassword) {
        return User.builder()
                .email(request.getEmail())
                .password(encodedPassword)
                .name(request.getName())
                .phone(request.getPhone())
                .jobTitle(request.getJobTitle())
                .bio(request.getBio())
                .linkedinUrl(request.getLinkedinUrl())
                .githubUrl(request.getGithubUrl())
                .leetcodeUrl(request.getLeetcodeUrl())
                .interviewReady(false)
                .immediateJoiner(false)
                .openToWork(false)
                .build();
    }
    
    private LoginResponseDto buildLoginResponse(User user, String token) {
        UserDto userDto = buildUserDto(user);
        
        return LoginResponseDto.builder()
                .status("success")
                .statusCode(200)
                .message(AuthConstants.LOGIN_SUCCESS)
                .token(token)
                .user(userDto)
                .timestamp(LocalDateTime.now())
                .build();
    }
    
    private UserDto buildUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .phone(user.getPhone())
                .jobTitle(user.getJobTitle())
                .bio(user.getBio())
                .linkedinUrl(user.getLinkedinUrl())
                .githubUrl(user.getGithubUrl())
                .leetcodeUrl(user.getLeetcodeUrl())
                .interviewReady(user.getInterviewReady())
                .immediateJoiner(user.getImmediateJoiner())
                .openToWork(user.getOpenToWork())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
    
    private RegisterResponseDto buildRegisterResponse() {
        return RegisterResponseDto.builder()
                .status("success")
                .statusCode(201)
                .message(AuthConstants.REGISTRATION_SUCCESS)
                .timestamp(LocalDateTime.now())
                .build();
    }
}

