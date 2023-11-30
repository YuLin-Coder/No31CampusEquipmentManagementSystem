package com.camequmansys.camequmansys;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author Administrator
 */
@MapperScan("com.camequmansys.camequmansys.mapper")
@SpringBootApplication
public class CamequmansysApplication {

	public static void main(String[] args) {
		SpringApplication.run(CamequmansysApplication.class, args);
	}

}
