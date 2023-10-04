package com.dream.backend.controller.Status;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatusObject {

    private int code;
    private String status;
    private String message;
    private Object data;

    public static StatusObject returnSuccessful(Object obj) {
        return StatusObject.builder()
                .code(200)
                .status("OK")
                .message("Accepted Successful")
                .data(obj)
                .build();
    }

    public static StatusObject returnFailed(int code, String status, String message) {
        return StatusObject.builder()
                .code(code)
                .status(status)
                .message(message)
                .data(null)
                .build();
    }
}
