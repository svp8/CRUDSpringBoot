package com.vlad.documents.repositories;

import com.vlad.documents.models.Employee;
import com.vlad.documents.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {
    List<Order> findByAuthor_Id(int id);
    @Query("select t from Order t join t.executors u where u.id = :id")
    List<Order> findByExecutor(@Param("id")int id);
    List<Order> findByTitle(String title);

}
