package com.dream.backend.domain.bank_client;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bank_Client {

    @Id
    @GeneratedValue()
    @Column(name=" client_key")
    private int clientCode;

    @Column(nullable = false, length = 50)
    private String clientName;
}