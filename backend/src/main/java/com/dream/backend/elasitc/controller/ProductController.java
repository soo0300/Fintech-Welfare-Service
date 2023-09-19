package com.dream.backend.elasitc.controller;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.dream.backend.elasitc.entity.Product;
import com.dream.backend.elasitc.entity.WelfareInfo;
import com.dream.backend.elasitc.service.ProductService;
import com.dream.backend.elasitc.service.WelfareInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tokenize")
@Slf4j
public class ProductController {

    private final WelfareInfoService welfareInfoService;

    @GetMapping("/{korean_text}")
    public String getToken(@PathVariable("korean_text") String text) throws IOException {

        welfareInfoService.setClient();
        String result = welfareInfoService.tokenized(text);
        welfareInfoService.closeAllClient();

        return result;
    }
}
