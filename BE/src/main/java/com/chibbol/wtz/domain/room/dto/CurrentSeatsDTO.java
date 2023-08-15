package com.chibbol.wtz.domain.room.dto;

import com.chibbol.wtz.domain.shop.dto.EquippedItemsDTO;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CurrentSeatsDTO implements Comparable<CurrentSeatsDTO> {
    private int roomSeq;
    private int order;
    private long userSeq;
    private String nickname;
    private int state;
    private EquippedItemsDTO equippedItems;

    @Override
    public int compareTo(CurrentSeatsDTO o) {
        return Integer.compare(this.order, o.order);
    }
}
