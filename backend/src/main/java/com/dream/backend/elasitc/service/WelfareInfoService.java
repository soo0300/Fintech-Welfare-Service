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
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class WelfareInfoService {
    private RestClient restClient;
    private RestHighLevelClient client;
    private ElasticsearchClient esClient;

    public void setClient() throws IOException {
        String serverUrl = "http://j9c209.p.ssafy.io:9200";
        String apiKey = "NFl3amtZb0JsSzJlT3lYcXhRcmc6WDBabGZhYlpUdmlfNHpLTE5RMjk4Zw==";

        restClient = RestClient
                .builder(new HttpHost("j9c209.p.ssafy.io", 9200, "http"))
                .setDefaultHeaders(new Header[] {
                        new BasicHeader("Authorization", "ApiKey " + apiKey)
                })
                .build();

        client = new RestHighLevelClient(
                RestClient.builder(
                                new HttpHost("j9c209.p.ssafy.io", 9200, "http"))
                        .setDefaultHeaders(new Header[] {
                                new BasicHeader("Authorization", "ApiKey " + apiKey)
                        })
        );

        ElasticsearchTransport transport = new RestClientTransport(
                restClient, new JacksonJsonpMapper()
        );
        esClient = new ElasticsearchClient(transport);

//            esClient.indices().create(c -> c.index("welfare_info"));

//            WelfareInfo welfareInfo = new WelfareInfo(1, "지원사업 A", "자립준비청년 중 타인과의 교류가 없고 도움을 요청할 경제적·정서적 지지체계가 부족하거나 결핍된 고립 청년. 혹은 고립 청년 중에서도 외출 없이 제한된 공간에서 살아가는 청년을 대상으로 합니다.");
//
//            String tokens = this.tokenized(welfareInfo.getDescription());
//            System.out.println(tokens);
//            welfareInfo.setKeywords(tokens);
//
//            IndexResponse  response = esClient.index(i -> i
//                    .index("welfare_info")
//                    .id("1")
//                    .document(welfareInfo)
//            );
    }

    public void insertDocument(int id, String name, String desc) {
        WelfareInfo welfareInfo = new WelfareInfo(id, name, desc);
        welfareInfo.setKeywords(this.tokenized(desc));
        try {
            IndexResponse response = esClient.index(i -> i
                    .index("welfare_info")
                    .id(Integer.toString(id))
                    .document(welfareInfo)
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public WelfareInfo getDocument(int id) {
        WelfareInfo welfareInfo = null;
        try {
            GetResponse<WelfareInfo> response = esClient.get(g -> g
                    .index("welfare_info")
                    .id(Integer.toString(id)),
                    WelfareInfo.class
            );

            if(response.found()) {
                welfareInfo = response.source();
            }
        } catch(IOException e) {
            e.printStackTrace();
        }

        return welfareInfo;
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
        List<WelfareInfo> results = null;
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
                results.add(welfareInfo);
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
