package com.vlad.documents.services;

import com.vlad.documents.models.Employee;
import com.vlad.documents.models.Events;
import com.vlad.documents.models.Order;
import com.vlad.documents.models.States;
import com.vlad.documents.repositories.EmployeeRepository;
import com.vlad.documents.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.statemachine.StateMachine;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private StateMachine<States, Events> stateMachine;



    public Order addOrder(Order order) {
        order.setControlTag(false);
        order.setExecutionTag(false);
        Order savedOrder = orderRepository.save(order);

        return savedOrder;
    }


    public void delete(int id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            orderRepository.deleteById(id);
        }
    }


    public Order getById(int id) {
        Optional<Order> temp = orderRepository.findById(id);
        return temp.orElse(null);
    }
    public List<Order> getByAuthorId(int id) {
        List<Order> temp = orderRepository.findByAuthor_Id(id);
        return temp;
    }
    public List<Order> getByExecutorId(int id) {
        List<Order> temp =orderRepository.findByExecutor(id);
        return temp;
    }

    public ResponseEntity<?> editOrder(Order order) {
        boolean control=order.getControlTag();
        boolean execution= order.getExecutionTag();
        if(!execution&&control){
            return new ResponseEntity<>("Нельзя пройти контроль", HttpStatus.BAD_REQUEST);
        }
//        Order order1=orderRepository.findById(order.getId()).orElse(null);

        return new ResponseEntity<>(orderRepository.save(order),HttpStatus.OK);
    }

    public List<Order> getAll() {
        return orderRepository.findAll();
    }
}
