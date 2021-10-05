package talk.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Set the routes that are allowed across the domain
        registry.addMapping("/**")
                // Set the domain name that allows cross-domain requests
                .allowedOriginPatterns("*")
                // whether to allow certificates (cookies)
                .allowCredentials(true)
                // Set the allowed methods
                .allowedMethods("*")
                .allowedHeaders("*")
                .exposedHeaders("Authorization")
                // Allowed time across domains
                .maxAge(3600);
    }
}
