package com.chibbol.wtz.domain.room.dto;

import com.chibbol.wtz.domain.shop.dto.EquippedItemsDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
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
            this.roomSeq = currentSeatsDTO.roomSeq;
            this.order = currentSeatsDTO.order;
            this.userSeq = currentSeatsDTO.userSeq;
            this.nickname = currentSeatsDTO.nickname;
            this.state = currentSeatsDTO.state;

        return this;
    }

    public String toString() {
        return "CurrentSeatsDTO{" +
                "roomSeq=" + roomSeq +
                ", order=" + order +
                ", userSeq=" + userSeq +
                ", nickname='" + nickname +
                ", state=" + state +
                '}';
    }
}
