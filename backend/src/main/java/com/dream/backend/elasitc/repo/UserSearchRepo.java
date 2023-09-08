package com.dream.backend.elasitc.repo;

import com.dream.backend.elasitc.domain.UserDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface UserSearchRepo extends ElasticsearchRepository<UserDocument, Long> {
    List<UserDocument> findByName(String name);
    List<UserDocument> findByKorean(String korean);
    List<UserDocument> findByEnglish(String english);
}
