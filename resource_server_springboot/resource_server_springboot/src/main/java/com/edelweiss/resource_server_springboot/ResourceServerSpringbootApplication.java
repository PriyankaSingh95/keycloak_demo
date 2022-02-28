package com.edelweiss.resource_server_springboot;

import com.edelweiss.resource_server_springboot.entity.Employee;
import com.edelweiss.resource_server_springboot.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
public class ResourceServerSpringbootApplication {
	@Autowired
	EmployeeRepository employeeRepository;

	public static void main(String[] args) {
		SpringApplication.run(ResourceServerSpringbootApplication.class, args);
	}
	@PostConstruct
	public void initializeDB(){
		List<Employee> employees = Stream.of(
				new Employee( "Aayushi", "Java Developer", "aayushi@gmail.com", "9438943843"),
				new Employee("Priyanka", "Java Developer", "priyanka@gmail.com", "9849379343"),
				new Employee( "Kriti", "Java Developer", "kriti@gmail.com", "9328327242")
		).collect(Collectors.toList());


		employeeRepository.saveAll(employees);
	}
}
