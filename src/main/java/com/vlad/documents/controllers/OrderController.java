package com.vlad.documents.controllers;

import com.vlad.documents.models.Order;
import com.vlad.documents.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/order")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getOrders(){
        return new ResponseEntity<>(orderService.getAll(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public void getOrder(){

    }
    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody Order order){
        if(order!=null) {
            return new ResponseEntity<>(orderService.addOrder(order),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/update")
    public ResponseEntity<Order> editOrder(@RequestBody Order order){
        if(orderService.getById(order.getId())!=null){
            return new ResponseEntity<>(orderService.editOrder(order),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @DeleteMapping("/{id}")
    public void deleteOrder(){

    }
}
