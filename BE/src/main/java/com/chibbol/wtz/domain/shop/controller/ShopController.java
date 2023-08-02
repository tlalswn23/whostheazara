package com.chibbol.wtz.domain.shop.controller;

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
@RequestMapping("/api/v1/shops")
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
    public ResponseEntity<Void> buyItem(@RequestBody Long itemSeq) {
        shopService.buyItem(itemSeq);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "아이템 추가(관리자용)")
    @PostMapping("/")
    public String addItem() {
        return "item";
    }
}
