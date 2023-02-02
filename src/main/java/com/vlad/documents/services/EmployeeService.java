package com.vlad.documents.services;

import com.vlad.documents.models.Employee;
import com.vlad.documents.models.Order;
import com.vlad.documents.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee addEmployee(Employee employee) {


        Employee savedEmployee = employeeRepository.save(employee);

        return savedEmployee;
    }

    public Employee getById(int id) {
        return employeeRepository.findById(id).orElse(null);
    }


    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }
}
