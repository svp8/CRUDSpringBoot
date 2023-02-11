package com.vlad.documents.services;

import com.vlad.documents.models.Employee;
import com.vlad.documents.models.Order;
import com.vlad.documents.repositories.EmployeeRepository;
import com.vlad.documents.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private OrderRepository orderRepository;

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
    public void delete(int id){
        Employee employee=employeeRepository.findById(id).orElse(null);
        if(employee.getOrders().size()!=0){
            for(Order order:employee.getOrders()){
                order.getExecutors().remove(employee);
                orderRepository.save(order);
            }
        }
        employeeRepository.deleteById(id);
    }
}
