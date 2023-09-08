package com.dream.backend.elasitc.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class ConnectionTestService {
    public static void main(String[] args) {
        HttpUtils httpUtils = new HttpUtils();

        String url = "http://172.28.112.174:9200/broccolisearch/_search";
        String method = "GET";
        String result = "";
        HttpURLConnection conn = null;

        conn = httpUtils.getHttpURLConnection(url, method);
        result = httpUtils.getHttpResponse(conn);
        System.out.println(result);
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