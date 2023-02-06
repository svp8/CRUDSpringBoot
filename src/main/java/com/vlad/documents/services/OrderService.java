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
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private EmployeeRepository employeeRepository;


    public Order addOrder(Order order) {
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

    public Order editOrder(Order order) {
        System.out.println(order);

//        Order oldOrder=orderRepository.findById(order.getId()).orElse(null);
//        if(oldOrder.getExecutors()!=null){
//            List<Employee> deletedExecutors=oldOrder.getExecutors().stream().filter(e->{
//                for(Employee e1:order.getExecutors()){
//                    if(e.getId()==e1.getId()){
//                        return false;
//                    }
//                }
//                return true;
//            }).toList();
//            System.out.println("123");
//            System.out.println(deletedExecutors.);
//            for(int i=0;i<deletedExecutors.size();i++){
//                Employee e=deletedExecutors.get(i);
//                e.deleteOrder(oldOrder);
//               System.out.println(employeeRepository.save(e));
//            }
//        }
//        System.out.println(order.getExecutors());
//        for(int i=0;i<order.getExecutors().size();i++){
//            Employee e=order.getExecutors().get(i);
//            e.addOrder(order);
//            employeeRepository.save(e);
//        }

        return orderRepository.save(order);
    }

    public List<Order> getAll() {
        return orderRepository.findAll();
    }
}
