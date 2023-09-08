package com.dream.backend.elasitc.repo;

import com.dream.backend.elasitc.entity.Product;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ProductRepo extends ElasticsearchRepository<Product, Integer> {
}
