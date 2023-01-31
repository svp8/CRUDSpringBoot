package com.vlad.documents.models;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Getter
@Setter
@Entity
@Table(name = "orderTable")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String title;
    @ManyToOne
    private Employee author;

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author=" + author +
                ", date=" + date +
                ", controlTag='" + controlTag + '\'' +
                ", executionTag=" + executionTag +
                ", text='" + text + '\'' +
                '}';
    }

    @ManyToMany
    @JoinTable(
            name = "Order_Executor",
            joinColumns = { @JoinColumn(name = "order_id") },
            inverseJoinColumns = { @JoinColumn(name = "executor_id") }
    )
    private List<Employee> executors=new ArrayList<>();
    private Date date;
    private String controlTag;
    private State executionTag;
    @Lob
    private String text;

    enum State{
        PREPARATION,
        EXECUTION,
        CONTROL,
        MODIFICATION,
        ACCEPTION
    }
}
