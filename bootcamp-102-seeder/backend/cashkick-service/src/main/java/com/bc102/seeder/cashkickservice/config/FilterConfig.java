package com.bc102.seeder.cashkickservice.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean<JwtFilter> jwtFilter() {
        FilterRegistrationBean filter= new FilterRegistrationBean();
        filter.setFilter(new JwtFilter());
        filter.addUrlPatterns("/cashKicks/*");
        return filter;
    }
}