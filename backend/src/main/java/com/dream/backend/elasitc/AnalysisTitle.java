package com.dream.backend.elasitc;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;

@Getter
@Setter
@Document(indexName = "#{elasticsearchIndex}")
public class AnalysisTitle {

    @Id
    private String id;

    @Field(type = FieldType.Keyword)
    private  String type;

    @Field(type = FieldType.Keyword)
    private String searchKeyword;

    @Field(type = FieldType.Keyword)
    private String title;

    @Field(type = FieldType.Long)
    private int count;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd")
    @Field(type = FieldType.Date, format = DateFormat.basic_date)
    private Date reg_dt;

}
