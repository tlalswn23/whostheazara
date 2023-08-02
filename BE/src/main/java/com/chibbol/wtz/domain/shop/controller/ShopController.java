package com.chibbol.wtz.domain.shop.controller;

import com.chibbol.wtz.domain.shop.dto.BuyItemListDTO;
import com.chibbol.wtz.domain.shop.dto.ItemListDTO;
import com.chibbol.wtz.domain.shop.service.ShopService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/shop")
public class ShopController {

    private final ShopService shopService;

    @Operation(summary = "아이템 목록 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이템 목록 조회 성공")
    })
    @GetMapping("/{itemType}")
    public ResponseEntity<List> getItems(@PathVariable String itemType) {
        return ResponseEntity.ok(shopService.getItems(itemType));
    }

    @Operation(summary = "아이템 구매")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이템 구매 성공"),
            @ApiResponse(responseCode = "403", description = "Insufficient Points"),
            @ApiResponse(responseCode = "403", description = "Already Purchased"),
            @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없습니다.")
    })
    @PostMapping("/buy")
    public ResponseEntity<Void> buyItem(@RequestBody BuyItemListDTO buyItemListDto) {
        shopService.buyItem(buyItemListDto);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "포인트 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "포인트 조회 성공"),
            @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없습니다.")
    })
    @GetMapping("/point")
    public ResponseEntity<Integer> getPoint() {
        return ResponseEntity.ok(shopService.getPoint());
    }

    @GetMapping("/gif")
    public ResponseEntity<ItemListDTO> getGif(@RequestParam String itemName) {
        return ResponseEntity.ok(shopService.getGif(itemName));
    }

    @Operation(summary = "아이템 추가(관리자용)")
    @PostMapping("/")
    public String addItem() {
        return "item";
    }

    @Operation(summary = "포인트 추가(관리자용)")
    @PatchMapping("/point")
    public ResponseEntity<Void> addPoint(@RequestParam Long userSeq, @RequestParam Integer point) {
        shopService.addPoint(userSeq, point);
        return ResponseEntity.ok().build();
    }
}
