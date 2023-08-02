package com.chibbol.wtz.domain.shop.repository;

import com.chibbol.wtz.domain.shop.entity.Item;
import com.chibbol.wtz.domain.shop.entity.UserItem;
import com.chibbol.wtz.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserItemRepository extends JpaRepository<UserItem, Long> {

    boolean countByUserAndItem(User user, Item item);

    Optional<List<UserItem>> findAllByUser(User user);
}
