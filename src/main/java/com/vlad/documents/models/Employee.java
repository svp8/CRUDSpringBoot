package com.vlad.documents.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String secondName;
    private String firstName;
    private String patronymic;
    private String position;
    @ManyToMany(mappedBy = "executors")
    public List<Order> orders=new ArrayList<>();
}
