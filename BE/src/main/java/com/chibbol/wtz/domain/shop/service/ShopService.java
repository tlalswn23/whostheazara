package com.chibbol.wtz.domain.shop.service;

import com.chibbol.wtz.domain.shop.dto.ItemListDTO;
import com.chibbol.wtz.domain.shop.entity.Item;
import com.chibbol.wtz.domain.shop.entity.Point;
import com.chibbol.wtz.domain.shop.entity.UserItem;
import com.chibbol.wtz.domain.shop.exception.AlreadyPurchasedException;
import com.chibbol.wtz.domain.shop.exception.InsufficientPointsException;
import com.chibbol.wtz.domain.shop.repository.ItemRepository;
import com.chibbol.wtz.domain.shop.repository.PointRepository;
import com.chibbol.wtz.domain.shop.repository.UserItemRepository;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.exception.UserNotFoundException;
import com.chibbol.wtz.domain.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ShopService {

    private final String IMAGE_PATH = "static/item_images/";

    private final UserService userService;

    private final ItemRepository itemRepository;
    private final PointRepository pointRepository;
    private final UserItemRepository userItemRepository;

    public List<ItemListDTO> getItems(String itemType) {
        User user = userService.getLoginUser();
        if(user == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        return itemsToItemListDTOs(itemRepository.findAllByType(itemType), itemType, user);
    }

    public boolean buyItem(Long itemSeq) {
        User user = userService.getLoginUser();
        if(user == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        Item item = itemRepository.findById(itemSeq).orElseThrow(() -> new RuntimeException("아이템을 찾을 수 없습니다."));
        Point point = pointRepository.findByUserUserSeq(user.getUserSeq()).orElse(Point.builder().user(user).point(0).build());

        // 이미 구매한 아이템인지 확인
        if(userItemRepository.countByUserAndItem(user, item)) {
            throw new AlreadyPurchasedException("이미 구매한 아이템입니다.");
        }

        // 포인트가 부족한지 확인
        if(item.getPrice() > point.getPoint()) {
            throw new InsufficientPointsException("포인트가 부족합니다.");
        }

        // 포인트 차감
        userItemRepository.save(UserItem.builder().item(item).user(user).build());

        return false;
    }

    public List<ItemListDTO> itemsToItemListDTOs(List<Item> items, String itemType, User user) {
        List<ItemListDTO> itemListDTOs = new ArrayList<>();
        List<UserItem> userItems = userItemRepository.findAllByUser(user).orElse(new ArrayList<>());
        for (Item item : items) {
            try {
                // 이미지를 byte[]로 변환
                Path imageFilePath = Paths.get(IMAGE_PATH + itemType).resolve(item.getImage());
                Resource resource = new ClassPathResource(imageFilePath.toString());

                byte[] imageData = null;
                if(resource != null) {
                    imageData = resource.getInputStream().readAllBytes();
                }

                boolean isSold = userItems.stream().anyMatch(userItem -> userItem.getItem().getItemSeq().equals(item.getItemSeq()));

                itemListDTOs.add(ItemListDTO.builder()
                        .itemSeq(item.getItemSeq())
                        .price(item.getPrice())
                        .image(imageData)
                        .isSold(isSold)
                        .build());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return itemListDTOs;
    }

}
