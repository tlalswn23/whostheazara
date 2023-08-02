package com.chibbol.wtz.domain.shop.service;

import com.chibbol.wtz.domain.shop.dto.BuyItemListDTO;
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
import com.chibbol.wtz.domain.user.repository.UserRepository;
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

    private final UserRepository userRepository;
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

    public ItemListDTO getGif(String itemName) {
        ItemListDTO itemListDTO = null;
        try {
            // 이미지를 byte[]로 변환
            Path imageFilePath = Paths.get("static/item_gifs/rabbit/").resolve(itemName);
            Resource resource = new ClassPathResource(imageFilePath.toString());

            byte[] imageData = null;
            if(resource != null) {
                imageData = resource.getInputStream().readAllBytes();
            }

//            boolean isSold = userItems.stream().anyMatch(userItem -> userItem.getItem().getItemSeq().equals(item.getItemSeq()));

            itemListDTO = ItemListDTO.builder()
                    .itemSeq(0L)
                    .price(0)
                    .image(imageData)
//                        .isSold(isSold)
                    .build();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return itemListDTO;
    }

    public int getPoint() {
        User user = userService.getLoginUser();
        if(user == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        Point point = pointRepository.findByUserUserSeq(user.getUserSeq()).orElse(Point.builder().user(user).point(0).build());
        return point.getPoint();
    }

    public boolean buyItem(BuyItemListDTO buyItemListDTO) {
        User user = userService.getLoginUser();
        if(user == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }
        List<Item> items = new ArrayList<>();

        int totalPrice = 0;
        for(Long itemSeq : buyItemListDTO.getItems()) {
            Item item = itemRepository.findById(itemSeq).orElseThrow(() -> new RuntimeException("아이템을 찾을 수 없습니다."));
            // 이미 구매한 아이템인지 확인
            if(userItemRepository.countByUserAndItem(user, item) != 0) {
                throw new AlreadyPurchasedException("이미 구매한 아이템입니다.");
            }
            items.add(item);
            totalPrice += item.getPrice();

        }

        Point point = pointRepository.findByUserUserSeq(user.getUserSeq()).orElse(Point.builder().user(user).point(0).build());

        // 포인트가 부족한지 확인
        if(totalPrice > point.getPoint()) {
            throw new InsufficientPointsException("포인트가 부족합니다.");
        }

        // 포인트 차감
        point.usePoint(totalPrice);

        // 아이템 추가
        for(Item item : items) {
            userItemRepository.save(UserItem.builder().user(user).item(item).build());
        }

        return false;
    }

    public void addPoint(Long userSeq, int point) {
        User user = userRepository.findById(userSeq).orElseThrow(() -> new UserNotFoundException("유저를 찾을 수 없습니다."));
        Point userPoint = pointRepository.findByUserUserSeq(userSeq).orElse(Point.builder().user(user).point(0).build());
        userPoint.addPoint(point);
        pointRepository.save(userPoint);
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
