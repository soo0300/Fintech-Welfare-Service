package com.dream.backend.elasitc.service;

import ch.qos.logback.core.joran.conditional.ElseAction;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.GetResponse;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.dream.backend.elasitc.entity.Broccolisearch;
import com.dream.backend.elasitc.entity.Product;
import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.message.BasicHeader;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.AnalyzeRequest;
import org.elasticsearch.client.indices.AnalyzeResponse;
import org.jboss.jandex.Index;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    public static void main(String[] args) throws IOException {
        String serverUrl = "http://172.28.112.174:9200";

        RestClient restClient = RestClient
            .builder(HttpHost.create(serverUrl))
            .build();

        RestHighLevelClient client = new RestHighLevelClient(
            RestClient.builder(
                new HttpHost("172.28.112.174", 9200, "http")));

        ElasticsearchTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());
        ElasticsearchClient esClient = new ElasticsearchClient(transport);

        esClient.indices().create(c -> c
            .index("welfare_information")
        );

        client.close();
        restClient.close();
    }

    static String tokenized(RestHighLevelClient client, String text) {
        String results = "";
        try {
            AnalyzeRequest request = AnalyzeRequest.buildCustomAnalyzer("nori_tokenizer").build(text);
            AnalyzeResponse response = client.indices().analyze(request, RequestOptions.DEFAULT);

            List<AnalyzeResponse.AnalyzeToken> tokens = response.getTokens();

            for (AnalyzeResponse.AnalyzeToken token : tokens) {
                results += token.getTerm() + " ";
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return results;
    }
}
