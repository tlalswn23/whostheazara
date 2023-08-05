package com.chibbol.wtz.domain.shop.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EquippedItemDTO {
    private Long itemSeq;
    private String type;

    @Builder
    public EquippedItemDTO(Long itemSeq, String type) {
        this.itemSeq = itemSeq;
        this.type = type;
    }

}
