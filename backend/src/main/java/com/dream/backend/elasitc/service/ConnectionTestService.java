package com.dream.backend.elasitc.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import com.dream.backend.elasitc.entity.WelfareInfo;
import com.dream.backend.elasitc.repo.WelfareInfoRepo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class ConnectionTestService {
    public static void main(String[] args) {

        String url = "172.28.112.174";

        WelfareInfoRepo infoRepo = new WelfareInfoRepo(url, 9200);
        ElasticsearchClient elasticsearchClient = infoRepo.getElasticClient();

        WelfareInfo info = new WelfareInfo(0, "지원사업 A", "자립준비청년 중 타인과의 교류가 없고 도움을 요청할 경제적·정서적 지지체계가 부족하거나 결핍된 고립 청년. 혹은 고립 청년 중에서도 외출 없이 제한된 공간에서 살아가는 청년을 대상으로 합니다.");

        String tokens = ProductService.tokenized(infoRepo.getRestClient(), info.getDescription());
        info.setKeywords(tokens);

        try {
            IndexResponse response = elasticsearchClient.index(i -> i
                .index("welfare_info")
                .id(Integer.toString(info.getWelfareId()))
                .document(info)
            );
        } catch (IOException e) {
            e.printStackTrace();
        }

        infoRepo.closeClient();
    }
}

class HttpUtils {
    public HttpURLConnection getHttpURLConnection(String strurl, String method) {
        URL url;
        HttpURLConnection conn = null;
        try {
            url = new URL(strurl);
            conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod(method);
            conn.setConnectTimeout(5000);
            conn.setRequestProperty("Content-Type", "application/json");
        }catch(MalformedURLException e) {
            e.printStackTrace();
        } catch(IOException e) {
            e.printStackTrace();
        }

        return conn;
    }

    public String getHttpResponse(HttpURLConnection conn) {
        StringBuilder sb = null;

        try {
            if(conn.getResponseCode() == 200) {
                sb = readResponseData(conn.getInputStream());
            } else {
                System.out.println(conn.getResponseCode());
                System.out.println(conn.getResponseMessage());

                sb = readResponseData(conn.getErrorStream());
                System.out.println("error: " + sb.toString());
                return null;
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            conn.disconnect();
        };
        if(sb == null) return null;

        return sb.toString();
    }

    public StringBuilder readResponseData(InputStream in) {
        if(in == null) return null;

        StringBuilder sb = new StringBuilder();
        String line = "";

        try {
            InputStreamReader ir = new InputStreamReader(in);
            BufferedReader br = new BufferedReader(ir);
            line = br.readLine();
            while(line != null) {
                sb.append(line);
                line = br.readLine();
            }
        } catch(IOException e) {
            e.printStackTrace();
        }
        return sb;
    }
}