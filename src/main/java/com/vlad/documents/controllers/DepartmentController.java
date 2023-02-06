package com.vlad.documents.controllers;

import com.vlad.documents.models.Department;
import com.vlad.documents.services.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/department")
public class DepartmentController {
    @Autowired
    DepartmentService departmentService;

    @GetMapping("/all")
    public ResponseEntity<List<Department>> getDepartments(){
        return new ResponseEntity<>(departmentService.getAll(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getDepartment(@PathVariable int id){
        Department department=departmentService.getById(id);
        if(department!=null){
            return new ResponseEntity<>(department,HttpStatus.OK);
        }
        return new ResponseEntity<>("No such department",HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/create")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department){
        if(department!=null) {
            return new ResponseEntity<>(departmentService.addDepartment(department),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/update")
    public ResponseEntity<Department> editDepartment(@RequestBody Department department){
        if(departmentService.getById(department.getId())!=null){
            return new ResponseEntity<>(departmentService.editDepartment(department),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @DeleteMapping("/{id}")
    public void deleteDepartment(@PathVariable int id){
        departmentService.delete(id);
    }
}
