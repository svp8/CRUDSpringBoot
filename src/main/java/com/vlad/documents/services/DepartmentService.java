package com.vlad.documents.services;

import com.vlad.documents.models.Employee;
import com.vlad.documents.models.Department;
import com.vlad.documents.repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {
    @Autowired
    DepartmentRepository departmentRepository;

    public Department addDepartment(Department department) {

        Department savedDepartment = departmentRepository.save(department);

        return savedDepartment;
    }


    public void delete(int id) {
        Department department = departmentRepository.findById(id).orElse(null);
        if (department != null) {
            departmentRepository.deleteById(id);
        }
    }


    public Department getById(int id) {
        Optional<Department> temp = departmentRepository.findById(id);
        return temp.orElse(null);
    }

    public Department editDepartment(Department department) {

        return departmentRepository.save(department);
    }

    public List<Department> getAll() {
        return departmentRepository.findAll();
    }
}
