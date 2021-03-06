package com.git.gagymservice.configuration;



import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry

				.addMapping("/**")
				.allowedOrigins("http://localhost:3000", "http://127.0.0.1:5500/",
//						"http://ec2-52-78-211-59.ap-northeast-2.compute.amazonaws.com")
//						"http://ec2-13-125-231-210.ap-northeast-2.compute.amazonaws.com",
						"http://ec2-54-180-151-228.ap-northeast-2.compute.amazonaws.com")
				.allowedMethods("*"); // 전체메서드를 허용(GET, POST, PUT....)
	}
}