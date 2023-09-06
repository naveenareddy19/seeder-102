package com.bc102.seeder.cashkickservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class CashkickServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CashkickServiceApplication.class, args);
	}

}
