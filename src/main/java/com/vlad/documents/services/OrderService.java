package com.vlad.documents.services;

import com.vlad.documents.models.Order;
import com.vlad.documents.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    
    public Order addOrder(Order order) {
        Order savedOrder = orderRepository.save(order);

        return savedOrder;
    }


    public void delete(int id) {
        orderRepository.deleteById(id);
    }


    public Order getById(int id) {
        Optional<Order> temp=orderRepository.findById(id);
        return temp.orElse(null);
    }


    public Order editOrder(Order order) {

        return orderRepository.save(order);
    }
    public List<Order> getAll(){
        return orderRepository.findAll();
    }
}
