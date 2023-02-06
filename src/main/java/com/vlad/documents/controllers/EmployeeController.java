package com.vlad.documents.controllers;

import com.vlad.documents.models.Employee;
import com.vlad.documents.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping(path = "/users")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployee(@PathVariable int id){

    return new ResponseEntity<>(employeeService.getById(id), HttpStatus.OK);
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateEmployee(@RequestBody Employee employee){
        if(employeeService.getById(employee.getId())!=null){
            return new ResponseEntity<>(employeeService.addEmployee(employee), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }
    @PostMapping("/create")
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee){
        return new ResponseEntity<>(employeeService.addEmployee(employee), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getEmployees(){
        return new ResponseEntity<>(employeeService.getAll(), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable int id){
        employeeService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
