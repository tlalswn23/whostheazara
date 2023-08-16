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

    public CurrentSeatsDTO update(CurrentSeatsDTO currentSeatsDTO) {
        if(roomSeq != 0)
            this.roomSeq = currentSeatsDTO.roomSeq;
        if(order != 0)
            this.order = currentSeatsDTO.order;
        if(userSeq != 0)
            this.userSeq = currentSeatsDTO.userSeq;
        if(nickname != null)
            this.nickname = currentSeatsDTO.nickname;
        if(state != 0)
            this.state = currentSeatsDTO.state;
        if(equippedItems != null)
            this.equippedItems = currentSeatsDTO.equippedItems;

        return this;
    }
}
