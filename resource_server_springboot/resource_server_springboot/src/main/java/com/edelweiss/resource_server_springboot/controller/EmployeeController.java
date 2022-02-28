package com.edelweiss.resource_server_springboot.controller;


import com.edelweiss.resource_server_springboot.entity.Employee;
import com.edelweiss.resource_server_springboot.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3001/*")
@RestController
@RequestMapping(path="/employee")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;


    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Employee>> getEmployeeList() {
        List<Employee> employees = employeeService.getEmployees();
        System.out.println(employees);
        return ResponseEntity.ok(employees);
    }

    @PostMapping(path = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> createEmployee(@RequestBody Employee employee) {
        employeeService.saveEmployee(employee);
        return ResponseEntity.ok(employee.getEmployeeId());
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Employee> viewEmployee(@PathVariable("id") int id) {
        Employee employee = employeeService.getEmployeeById(id);
        System.out.println(employee);
        return ResponseEntity.ok(employee);

    }
}
