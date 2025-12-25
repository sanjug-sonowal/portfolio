"use client";

import { TYPOGRAPHY } from "@/constants/typography";

export function AboutSection() {
  return (
    <div className="border-t border-dashed border-gray-300 pt-6">
      <h2 className={`${TYPOGRAPHY.heading.large.class} font-bold text-gray-900 mb-4`}>About</h2>
      <div className={`space-y-4 text-gray-700 ${TYPOGRAPHY.content.class} leading-relaxed`}>
        <p>
          I'm a <strong>Software Engineer</strong> with <strong>2+ years of hands-on experience</strong> building scalable, high-performance applications across mobile and web platforms. My journey in software development has been driven by a passion for solving complex problems and creating solutions that make a real impact.
        </p>
        <p>
          Throughout my career, I've worked on diverse projects ranging from HRMS mobile applications to fintech solutions, processing <strong>200K+ monthly transactions</strong> and handling critical systems that serve thousands of users. I specialize in <strong>Android development with Kotlin and Jetpack Compose</strong>, <strong>full-stack development</strong> using <strong>Spring Boot, React, and Node.js</strong>, and building robust backend architectures with <strong>AWS and Firebase</strong>.
        </p>
        <p>
          I'm passionate about writing clean, maintainable code and following best practices in software engineering. My expertise includes <strong>system design, performance optimization, API development, and CI/CD automation</strong>. When I'm not coding, you'll find me solving algorithmic challenges on LeetCode, where I've solved <strong>400+ problems</strong> and maintained consistency in problem-solving.
        </p>
        <p>
          I'm always eager to take on new challenges and contribute to innovative projects that push the boundaries of what's possible with technology.
        </p>
      </div>
    </div>
  );
}

