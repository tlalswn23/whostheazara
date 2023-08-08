package com.chibbol.wtz.domain.location.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class LocationDTO {
    Long userSeq;
    Double xAxis;
    Double yAxis;
}
