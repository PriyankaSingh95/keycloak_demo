package com.edelweiss.resource_server_springboot.service;

import com.edelweiss.resource_server_springboot.entity.Employee;
import com.edelweiss.resource_server_springboot.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@Service
public class EmployeeService {

        @Autowired
        EmployeeRepository employeeRepository;

        public List<Employee> getEmployees(){
        return employeeRepository.findAll();
    }

    public void saveEmployee(Employee employee) {
            employeeRepository.save(employee);
    }

    public Employee getEmployeeById(int id) {
            return employeeRepository.findById(id).get();
    }
}
