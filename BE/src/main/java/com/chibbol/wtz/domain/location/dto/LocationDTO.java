package com.chibbol.wtz.domain.location.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class LocationDTO {
    Long orderNumber;
    Double xAxis1;
    Double yAxis1;
    Double xAxis2;
    Double yAxis2;
}
