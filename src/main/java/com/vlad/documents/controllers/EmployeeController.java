package com.vlad.documents.controllers;

import com.vlad.documents.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(path = "/users")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployee(@PathVariable int id){

    return new ResponseEntity<>(employeeService.getById(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getEmployees(){
        return new ResponseEntity<>(employeeService.getAll(), HttpStatus.OK);
    }
}
