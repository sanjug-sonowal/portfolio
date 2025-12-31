package com.sanjug.portfolio.portfoliowebsite.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Service for JWT token generation and validation.
 * Provides methods to create, parse, and validate JWT tokens.
 */
@Service
public class JwtService {
    
    @Value("${jwt.secret}")
    private String secretKey;
    
    @Value("${jwt.expiration}")
    private Long expiration;
    
    /**
     * Generates a JWT token for a user with their email and ID.
     * 
     * @param email The user's email address
     * @param userId The user's ID
     * @return JWT token string
     */
    public String generateToken(String email, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("email", email);
        return createToken(claims, email);
    }
    
    /**
     * Creates a JWT token with the given claims and subject.
     * 
     * @param claims The claims to include in the token
     * @param subject The subject (typically the user's email)
     * @return JWT token string
     */
    private String createToken(Map<String, Object> claims, String subject) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + expiration);
        
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(now)
                .expiration(expirationDate)
                .signWith(getSigningKey())
                .compact();
    }
    
    /**
     * Extracts the username (email) from a JWT token.
     * 
     * @param token The JWT token
     * @return The email address (subject) from the token
     */
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    /**
     * Extracts the user ID from a JWT token.
     * 
     * @param token The JWT token
     * @return The user ID from the token claims
     */
    public Long extractUserId(String token) {
        Claims claims = extractAllClaims(token);
        Object userId = claims.get("userId");
        if (userId instanceof Integer) {
            return ((Integer) userId).longValue();
        }
        return userId != null ? (Long) userId : null;
    }
    
    /**
     * Extracts the expiration date from a JWT token.
     * 
     * @param token The JWT token
     * @return The expiration date
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    /**
     * Extracts a specific claim from a JWT token using the provided claims resolver.
     * 
     * @param token The JWT token
     * @param claimsResolver Function to extract the specific claim
     * @param <T> The type of the claim
     * @return The extracted claim value
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    /**
     * Extracts all claims from a JWT token.
     * 
     * @param token The JWT token
     * @return All claims from the token
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    
    /**
     * Validates if a JWT token is valid (not expired and matches the email).
     * 
     * @param token The JWT token to validate
     * @param email The email to validate against
     * @return true if the token is valid, false otherwise
     */
    public Boolean validateToken(String token, String email) {
        final String tokenEmail = extractEmail(token);
        return (tokenEmail.equals(email) && !isTokenExpired(token));
    }
    
    /**
     * Checks if a JWT token has expired.
     * 
     * @param token The JWT token to check
     * @return true if the token is expired, false otherwise
     */
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    /**
     * Gets the signing key for JWT token signing and verification.
     * 
     * @return SecretKey for JWT operations
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

