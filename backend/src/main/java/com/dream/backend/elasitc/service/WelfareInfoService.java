package com.dream.backend.elasitc.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.*;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.elasticsearch.core.search.TotalHits;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.dream.backend.elasitc.entity.WelfareInfo;
import com.dream.backend.elasitc.repo.WelfareInfoRepo;
import lombok.RequiredArgsConstructor;
import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.message.BasicHeader;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.AnalyzeRequest;
import org.elasticsearch.client.indices.AnalyzeResponse;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.awt.event.WindowListener;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class WelfareInfoService {
    private RestClient restClient;
    private RestHighLevelClient client;
    private ElasticsearchClient esClient;

    public void setClient() {
        String serverUrl = "http://j9c209.p.ssafy.io:9200";
        String apiKey = "NFl3amtZb0JsSzJlT3lYcXhRcmc6WDBabGZhYlpUdmlfNHpLTE5RMjk4Zw==";

        HttpHost httphost = new HttpHost("j9c209.p.ssafy.io", 9200, "http");
        BasicHeader header = new BasicHeader("Authorization", "ApiKey " + apiKey);

        restClient = RestClient
                .builder(httphost)
                .setDefaultHeaders(new Header[] {header})
                .build();

        client = new RestHighLevelClient(RestClient
                .builder(httphost)
                .setDefaultHeaders(new Header[] {header})
        );

        ElasticsearchTransport transport = new RestClientTransport(
                restClient, new JacksonJsonpMapper()
        );
        esClient = new ElasticsearchClient(transport);

//            esClient.indices().create(c -> c.index("welfare_info"));

//            WelfareInfo welfareInfo = new WelfareInfo(2, "지원사업 B", "강남구청 가족 정책과에서 시행하는 강남구 거주 3개월 이상 경과 자v립 준비 청년을 대상으로 경제적 심리적 지원을 해주는 지원 사업입니다.", "");
//
//            String tokens = this.tokenized(welfareInfo.getDescription());
//            System.out.println(tokens);
//            welfareInfo.setKeywords(tokens);
//
//            IndexResponse response = esClient.index(i -> i
//                    .index("welfare_info")
//                    .id("2")
//                    .document(welfareInfo)
//            );
    }

    public void insertDocument(Long id, String name, String desc) {
        WelfareInfo welfareInfo = new WelfareInfo(id, name, desc, "");
        welfareInfo.setKeywords(this.tokenized(desc));
        try {
            IndexResponse response = esClient.index(i -> i
                    .index("welfare_info")
                    .id(Long.toString(id))
                    .document(welfareInfo)
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public WelfareInfo getDocument(int id) {
        try {
            GetResponse<WelfareInfo> response = esClient.get(g -> g
                    .index("welfare_info")
                    .id(Integer.toString(id)),
                    WelfareInfo.class
            );

            if(response.found()) {
                return response.source();
            }
        } catch(IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public void removeDocument(int id) {

        try {
            DeleteResponse response = esClient.delete(d -> d
                    .index("welfare_info")
                    .id(Integer.toString(id))
            );
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    public List<WelfareInfo> searchDocument(String words) {
        List<WelfareInfo> results = new ArrayList<>();
        SearchResponse<WelfareInfo> response;
        try {
             response = esClient.search(s -> s
                    .index("welfare_info")
                             .query(q -> q
                             .match(t -> t
                                     .field("keywords")
                                     .query(words)
                             )
                     ),
                     WelfareInfo.class
             );

            List<Hit<WelfareInfo>> hits = response.hits().hits();
            for(Hit<WelfareInfo> hit: hits) {
                WelfareInfo welfareInfo = hit.source();
                welfareInfo.setScore(hit.score());
                results.add(welfareInfo);
            }

            return results;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public List<WelfareInfo> complexSearchDocument(String must, String query) {
        List<WelfareInfo> results = new ArrayList<>();
        SearchResponse<WelfareInfo> response;

        try {
            response = esClient.search(s -> s
                    .index("welfare_info")
                    .query(q -> q
                            .bool(b -> b
                                    .must(m -> m
                                            .match(t -> t
                                                    .field("keywords")
                                                    .query(must)))
                                    .should(sd -> sd
                                            .match(t -> t
                                                    .field("keywords")
                                                    .query(query))))),
                    WelfareInfo.class
            );

            List<Hit<WelfareInfo>> hits = response.hits().hits();
            for(Hit<WelfareInfo> hit: hits) {
                WelfareInfo welfareInfo = hit.source();
                welfareInfo.setScore(hit.score());
                results.add(welfareInfo);
            }

            return results;

        } catch(IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public List<WelfareInfo> searchReliableDocument(String words) {
        List<WelfareInfo> results = new ArrayList<>();
        SearchResponse<WelfareInfo> response;
        try {
            response = esClient.search(s -> s
                            .index("welfare_info")
                            .query(q -> q
                                    .match(t -> t
                                            .field("keywords")
                                            .query(words)
                                    )
                            ),
                    WelfareInfo.class
            );

            List<Hit<WelfareInfo>> hits = response.hits().hits();
            double lowestLimit = response.hits().maxScore() * 0.8;
            for(Hit<WelfareInfo> hit: hits) {
                if(hit.score() >= lowestLimit) {
                    WelfareInfo welfareInfo = hit.source();
                    welfareInfo.setScore(hit.score());
                    results.add(welfareInfo);
                }
            }

            return results;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
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

//            필터 추가: 어미, 감탄사, 조사, 의존명사, 대명사, 일반부사, 접속부사, 동사, 동사 파생 접미사, 보조 용언
            AnalyzeRequest request = AnalyzeRequest.withIndexAnalyzer("korean_analyzer", "nori_analyzer", text);
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
