package com.edelweiss.resource_server_springboot.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue
    private int employeeId;
    private String name;
    private String designation;
    private String emailId;
    private String contactNo;

    public Employee(String name, String designation, String emailId, String contactNo) {

        this.name = name;
        this.designation = designation;
        this.emailId = emailId;
        this.contactNo = contactNo;
    }
}