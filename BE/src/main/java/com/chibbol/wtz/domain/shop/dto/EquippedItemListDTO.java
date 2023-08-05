package com.chibbol.wtz.domain.shop.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class EquippedItemListDTO {
    private List<EquippedItemDTO> equippedItemList;

    public EquippedItemListDTO(List<EquippedItemDTO> equippedItemList) {
        this.equippedItemList = equippedItemList;
    }
}
