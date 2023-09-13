package com.dream.backend.elasitc.service;

import ch.qos.logback.core.joran.conditional.ElseAction;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.GetResponse;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import co.elastic.clients.elasticsearch.indices.analyze.AnalyzeToken;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.dream.backend.elasitc.entity.Broccolisearch;
import com.dream.backend.elasitc.entity.Product;
import com.dream.backend.elasitc.entity.WelfareInfo;
import lombok.RequiredArgsConstructor;
import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.entity.ContentType;
import org.apache.http.message.BasicHeader;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.*;
import org.elasticsearch.client.indices.AnalyzeRequest;
import org.elasticsearch.client.indices.AnalyzeResponse;
import org.jboss.jandex.Index;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private RestClient restClient;
    private RestHighLevelClient client;
    private ElasticsearchClient esClient;

    public void setClient() throws IOException {
        String serverUrl = "https://j9c209.p.ssafy.io:9200";
        String apiKey = "ZWxhc3RpYzoxNzU4NjM=";

        restClient = RestClient
                .builder(new HttpHost("j9c209.p.ssafy.io", 9200, "http"))
                .build();

        client = new RestHighLevelClient(
                RestClient.builder(
                        new HttpHost("j9c209.p.ssafy.io", 9200, "http"))
                        .setDefaultHeaders(new Header[] {
                                new BasicHeader("Authorization", "ApiKey " + apiKey)
                        }));


            ElasticsearchTransport transport = new RestClientTransport(
                    restClient, new JacksonJsonpMapper()
            );
            esClient = new ElasticsearchClient(transport);

//            esClient.indices().create(c -> c.index("welfare_info"));

            WelfareInfo welfareInfo = new WelfareInfo(0, "지원사업 A", "자립준비청년 중 타인과의 교류가 없고 도움을 요청할 경제적·정서적 지지체계가 부족하거나 결핍된 고립 청년. 혹은 고립 청년 중에서도 외출 없이 제한된 공간에서 살아가는 청년을 대상으로 합니다.");

            String tokens = this.tokenized(welfareInfo.getDescription());
            welfareInfo.setKeywords(tokens);

//            IndexResponse  response = esClient.index(i -> i
//                    .index("welfare_info")
//                    .id("0")
//                    .document(welfareInfo)
//            );
    }

    public void closeAllClient() throws IOException {
        restClient.close();
        client.close();
    }

    public String tokenized(String text) {
        String results = "";
        try {

//            Request request = new Request(
//                    "GET",
//                    "/_analyze"
//            );
//            request.setEntity(new NStringEntity(
//                    "{\"tokenizer\": \"nori_tokenizer\"," +
//                            "\"text\": \"" + text + "\"}",
//                    ContentType.APPLICATION_JSON
//            ));

            AnalyzeRequest request = AnalyzeRequest.buildCustomAnalyzer("nori_tokenizer").build(text);
            AnalyzeResponse response = client.indices().analyze(request, RequestOptions.DEFAULT);

            List<AnalyzeResponse.AnalyzeToken> tokens = response.getTokens();

            for (AnalyzeResponse.AnalyzeToken token : tokens) {
                results += token.getTerm() + " ";
            }
//            Response response = restClient.performRequest(request);
//            System.out.println(EntityUtils.toString(response.getEntity()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return results;
    }
}
